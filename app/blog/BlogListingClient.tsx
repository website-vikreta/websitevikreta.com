'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { Breadcrumb, type BreadcrumbSegment } from '@/components/ui/Breadcrumb'
import { FeaturedBlogHero } from '@/components/blog/FeaturedBlogHero'
import { BlogCard } from '@/components/blog/BlogCard'
import type { DisplayPost, Category } from '@/sanity/types'

// A post carrying any of these label slugs gets the hero treatment. Falls
// back to the newest post (posts[0] — queries already order by
// publishedAt desc) when nothing is labeled.
const FEATURED_LABEL_SLUGS = new Set(['hero-banner', 'featured', 'featured-post'])

function selectFeaturedPost(posts: DisplayPost[]): {
  featured: DisplayPost | null
  rest: DisplayPost[]
} {
  if (posts.length === 0) return { featured: null, rest: [] }
  const labeled = posts.find((post) =>
    (post.labels ?? []).some((label) => FEATURED_LABEL_SLUGS.has(label.slug?.current ?? '')),
  )
  const featured = labeled ?? posts[0]
  return { featured, rest: posts.filter((post) => post.slug !== featured.slug) }
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const lineReveal = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

interface BlogListingClientProps {
  posts: DisplayPost[]
  categories?: Category[]
  activeCategory?: string
  breadcrumbSegments: BreadcrumbSegment[]
}

export function BlogListingClient({
  posts,
  categories,
  activeCategory,
  breadcrumbSegments,
}: BlogListingClientProps) {
  const router = useRouter()
  const { featured, rest } = useMemo(() => selectFeaturedPost(posts), [posts])

  function handleCategoryClick(categorySlug: string | null) {
    if (categorySlug === null) {
      router.push('/blog', { scroll: false })
    } else {
      router.push(`?category=${encodeURIComponent(categorySlug)}`, { scroll: false })
    }
  }

  return (
    <>
      <ScrollToTop />
      <main>
      <section className="relative overflow-hidden">
        <div className="container pt-32 pb-20 md:pt-40 md:pb-28">

          <Breadcrumb segments={breadcrumbSegments} className="mb-6 md:mb-8" />

          {featured && <FeaturedBlogHero post={featured} />}

          {/* Page heading */}
          <motion.div
            className="mb-10 md:mb-14"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <div className="overflow-hidden">
              <motion.h2
                className="text-h2 font-bold leading-[1.1] tracking-tight text-[var(--color-text)]"
                variants={lineReveal}
              >
                Blogs
              </motion.h2>
            </div>
          </motion.div>

          {/* Category filter pills */}
          {categories && categories.length > 0 && (
            <div
              role="group"
              aria-label="Filter posts by category"
              className="mb-10 md:mb-14 flex flex-nowrap gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <button
                type="button"
                aria-pressed={!activeCategory}
                onClick={() => handleCategoryClick(null)}
                className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text) ${
                  !activeCategory
                    ? 'border-(--color-text) bg-(--color-text) text-(--color-bg) font-medium'
                    : 'border-(--color-border) text-(--color-text-muted) hover:border-(--color-text)'
                }`}
              >
                All
              </button>
              {categories.map((category) => {
                const categorySlug = category.slug.current
                const isActive = categorySlug === activeCategory
                return (
                  <button
                    key={category._id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleCategoryClick(categorySlug)}
                    className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text) ${
                      isActive
                        ? 'border-(--color-text) bg-(--color-text) text-(--color-bg) font-medium'
                        : 'border-(--color-border) text-(--color-text-muted) hover:border-(--color-text)'
                    }`}
                  >
                    {category.title}
                  </button>
                )
              })}
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-x-10 md:gap-y-20">
            {rest.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
         </div>
      </section>
    </main>
    </>
  )
}
