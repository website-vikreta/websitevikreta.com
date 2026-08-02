'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { RevealFade, REVEAL_EASE } from '@/components/ui/Reveal'
import { TextLink } from '@/components/ui/TextLink'
import { postHref } from '@/lib/blog-url'
import { FeaturedBlogHero } from './FeaturedBlogHero'
import type { DisplayPost } from '@/sanity/types'

const AUTO_INTERVAL = 7000

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
  const reduced = useReducedMotion()

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
      <RevealFade className="relative border border-(--color-border) hover:border-(--color-border-strong) transition-colors duration-300 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={post.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: REVEAL_EASE }}
            className="lg:grid lg:grid-cols-2 lg:items-stretch"
          >
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

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
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
          </motion.article>
        </AnimatePresence>
      </RevealFade>

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
