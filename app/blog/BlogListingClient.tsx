'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { FeaturedBlogHero } from '@/components/blog/FeaturedBlogHero'
import { BlogCard } from '@/components/blog/BlogCard'
import { selectFeaturedPost } from '@/lib/selectFeaturedPost'
import type { DisplayPost, Category } from '@/sanity/types'

interface BlogListingClientProps {
  posts: DisplayPost[]
  categories?: Category[]
  activeCategory?: string
}

// Renders the data-dependent part of the blog index — hero, category
// filter, card grid. Deliberately does NOT render the breadcrumb or page
// heading; those live in the static page shell (app/blog/page.tsx) so they
// paint immediately instead of waiting behind this component's Suspense
// boundary.
export function BlogListingClient({
  posts,
  categories,
  activeCategory,
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
      {featured && <FeaturedBlogHero post={featured} />}

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
    </>
  )
}
