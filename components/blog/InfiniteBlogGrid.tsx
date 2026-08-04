'use client'

import { useEffect, useRef, useState } from 'react'
import { BlogCard } from '@/components/blog/BlogCard'
import { cn } from '@/lib/utils'
import type { DisplayPost } from '@/sanity/types'

const DESKTOP_QUERY = '(min-width: 768px)'
const PAGE_SIZE_MOBILE = 4
const PAGE_SIZE_DESKTOP = 6

interface InfiniteBlogGridProps {
  posts: DisplayPost[]
  /** Column classes above the shared `grid grid-cols-1 gap-x-10 gap-y-20 md:gap-x-[3.125rem] md:gap-y-[6.25rem]` base — narrow single-column pages (e.g. author, constrained to a 720px column) pass `sm:grid-cols-2`; wide taxonomy landing pages pass the sitewide 3-up `sm:grid-cols-2 lg:grid-cols-3`. */
  gridClassName?: string
  /** Shown once every post has loaded. */
  endMessage: string
}

/**
 * Uniform card grid with scroll-triggered lazy loading — no featured/hero
 * post, every item renders as the same BlogCard. Initial batch + each
 * subsequent batch is 6 posts on desktop (>=768px) / 4 on mobile, sliced
 * client-side from the already-fetched `posts` array (no separate paginated
 * query — taxonomy landing pages fetch their full post list up front).
 * An IntersectionObserver on a sentinel div (rootMargin 400px, fires before
 * the user hits bottom) grows the visible count by one page size at a time.
 */
export function InfiniteBlogGrid({ posts, gridClassName = 'sm:grid-cols-2 lg:grid-cols-3', endMessage }: InfiniteBlogGridProps) {
  const [pageSize, setPageSize] = useState(PAGE_SIZE_MOBILE)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE_MOBILE)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY)
    const applySize = () => {
      const size = mq.matches ? PAGE_SIZE_DESKTOP : PAGE_SIZE_MOBILE
      setPageSize(size)
      setVisibleCount(size)
    }
    applySize()
    mq.addEventListener('change', applySize)
    return () => mq.removeEventListener('change', applySize)
  }, [])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((count) => Math.min(count + pageSize, posts.length))
        }
      },
      { rootMargin: '400px 0px' },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [pageSize, posts.length])

  const visiblePosts = posts.slice(0, visibleCount)
  const hasMore = visibleCount < posts.length

  return (
    <div>
      <div className={cn('grid grid-cols-1 gap-x-10 gap-y-20 md:gap-x-[3.125rem] md:gap-y-[6.25rem]', gridClassName)}>
        {visiblePosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      {hasMore && <div ref={sentinelRef} aria-hidden="true" className="h-1" />}
      {!hasMore && (
        <p className="mt-12 text-center text-sm text-(--color-text-faint)">{endMessage}</p>
      )}
    </div>
  )
}
