'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { RevealFade } from '@/components/ui/Reveal'
import { TextLink } from '@/components/ui/TextLink'
import type { DisplayPost } from '@/sanity/types'

interface FeaturedBlogHeroProps {
  post: DisplayPost
}

export function FeaturedBlogHero({ post }: FeaturedBlogHeroProps) {
  return (
    // as={motion.article} — pass the actual motion component, not the string
    // "article". RevealFade only casts its `as` prop's *type*; a plain
    // string renders an inert, non-animated tag with motion props dropped.
    <RevealFade
      as={motion.article}
      className="mb-10 md:mb-14 border border-(--color-border) hover:border-(--color-border-strong) transition-colors duration-300 lg:grid lg:grid-cols-2 lg:items-stretch"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group/img block relative aspect-video lg:aspect-auto overflow-hidden"
      >
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover/img:scale-105"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-(--color-bg-muted)" />
        )}
      </Link>

      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
        <span className="text-sm text-(--color-text-faint) mb-4">
          {post.publishDate} · {post.readTime}
        </span>

        <h3 className="text-3xl sm:text-4xl font-bold leading-[1.1] tracking-tight text-(--color-text) mb-4">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-(--color-text-muted) transition-colors duration-300"
          >
            {post.title}
          </Link>
        </h3>

        <p className="text-base text-(--color-text-muted) leading-[1.7] mb-6 max-w-[52ch]">
          {post.description}
        </p>

        <TextLink href={`/blog/${post.slug}`} arrow="diagonal">
          Read more
        </TextLink>
      </div>
    </RevealFade>
  )
}
