import Link from 'next/link'
import { BlogCard } from '@/components/blog/BlogCard'
import { Button } from '@/components/ui/Button'
import { BLOG_SEARCH_PATH, buildBlogSearchHref } from '@/lib/blog-search-params'
import type { DisplayPost, Category } from '@/sanity/types'

interface BlogListingClientProps {
  /** Already hero-excluded — the single page hero is picked and rendered upstream in app/blog/page.tsx, not here. */
  posts: DisplayPost[]
  categories?: Category[]
}

// Renders the tail of the blog index — category pills + card grid.
// Deliberately does NOT render the breadcrumb, page heading, hero, or label
// carousel; those are static/server-rendered above this in the page shell
// (app/blog/page.tsx) so they paint without waiting on this.
//
// Category pills are plain links to /blog/search?category=… — no in-place
// filtering. Was client-side pill state filtering this same grid in place;
// removed per user request ("when i click on any category instead of
// isotope, remove that functionality completely. it should redirect to
// search page with category filter selected"). The grid below always shows
// the unfiltered top-6 "All Blogs" preview.
export function BlogListingClient({ posts, categories }: BlogListingClientProps) {
  return (
    <>
      {/* Category pills */}
      {categories && categories.length > 0 && (
        <div
          role="group"
          aria-label="Browse posts by category"
          className="mb-10 md:mb-14 flex flex-nowrap gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* "All" is always the current state on this page (the grid below
              is never filtered) — a static label, not a link: nothing to
              navigate to that isn't already here. */}
          <span
            aria-current="true"
            className="shrink-0 rounded-full border border-(--color-text) bg-(--color-text) px-4 py-2 text-sm font-medium text-(--color-bg)"
          >
            All
          </span>
          {categories.map((category) => (
            <Link
              key={category._id}
              href={buildBlogSearchHref({ category: category.slug.current })}
              className="shrink-0 rounded-full border border-(--color-border) px-4 py-2 text-sm text-(--color-text-muted) transition-colors duration-200 ease-out hover:border-(--color-text) hover:bg-(--color-text) hover:text-(--color-bg) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text)"
            >
              {category.title}
            </Link>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 md:gap-x-[3.125rem] md:gap-y-[6.25rem]">
        {posts.map((post) => (
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
