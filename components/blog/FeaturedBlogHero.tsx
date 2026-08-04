import Image from 'next/image'
import Link from 'next/link'
import { TextLink } from '@/components/ui/TextLink'
import { postHref } from '@/lib/blog-url'
import type { DisplayPost } from '@/sanity/types'

interface FeaturedBlogHeroProps {
  post: DisplayPost
}

// Server Component, no reveal. This is the LCP element on /blog and on the
// category/label/tag landing pages — its image is `priority`, so gating the
// whole card behind a fade-in observer was actively fighting that. See the
// [Anti-pattern] entry in .claude/learning.md.
export function FeaturedBlogHero({ post }: FeaturedBlogHeroProps) {
  return (
    <article className="mb-10 md:mb-14 border border-(--color-border) hover:border-(--color-border-strong) transition-colors duration-300 lg:grid lg:grid-cols-2 lg:items-stretch lg:aspect-[32/9]">
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
            priority
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
  )
}
