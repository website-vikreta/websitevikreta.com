import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { postHref } from '@/lib/blog-url'
import type { AdjacentPost } from '@/sanity/lib/fetch'

interface PostNavigationProps {
  previous: AdjacentPost | null
  next: AdjacentPost | null
}

function NavCard({ post, direction }: { post: AdjacentPost; direction: 'previous' | 'next' }) {
  const isNext = direction === 'next'
  return (
    <Link
      href={postHref(post.categorySlug, post.slug)}
      className={`group flex flex-col gap-3 border-r border-b border-(--color-border) p-6 transition-colors duration-300 ease-out hover:border-(--color-border-strong) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text) md:p-8 ${
        isNext ? 'items-end text-right' : 'items-start text-left'
      }`}
    >
      <span className="inline-flex items-center gap-1.5 text-sm text-(--color-text-muted)">
        {!isNext && (
          <ArrowLeft
            size={14}
            strokeWidth={1.75}
            className="transition-transform duration-300 ease-out group-hover:-translate-x-1"
            aria-hidden="true"
          />
        )}
        {isNext ? 'Next article' : 'Previous article'}
        {isNext && (
          <ArrowRight
            size={14}
            strokeWidth={1.75}
            className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
      </span>
      <span className="line-clamp-2 text-lg font-bold leading-snug tracking-tight text-(--color-text)">
        {post.title}
      </span>
      {post.categoryTitle && (
        <span className="text-sm text-(--color-text-faint)">{post.categoryTitle}</span>
      )}
    </Link>
  )
}

/** Previous/next post nav — boxy hairline-border cells (matches the sitewide bordered-grid card pattern). Renders nothing if neither exists; a lone previous/next spans full width instead of leaving a half-empty row. */
export function PostNavigation({ previous, next }: PostNavigationProps) {
  if (!previous && !next) return null

  return (
    <nav
      aria-label="Post navigation"
      className={`mx-auto mt-16 grid max-w-[720px] grid-cols-1 border-t border-l border-(--color-border) ${
        previous && next ? 'sm:grid-cols-2' : ''
      }`}
    >
      {previous && <NavCard post={previous} direction="previous" />}
      {next && <NavCard post={next} direction="next" />}
    </nav>
  )
}
