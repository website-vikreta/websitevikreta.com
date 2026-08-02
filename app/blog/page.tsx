import { Metadata } from 'next'
import { Suspense } from 'react'
import { BlogListingClient } from './BlogListingClient'
import { BlogPageHeading } from '@/components/blog/BlogPageHeading'
import { BlogResultsSkeleton } from '@/components/blog/BlogResultsSkeleton'
import { FeaturedBlogHero } from '@/components/blog/FeaturedBlogHero'
import { FeaturedLabelCarousels } from '@/components/blog/FeaturedLabelCarousels'
import { LabelCarouselSkeleton } from '@/components/blog/LabelCarouselSkeleton'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SITE_URL } from '@/config/site'
import { blogPosts as staticPosts } from '@/lib/blog-data'
import { selectFeaturedPost } from '@/lib/selectFeaturedPost'
import { fetchFilteredBlogPosts, fetchCategoriesWithPosts } from '@/sanity/lib/fetch'
import type { DisplayPost } from '@/sanity/types'

export const metadata: Metadata = {
  title: 'AI Automation, Next.js & Web Development Blog | Website Vikreta',
  description: 'Read practical guides on AI automation, Next.js development, workflow automation, SEO, and business growth. Learn how to build faster websites and automate repetitive work with AI.',
  keywords: [
    'AI automation blog',
    'AI workflow automation',
    'Next.js blog',
    'web development blog',
    'business automation guides',
    'AI automation agency',
    'web development agency India',
    'workflow automation with n8n',
    'Make.com tutorials',
    'SEO and Next.js',
    'AI business automation tips',
    'Website Vikreta blog',
  ],
  openGraph: {
    title: 'AI Automation, Next.js & Web Development Blog | Website Vikreta',
    description: 'Read practical guides on AI automation, Next.js development, workflow automation, SEO, and business growth.',
    url: `${SITE_URL}/blog`,
    siteName: 'Website Vikreta',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 675,
        alt: 'Website Vikreta Blog | AI Automation & Web Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation, Next.js & Web Development Blog | Website Vikreta',
    description: 'Read practical guides on AI automation, Next.js development, workflow automation, SEO, and business growth.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

function mapStaticPosts(): DisplayPost[] {
  return staticPosts.map((p) => ({
    slug: p.slug,
    category: p.category,
    title: p.title,
    description: p.description,
    publishDate: p.publishDate,
    readTime: p.readTime,
    imageUrl: p.imageUrl,
  }))
}

// Category filtering now happens entirely client-side in BlogListingClient
// (see that file) — this always fetches the full, unfiltered post list.
async function getPosts(): Promise<DisplayPost[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return mapStaticPosts()
  try {
    const posts = await fetchFilteredBlogPosts({})
    return posts.length > 0 ? posts : mapStaticPosts()
  } catch {
    return mapStaticPosts()
  }
}

// fetchCategoriesWithPosts already handles the unconfigured/error cases.
const getCategories = fetchCategoriesWithPosts

const BREADCRUMB_SEGMENTS = [
  { label: 'Home', href: '/' },
  { label: 'Blog' },
]

// Fetches + renders the Sanity-backed part of the index — hero, label
// carousel, category pills, card grid — as its own async Server Component
// so it can sit behind a single Suspense boundary; the static shell around
// it (breadcrumb, heading) paints without waiting on this.
//
// Netflix-style stack, top to bottom: Hero (the one #1 post, fixed —
// doesn't change when a category pill is clicked) → label carousel rows →
// category pills + grid (both client-side, in BlogListingClient). The hero
// is picked once, here, from the full unfiltered post list, and its slug
// is threaded into the carousel so the same post never shows twice on
// screen. The grid gets the hero-excluded list too (BlogListingClient's
// category filter runs on top of that, client-side).
async function BlogResults() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()])
  const { featured, rest } = selectFeaturedPost(posts)

  return (
    <>
      {featured && <FeaturedBlogHero post={featured} />}

      <Suspense fallback={<LabelCarouselSkeleton />}>
        <FeaturedLabelCarousels excludeSlug={featured?.slug} />
      </Suspense>

      <BlogListingClient posts={rest} categories={categories} />
    </>
  )
}

export default function BlogPage() {
  return (
    <>
      <ScrollToTop />
      <main>
        <section className="relative overflow-hidden">
          <div className="container pt-32 pb-20 md:pt-40 md:pb-28">
            <Breadcrumb segments={BREADCRUMB_SEGMENTS} className="mb-6 md:mb-8" />

            <BlogPageHeading />

            <Suspense fallback={<BlogResultsSkeleton />}>
              <BlogResults />
            </Suspense>
          </div>
        </section>
      </main>
    </>
  )
}
