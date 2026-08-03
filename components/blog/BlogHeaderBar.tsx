import { Search } from 'lucide-react'
import { Breadcrumb, type BreadcrumbSegment } from '@/components/ui/Breadcrumb'
import { BLOG_SEARCH_PATH } from '@/lib/blog-search-params'

interface BlogHeaderBarProps {
  segments: BreadcrumbSegment[]
}

/**
 * Breadcrumb + search box, shared by every /blog/* landing page: the index,
 * and the category/label/tags/author landing pages. One component so
 * "identical compact top spacing, breadcrumb always starting at the same
 * position" can't drift across five separate copies of the same JSX.
 *
 * Layout is deliberately `items-start`, not `items-center`: the search input
 * is 40px tall and the breadcrumb text is one line (~20px) — centering them
 * against each other pushes the breadcrumb text down by half that
 * difference, which is exactly what put it out of alignment with the one
 * breadcrumb that has no search box beside it (/blog/search's own bare
 * `<Breadcrumb>`, see below). `items-start` pins both to the same top edge
 * regardless of either one's height, so the breadcrumb starts at the same y
 * on every route with or without a sibling.
 *
 * Stacks below `sm:` — a category/tag/author name can run long, and a fixed-
 * width search box that refuses to shrink (`shrink-0`) squeezes it into a
 * cramped leftover column on a phone. Full-width breadcrumb on its own line,
 * full-width search box below it, is the mobile-first non-negotiable.
 *
 * Not used by /blog/search (its own filter bar already has a search input —
 * a second one beside the breadcrumb would be two search boxes stacked) or
 * the post detail page (no search there by design). /blog/search's own
 * `<Breadcrumb className="mb-6 md:mb-8" />` call must keep matching this
 * component's margins — there's no shared sibling here to enforce it, so it
 * has to be kept in sync by hand.
 *
 * The form is a plain GET to /blog/search — no client component, no JS
 * required: the browser builds `?query=…` itself, which is exactly the URL
 * /blog/search already parses, so the typed term arrives pre-filled in its
 * input.
 */
export function BlogHeaderBar({ segments }: BlogHeaderBarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between md:mb-8">
      <Breadcrumb segments={segments} hoverColor="accent" />
      <form
        role="search"
        action={BLOG_SEARCH_PATH}
        method="get"
        aria-label="Search the blog"
        className="relative w-full shrink-0 sm:w-72 md:w-80"
      >
        <label htmlFor="blog-search" className="sr-only">
          Search articles
        </label>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-text-faint)"
          aria-hidden="true"
        />
        <input
          id="blog-search"
          type="search"
          name="query"
          placeholder="Search articles…"
          className="h-10 w-full rounded-[2px] border border-(--color-border) bg-(--color-surface) pl-9 pr-3 text-sm text-(--color-text) transition-colors duration-200 hover:border-(--color-text) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text)"
        />
        <button type="submit" className="sr-only">
          Search
        </button>
      </form>
    </div>
  )
}
