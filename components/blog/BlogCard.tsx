'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { TextLink } from '@/components/ui/TextLink'
import type { DisplayPost } from '@/sanity/types'

const cardReveal = {
  hidden: { y: 24, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
}

interface BlogCardProps {
  post: DisplayPost
  index: number
}

export function BlogCard({ post, index }: BlogCardProps) {
  // Slug should always resolve to { current: string } per our Sanity
  // schema, but tags come from a separate document reference — handled
  // defensively in case a tag is ever stored/queried as a plain string.
  const tags = (post.tags ?? [])
    .slice(0, 3)
    .map((tag) => {
      const rawSlug = tag.slug as { current: string } | string | undefined
      const slug = typeof rawSlug === 'string' ? rawSlug : rawSlug?.current
      return slug ? { ...tag, slug } : null
    })
    .filter((tag): tag is { _id: string; title: string; slug: string } => tag !== null)

  return (
    <motion.article
      custom={index}
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="flex flex-col"
    >
      {/* Image */}
      <Link href={`/blog/${post.slug}`} className="block relative mb-5 group/img">
        <div className="relative w-full aspect-video bg-[#121212] overflow-hidden">
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-[filter] duration-300 border border-(--color-border)"
            />
          ) : null}
        </div>
      </Link>

      {/* Title */}
      <h2
        className="font-bold leading-[1.2] tracking-tight text-[var(--color-text)] mb-3"
        style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.35rem)' }}
      >
        {post.title}
      </h2>

      {/* Description */}
      <p className="text-sm text-[var(--color-text-muted)] leading-[1.7] mb-5 flex-1">
        {post.description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Link
              key={tag._id}
              href={`/blog/tags/${tag.slug}`}
              className="rounded-full border border-(--color-border) px-3 py-1 text-xs text-(--color-text-muted) hover:border-(--color-text) hover:text-(--color-text) transition-colors duration-200"
            >
              {tag.title}
            </Link>
          ))}
        </div>
      )}

      {/* Footer: date + readtime | Read more */}
      <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4 mt-auto gap-4">
        <span className="text-[0.75rem] text-[var(--color-text-faint)] tracking-[0.03em] whitespace-nowrap">
          {post.publishDate} · {post.readTime}
        </span>
        <TextLink href={`/blog/${post.slug}`} arrow="diagonal">
          Read more
        </TextLink>
      </div>
    </motion.article>
  )
}
