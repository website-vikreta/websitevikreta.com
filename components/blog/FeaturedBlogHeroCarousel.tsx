'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TextLink } from '@/components/ui/TextLink'
import { postHref } from '@/lib/blog-url'
import { FeaturedBlogHero } from './FeaturedBlogHero'
import type { DisplayPost } from '@/sanity/types'

const AUTO_INTERVAL = 7000

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

/** Replaces motion/react's `useReducedMotion` so no /blog route has to pull
 * the animation library in just to read one media query. Server snapshot is
 * `false`; autoplay only ever starts after mount anyway. */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  )
}

interface FeaturedBlogHeroCarouselProps {
  posts: DisplayPost[]
}

/** Hero slider for posts carrying the "Featured Articles" Sanity label — same card
 * treatment as the single-post FeaturedBlogHero, switching between entries on an
 * interval + dot/arrow controls. Falls back to the plain FeaturedBlogHero when
 * there's only one (or zero) posts, since a carousel needs nothing to switch to. */
export function FeaturedBlogHeroCarousel({ posts }: FeaturedBlogHeroCarouselProps) {
  const [index, setIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const reduced = usePrefersReducedMotion()

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (reduced || posts.length <= 1) return
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % posts.length)
    }, AUTO_INTERVAL)
  }, [posts.length, reduced])

  useEffect(() => {
    startInterval()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [startInterval])

  const goTo = (i: number) => {
    setIndex((i + posts.length) % posts.length)
    startInterval()
  }

  if (posts.length === 0) return null
  if (posts.length === 1) return <FeaturedBlogHero post={posts[0]} />

  const post = posts[index]

  return (
    <div
      className="mb-10 md:mb-14"
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured articles"
      onMouseEnter={() => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }}
      onMouseLeave={startInterval}
    >
      {/* Slides swap by re-rendering one persistent <article>, not by
          unmounting it. The previous crossfade used AnimatePresence
          mode="wait", which left the container empty for the length of the
          exit animation — the card collapsed to zero height and everything
          below it jumped. The em-based fixed heights on the title/description
          keep this element the same size for every post, so the swap is
          shift-free. */}
      <div className="relative border border-(--color-border) hover:border-(--color-border-strong) transition-colors duration-300 overflow-hidden">
        <article className="lg:grid lg:grid-cols-2 lg:items-stretch lg:aspect-[32/9]">
            <Link
              href={postHref(post.categorySlug, post.slug)}
              className="group/img block relative aspect-video lg:aspect-auto overflow-hidden"
            >
              {post.imageUrl ? (
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                  priority={index === 0}
                />
              ) : (
                <div className="absolute inset-0 bg-(--color-bg-muted)" />
              )}
            </Link>

            <div className="flex flex-col justify-center overflow-hidden p-6 sm:p-8 lg:px-12 lg:py-8">
              <span className="text-sm text-(--color-text-faint) mb-4">
                {post.publishDate} · {post.readTime}
              </span>

              <h3 className="h-[3.3em] text-3xl sm:text-4xl font-bold leading-[1.1] tracking-tight text-(--color-text) mb-4">
                <Link
                  href={postHref(post.categorySlug, post.slug)}
                  className="line-clamp-3 hover:text-(--color-text-muted) transition-colors duration-300"
                >
                  {post.title}
                </Link>
              </h3>

              <p className="h-[5.1em] line-clamp-3 text-base text-(--color-text-muted) leading-[1.7] mb-6 max-w-[52ch]">
                {post.description}
              </p>

              <TextLink href={postHref(post.categorySlug, post.slug)} arrow="diagonal">
                Read more
              </TextLink>
            </div>
        </article>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {posts.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show featured article ${i + 1} of ${posts.length}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-(--color-text)' : 'w-1.5 bg-(--color-border-strong)'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <CarouselButton label="Previous featured article" onClick={() => goTo(index - 1)}>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </CarouselButton>
          <CarouselButton label="Next featured article" onClick={() => goTo(index + 1)}>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </CarouselButton>
        </div>
      </div>
    </div>
  )
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center border border-(--color-border) text-(--color-text) transition-colors hover:bg-(--color-text) hover:text-(--color-surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
    >
      {children}
    </button>
  )
}
