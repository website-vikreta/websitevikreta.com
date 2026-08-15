import { Metadata } from 'next'
import { Suspense } from 'react'
import { BlogListingClient } from './BlogListingClient'
import { BlogHeaderBar } from '@/components/blog/BlogHeaderBar'
import { BlogPageHeading } from '@/components/blog/BlogPageHeading'
import { BlogResultsSkeleton } from '@/components/blog/BlogResultsSkeleton'
import { FeaturedBlogHeroCarousel } from '@/components/blog/FeaturedBlogHeroCarousel'
import { FeaturedLabelCarousels } from '@/components/blog/FeaturedLabelCarousels'
import { LabelCarouselSkeleton } from '@/components/blog/LabelCarouselSkeleton'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { SITE_URL } from '@/config/site'
import { blogPosts as staticPosts } from '@/lib/blog-data'
import { selectFeaturedPost } from '@/lib/selectFeaturedPost'
import { fetchFilteredBlogPosts, fetchCategoriesWithPosts, fetchPostsByLabel } from '@/sanity/lib/fetch'
import type { DisplayPost } from '@/sanity/types'

// Label whose posts populate the hero slider — see .claude/learning.md
// [Hero] entry for why "Featured Articles" (not a literal "Featured Blog"
// label, which doesn't exist in the Sanity schema) is the source.
const HERO_LABEL_SLUG = 'featured-articles'
const HERO_LIMIT = 6

// "All Blogs" grid shows this many posts, after hero posts are excluded —
// see getPosts()/BlogResults() below for why the raw fetch pulls more than
// this.
const GRID_LIMIT = 6

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
    // Static fallback posts (used only when Sanity isn't configured) have
    // no backing document — slug doubles as a stable synthetic id.
    _id: p.slug,
    slug: p.slug,
    category: p.category,
    title: p.title,
    description: p.description,
    publishDate: p.publishDate,
    readTime: p.readTime,
    likes: 0,
    commentsCount: 0,
    imageUrl: p.imageUrl,
  }))
}

// Category filtering happens entirely client-side in BlogListingClient (see
// that file), over whatever this returns. The fetch pulls GRID_LIMIT +
// HERO_LIMIT posts, not just GRID_LIMIT — BlogResults below excludes
// whichever of these are already shown as the hero, then slices to
// GRID_LIMIT, so the "All Blogs" grid still ends up with a full 6 even in
// the (normal) case where some of the newest posts are also hero posts.
// This index is a top-6 preview whose own "View all" button already leads
// to the fully server-paginated /blog/search — a category's posts past the
// cap won't show under its pill here, but are still fully browsable via
// /blog/categories/[slug] or /blog/search?category=….
async function getPosts(): Promise<DisplayPost[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return mapStaticPosts()
  try {
    const posts = await fetchFilteredBlogPosts({ limit: GRID_LIMIT + HERO_LIMIT })
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

// Fetches + renders the Sanity-backed part of the index — hero slider,
// label carousel rows, "All Blogs" heading, category pills, card grid — as
// its own async Server Component so it can sit behind a single Suspense
// boundary; the static shell around it (breadcrumb) paints without waiting
// on this.
//
// Netflix-style stack, top to bottom: hero slider (every post carrying the
// HERO_LABEL_SLUG label, fixed — doesn't change when a category pill is
// clicked) → label carousel rows → heading → category pills + grid (both
// client-side, in BlogListingClient). The hero posts are picked once, here,
// and their slugs threaded into the carousels so none of them shows twice
// on screen. The grid gets the hero-excluded list too (BlogListingClient's
// category filter runs on top of that, client-side). Falls back to the
// single-post selectFeaturedPost pick when no post carries the hero label
// yet, so the slider never renders empty.
async function BlogResults() {
  const [posts, categories, labeledHero] = await Promise.all([
    getPosts(),
    getCategories(),
    fetchPostsByLabel(HERO_LABEL_SLUG, HERO_LIMIT),
  ])

  const heroPosts = labeledHero.length > 0 ? labeledHero : [selectFeaturedPost(posts).featured].filter(
    (p): p is DisplayPost => p !== null,
  )
  const heroSlugs = heroPosts.map((p) => p.slug)
  const rest = posts.filter((post) => !heroSlugs.includes(post.slug)).slice(0, GRID_LIMIT)

  return (
    <>
      <FeaturedBlogHeroCarousel posts={heroPosts} />

      <Suspense fallback={<LabelCarouselSkeleton />}>
        <FeaturedLabelCarousels excludeSlugs={heroSlugs} />
      </Suspense>

      <BlogPageHeading />

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
          <div className="container pt-20 pb-16 md:pt-24 md:pb-20">
            <BlogHeaderBar segments={BREADCRUMB_SEGMENTS} />

            <Suspense fallback={<BlogResultsSkeleton />}>
              <BlogResults />
            </Suspense>
          </div>
        </section>
      </main>
    </>
  )
}
