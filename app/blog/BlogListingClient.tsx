'use client'

import { useMemo, useState } from 'react'
import { BlogCard } from '@/components/blog/BlogCard'
import { Button } from '@/components/ui/Button'
import { BLOG_SEARCH_PATH } from '@/lib/blog-search-params'
import type { DisplayPost, Category } from '@/sanity/types'

interface BlogListingClientProps {
  /** Already hero-excluded — the single page hero is picked and rendered upstream in app/blog/page.tsx, not here. */
  posts: DisplayPost[]
  categories?: Category[]
}

// Renders the interactive tail of the blog index — category filter pills +
// card grid. Deliberately does NOT render the breadcrumb, page heading, hero,
// or label carousel; those are static/server-rendered above this in the page
// shell (app/blog/page.tsx) so they paint without waiting on this, and so
// the hero stays a single fixed pick that never changes when a pill is
// clicked (Netflix-style: the masthead doesn't react to the row filters).
//
// Category filtering is pure client-side state — no router.push, no
// searchParams. The URL stays /blog at all times; deep-linkable per-category
// URLs live at /blog/category/[slug] instead.
export function BlogListingClient({ posts, categories }: BlogListingClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined)

  const filteredPosts = useMemo(
    () => (activeCategory ? posts.filter((post) => post.categorySlug === activeCategory) : posts),
    [posts, activeCategory],
  )

  function handleCategoryClick(categorySlug: string | null) {
    setActiveCategory(categorySlug ?? undefined)
  }

  return (
    <>
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
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* View all — entry point into the dedicated blog search page */}
      <div className="mt-14 flex justify-center md:mt-20">
        <Button href={BLOG_SEARCH_PATH} variant="ghost" size="md" showArrow>
          View all
        </Button>
      </div>
    </>
  )
}
