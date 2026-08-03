import Link from 'next/link'
import { buildBlogSearchHref, type BlogSearchParams } from '@/lib/blog-search-params'

const WINDOW_SPAN = 2 // pages shown either side of the current one

/** Page numbers to render: a sliding window that always shows the same count,
 * clamped to the real range. First/last are added by the caller via ellipses. */
function pageWindow(current: number, last: number): number[] {
  const width = WINDOW_SPAN * 2 + 1
  const start = Math.max(1, Math.min(current - WINDOW_SPAN, last - width + 1))
  const end = Math.min(last, start + width - 1)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

const LINK_CLASS =
  'inline-flex h-10 min-w-10 items-center justify-center rounded-[2px] border px-3 text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text)'
const INACTIVE_CLASS = `${LINK_CLASS} border-(--color-border) text-(--color-text-muted) hover:border-(--color-text) hover:text-(--color-text)`
const ACTIVE_CLASS = `${LINK_CLASS} border-(--color-text) bg-(--color-text) font-medium text-(--color-bg)`

/**
 * Server-rendered pagination. Every page is a real `<a href>` carrying the
 * full filter state, so a crawler can walk the whole result set and a user can
 * bookmark or share any page — that's the point of keeping pagination in the
 * URL rather than behind a "Load more" button.
 */
export function BlogSearchPagination({ params, lastPage }: { params: BlogSearchParams; lastPage: number }) {
  if (lastPage <= 1) return null

  const pages = pageWindow(params.page, lastPage)
  const href = (page: number) => buildBlogSearchHref({ ...params, page })

  return (
    <nav aria-label="Search results pages" className="mt-14 md:mt-20">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {params.page > 1 && (
          <li>
            <Link href={href(params.page - 1)} rel="prev" className={INACTIVE_CLASS}>
              Previous
            </Link>
          </li>
        )}

        {/* Jump-to-first, only once the window has drifted away from it. */}
        {pages[0] > 1 && (
          <>
            <li>
              <Link href={href(1)} className={INACTIVE_CLASS}>
                1
              </Link>
            </li>
            {pages[0] > 2 && (
              <li aria-hidden="true" className="px-1 text-sm text-(--color-text-faint)">
                …
              </li>
            )}
          </>
        )}

        {pages.map((page) => (
          <li key={page}>
            <Link
              href={href(page)}
              aria-current={page === params.page ? 'page' : undefined}
              className={page === params.page ? ACTIVE_CLASS : INACTIVE_CLASS}
            >
              {page}
            </Link>
          </li>
        ))}

        {pages[pages.length - 1] < lastPage && (
          <>
            {pages[pages.length - 1] < lastPage - 1 && (
              <li aria-hidden="true" className="px-1 text-sm text-(--color-text-faint)">
                …
              </li>
            )}
            <li>
              <Link href={href(lastPage)} className={INACTIVE_CLASS}>
                {lastPage}
              </Link>
            </li>
          </>
        )}

        {params.page < lastPage && (
          <li>
            <Link href={href(params.page + 1)} rel="next" className={INACTIVE_CLASS}>
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
