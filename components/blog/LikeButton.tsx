'use client'

import { useEffect, useOptimistic, useRef, useState, useTransition } from 'react'
import { usePathname } from 'next/navigation'
import { Heart } from 'lucide-react'
import { likePost, unlikePost } from '@/actions/like-post'

const LIKED_POSTS_KEY = 'likedPosts'

function getLikedPostIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem(LIKED_POSTS_KEY) ?? '[]')
  } catch {
    return []
  }
}

function setLikedPostId(postId: string, liked: boolean) {
  const ids = getLikedPostIds()
  const next = liked ? [...ids, postId] : ids.filter((id) => id !== postId)
  localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(next))
}

interface LikeButtonProps {
  postId: string
  initialLikes: number
  /** 'sm' for dense card footers, 'md' (default) for the post detail page. */
  size?: 'sm' | 'md'
}

export function LikeButton({ postId, initialLikes, size = 'md' }: LikeButtonProps) {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [isLiked, setIsLiked] = useState(false)
  const [likes, addOptimisticDelta] = useOptimistic(
    initialLikes,
    (state: number, delta: number) => Math.max(0, state + delta),
  )
  // `isPending` is React state — it only becomes true on the next render,
  // not the instant startTransition is called. A spammed click can land in
  // that gap and start a second action before this one settles. A ref is
  // synchronous, so it closes the gap the state-based check can't.
  const isMutatingRef = useRef(false)

  // Liked state lives in localStorage, not Sanity — there's no per-user
  // auth on this site, so "has this browser liked this post" is the only
  // notion of "liked" we can track. Read after mount so server and first
  // client render agree (no hydration mismatch). Also listen for `storage`
  // events (fired in *other* tabs on the same origin, never the tab that
  // wrote the change) so liking a post in one tab updates the heart icon in
  // any other tab that has it open, instead of leaving it stale.
  useEffect(() => {
    setIsLiked(getLikedPostIds().includes(postId))

    function onStorage(e: StorageEvent) {
      if (e.key === LIKED_POSTS_KEY) setIsLiked(getLikedPostIds().includes(postId))
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [postId])

  function handleClick() {
    if (isMutatingRef.current) return
    isMutatingRef.current = true
    // Re-read localStorage fresh, not just the `isLiked` state captured at
    // mount — the same post can render in more than one card on a page
    // (e.g. also in "Related reads"), each its own component instance.
    const next = !getLikedPostIds().includes(postId)
    setIsLiked(next)
    // Write synchronously, before the action fires — a rapid second click
    // must see this updated value so it correctly unlikes instead of also
    // liking, which previously double-counted the like server-side.
    setLikedPostId(postId, next)
    startTransition(async () => {
      addOptimisticDelta(next ? 1 : -1)
      try {
        await (next ? likePost(postId, pathname) : unlikePost(postId, pathname))
      } catch {
        // Rate-limited or the write failed — undo the optimistic flip
        // instead of leaving the button stuck showing a state the server
        // never actually recorded.
        setIsLiked(!next)
        setLikedPostId(postId, !next)
      } finally {
        isMutatingRef.current = false
      }
    })
  }

  const iconSize = size === 'sm' ? 14 : 16

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={isLiked}
      aria-label={`${isLiked ? 'Unlike' : 'Like'} this post — ${likes} like${likes === 1 ? '' : 's'} so far`}
      className={`inline-flex items-center gap-2 text-sm transition-colors duration-300 disabled:cursor-default disabled:opacity-60 ${
        isLiked ? 'text-(--color-text)' : 'text-(--color-text-muted) hover:text-(--color-text)'
      }`}
    >
      <Heart
        size={iconSize}
        strokeWidth={1.75}
        aria-hidden="true"
        className={isLiked ? 'fill-(--color-text)' : undefined}
      />
      <span>{likes}</span>
    </button>
  )
}
