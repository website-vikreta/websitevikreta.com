import { Metadata } from 'next'
import { Suspense } from 'react'
import { BlogListingClient } from './BlogListingClient'
import { BlogPageHeading } from '@/components/blog/BlogPageHeading'
import { BlogResultsSkeleton } from '@/components/blog/BlogResultsSkeleton'
import { FeaturedLabelCarousels } from '@/components/blog/FeaturedLabelCarousels'
import { LabelCarouselSkeleton } from '@/components/blog/LabelCarouselSkeleton'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SITE_URL } from '@/config/site'
import { blogPosts as staticPosts } from '@/lib/blog-data'
import { fetchFilteredBlogPosts, fetchAllCategories } from '@/sanity/lib/fetch'
import type { DisplayPost, Category } from '@/sanity/types'

// Reads searchParams, so the page must always render fresh per request —
// without this, Next.js's client-side Router Cache can serve a stale RSC
// payload on a searchParams-only router.push navigation (URL updates via
// history.pushState immediately, but the grid doesn't). Matches the same
// fix already applied to the sibling app/blog/[slug]/page.tsx.
export const dynamic = 'force-dynamic'

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

async function getPosts(categorySlug?: string, searchQuery?: string): Promise<DisplayPost[]> {
  const hasFilters = Boolean(categorySlug || searchQuery)
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    // Sanity not yet configured — static data has no category/tag metadata
    // to filter against, so a filtered request just yields no results.
    return hasFilters ? [] : mapStaticPosts()
  }
  try {
    const posts = await fetchFilteredBlogPosts({ categorySlug, searchQuery })
    // Only fall back to static data on an *unfiltered* empty result — an
    // empty filtered result (e.g. a category with no posts) is legitimate
    // and shouldn't be masked by unrelated static content.
    if (posts.length > 0 || hasFilters) return posts
    return mapStaticPosts()
  } catch {
    return hasFilters ? [] : mapStaticPosts()
  }
}

async function getCategories(): Promise<Category[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  try {
    return await fetchAllCategories()
  } catch {
    return []
  }
}

const BREADCRUMB_SEGMENTS = [
  { label: 'Home', href: '/' },
  { label: 'Blog' },
]

// Fetches + renders the Sanity-backed part of the index (hero, category
// pills, card grid) as its own async Server Component so it can sit behind
// a Suspense boundary — the static shell around it (breadcrumb, heading)
// paints without waiting on this.
async function BlogResults({
  categorySlug,
  searchQuery,
}: {
  categorySlug?: string
  searchQuery?: string
}) {
  const [posts, categories] = await Promise.all([
    getPosts(categorySlug, searchQuery),
    getCategories(),
  ])
  return <BlogListingClient posts={posts} categories={categories} activeCategory={categorySlug} />
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; query?: string }>
}) {
  const { category, query } = await searchParams
  // Label carousels are the unfiltered landing-state feature — hide them
  // once the visitor is looking at a specific category/search result so the
  // grid below isn't preceded by rows unrelated to the active filter.
  const showLabelCarousels = !category && !query

  return (
    <>
      <ScrollToTop />
      <main>
        <section className="relative overflow-hidden">
          <div className="container pt-32 pb-20 md:pt-40 md:pb-28">
            <Breadcrumb segments={BREADCRUMB_SEGMENTS} className="mb-6 md:mb-8" />

            <BlogPageHeading />

            {showLabelCarousels && (
              <Suspense fallback={<LabelCarouselSkeleton />}>
                <FeaturedLabelCarousels />
              </Suspense>
            )}

            <Suspense fallback={<BlogResultsSkeleton />}>
              <BlogResults categorySlug={category} searchQuery={query} />
            </Suspense>
          </div>
        </section>
      </main>
    </>
  )
}
