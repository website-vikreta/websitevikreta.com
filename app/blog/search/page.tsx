import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogSearchFilters } from './BlogSearchFilters'
import { BlogSearchPagination } from './BlogSearchPagination'
import { BlogCard } from '@/components/blog/BlogCard'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { TextLink } from '@/components/ui/TextLink'
import { SITE_URL } from '@/config/site'
import {
  BLOG_SEARCH_PATH,
  buildBlogSearchHref,
  hasActiveFilters,
  parseBlogSearchParams,
  totalPages,
  type RawSearchParams,
} from '@/lib/blog-search-params'
import {
  fetchBlogSearchResults,
  fetchCategoriesWithPosts,
  fetchTagsWithPosts,
  fetchAllLabelsWithPosts,
} from '@/sanity/lib/fetch'

interface PageProps {
  searchParams: Promise<RawSearchParams>
}

const BREADCRUMB_SEGMENTS = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Search' },
]

/**
 * Indexing policy — deliberate, and the reason `hasActiveFilters` exists:
 *
 * - Bare `/blog/search` and its `?page=N` walk are indexable. They're a real,
 *   crawlable path to every post, and each page is genuinely distinct content.
 * - Any *filtered* or *re-sorted* permutation is `noindex, follow`. Those URLs
 *   are near-duplicates of pages that already rank — /blog, /blog/categories/…,
 *   /blog/labels/…, /blog/tags/… — and letting a facet combinatorial explosion
 *   into the index would have them competing with the pages we actually want
 *   ranked. `follow` keeps the link equity flowing through to the posts.
 * - Every variant canonicalises to `buildBlogSearchHref()`, which drops
 *   defaults — so `?query=all&page=1`, `?sort=publish-date` and the bare URL
 *   all declare the same canonical instead of reading as three pages.
 */
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = parseBlogSearchParams(await searchParams)
  const filtered = hasActiveFilters(params)

  const base = params.query ? `Search results for “${params.query}”` : 'Search the Blog'
  const paged = params.page > 1 ? `${base} — Page ${params.page}` : base

  return {
    title: `${paged} | Website Vikreta`,
    description:
      'Search and filter every AI automation, Next.js, and web development article on the Website Vikreta blog by category, tag, label, and publish date.',
    alternates: {
      canonical: `${SITE_URL}${buildBlogSearchHref(params)}`,
    },
    robots: {
      index: !filtered,
      follow: true,
    },
  }
}

export default async function BlogSearchPage({ searchParams }: PageProps) {
  const params = parseBlogSearchParams(await searchParams)

  const [{ posts, total }, categories, tags, labels] = await Promise.all([
    fetchBlogSearchResults(params),
    fetchCategoriesWithPosts(),
    fetchTagsWithPosts(),
    fetchAllLabelsWithPosts(),
  ])

  const lastPage = totalPages(total)

  // A page number past the end is a dead URL, not an empty result — 404 it so
  // crawlers stop walking and a stale bookmark says so plainly. Page 1 always
  // renders, with the empty state below if there's nothing to show.
  if (params.page > 1 && params.page > lastPage) notFound()

  return (
    <>
      <ScrollToTop />
      <main>
        <section className="relative overflow-hidden">
          <div className="container pt-20 pb-16 md:pt-24 md:pb-20">
            <Breadcrumb segments={BREADCRUMB_SEGMENTS} className="mb-6 md:mb-8" hoverColor="accent" />

            {/* The h1 reflects the query, so the page announces what it's
                showing rather than a generic label — matching the <title> and
                giving screen-reader users the same context sighted users get
                from the filled-in search box. */}
            <h1 className="mb-10 text-h2 font-bold leading-[1.1] tracking-tight text-(--color-text) md:mb-14">
              {params.query ? `Search results for “${params.query}”` : 'Search the blog'}
            </h1>

            {/* Filters own the URL; everything below is server-rendered from
                whatever the URL currently says. */}
            <BlogSearchFilters params={params} categories={categories} tags={tags} labels={labels}>
              {/* role="status" (polite + atomic) is what carries the result
                  change to assistive tech: filter navigations are client-side,
                  so the h1 above updates silently — this line is re-announced
                  in full every time, query included. */}
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-(--color-border) pt-4">
                <p role="status" className="text-sm text-(--color-text-muted)">
                  {total} {total === 1 ? 'article' : 'articles'}
                  {params.query && ` matching “${params.query}”`}
                  {lastPage > 1 && ` · page ${params.page} of ${lastPage}`}
                </p>
              </div>

              {posts.length > 0 ? (
                <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 md:mt-14 md:gap-x-10 md:gap-y-20 lg:grid-cols-3">
                  {posts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <div className="mt-10 flex flex-col items-center justify-center gap-2 border border-dashed border-(--color-border) py-24 text-center md:mt-14">
                  <p className="text-lg font-medium text-(--color-text)">No results found</p>
                  <p className="text-sm text-(--color-text-muted)">
                    Try a different search term, or clear a filter.
                  </p>
                  {hasActiveFilters(params) && (
                    <TextLink href={BLOG_SEARCH_PATH} arrow="right" className="mt-4">
                      Browse every article
                    </TextLink>
                  )}
                </div>
              )}

              <BlogSearchPagination params={params} lastPage={lastPage} />
            </BlogSearchFilters>
          </div>
        </section>
      </main>
    </>
  )
}
