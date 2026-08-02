'use client'

import { useEffect, useRef, useState } from 'react'
import { BlogCard } from '@/components/blog/BlogCard'
import type { DisplayPost } from '@/sanity/types'

const DESKTOP_QUERY = '(min-width: 768px)'
const PAGE_SIZE_MOBILE = 4
const PAGE_SIZE_DESKTOP = 6

interface AuthorArticlesListProps {
  posts: DisplayPost[]
}

export function AuthorArticlesList({ posts }: AuthorArticlesListProps) {
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
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
        {visiblePosts.map((post, i) => (
          <BlogCard key={post.slug} post={post} index={i % pageSize} />
        ))}
      </div>
      {hasMore && <div ref={sentinelRef} aria-hidden="true" className="h-1" />}
      {!hasMore && (
        <p className="mt-12 text-center text-sm text-(--color-text-faint)">
          You&apos;ve reached the end — that&apos;s every article from this author.
        </p>
      )}
    </div>
  )
}
