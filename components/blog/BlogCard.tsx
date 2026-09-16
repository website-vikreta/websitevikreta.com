import Link from 'next/link'
import Image from 'next/image'
import { Heart, MessageCircle } from 'lucide-react'
import { TextLink } from '@/components/ui/TextLink'
import { postHref } from '@/lib/blog-url'
import { cn } from '@/lib/utils'
import type { DisplayPost } from '@/sanity/types'

// Server Component — no scroll reveal, no motion, no client JS. See the
// [Anti-pattern] entry in .ai/learning.md: /blog/* is a reading surface,
// and an IntersectionObserver-gated `opacity: 0` on every card costs LCP,
// blocks text from being readable until a scroll event, and can strand
// results invisible when a grid swaps content in place. Loading state is
// carried by the skeletons, never by hiding real content.
interface BlogCardProps {
  post: DisplayPost
  /** Extra classes merged onto the outer article — e.g. `h-full` when a fixed-width carousel wrapper needs the card to stretch to match its row's tallest sibling. */
  className?: string
  /** Clamp the description to 2 lines — only for fixed-width carousel/horizontal-scroll rows (label rows, hero), where every card in the row must match height. Grid usages show the description in full. */
  clampDescription?: boolean
}

export function BlogCard({ post, className, clampDescription = false }: BlogCardProps) {
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
    <article className={cn('flex flex-col', className)}>
      {/* Image */}
      <Link href={postHref(post.categorySlug, post.slug)} className="block relative mb-5 group/img">
        <div className="relative w-full aspect-video bg-(--color-bg-muted) overflow-hidden">
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

      {/* Title — h3: this card sits under a page/section h1/h2 everywhere
          it's used (grid, label carousel row, related reads). Size is its
          own smaller step, not the sitewide text-2xl/3xl card-title tier —
          this card packs image + title + description + tags + footer in a
          dense 3-up grid, where that tier would crowd out the rest. */}
      <h3
        className="mb-3 text-[clamp(1.05rem,1.6vw,1.35rem)] font-bold leading-[1.2] tracking-tight"
      >
        <Link
          href={postHref(post.categorySlug, post.slug)}
          className="text-[var(--color-text)] hover:text-(--color-text-muted) transition-colors duration-300"
        >
          {post.title}
        </Link>
      </h3>

      {/* Description — clamped to 2 lines only in carousel/horizontal-scroll
          rows (same h-[Ne] + line-clamp-N pairing as FeaturedBlogHero/
          Carousel), so cards in that row stay the same height regardless of
          how long a post's description runs. No flex-1 here: flex items get
          an implicit min-height:auto that lets content escape the
          line-clamp's -webkit-box clip, so the fixed h-[3.4em] has to be the
          only thing sizing this when clamped. Grid usages render the
          description in full, unclamped. */}
      <p
        className={cn(
          'text-sm text-[var(--color-text-muted)] leading-[1.7] mb-5',
          clampDescription ? 'h-[3.4em] line-clamp-2' : ''
        )}
      >
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

      {/* Footer: like/comment counts (read-only — liking only happens on the
          post's own page) | Read more */}
      <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4 mt-auto gap-4">
        <div className="flex items-center gap-4 text-[0.8125rem] text-(--color-text-faint)">
          <span
            className="inline-flex items-center gap-1.5"
            aria-label={`${post.likes} like${post.likes === 1 ? '' : 's'}`}
          >
            <Heart size={14} strokeWidth={1.75} aria-hidden="true" />
            {post.likes}
          </span>
          <span
            className="inline-flex items-center gap-1.5"
            aria-label={`${post.commentsCount} comment${post.commentsCount === 1 ? '' : 's'}`}
          >
            <MessageCircle size={14} strokeWidth={1.75} aria-hidden="true" />
            {post.commentsCount}
          </span>
        </div>
        <TextLink href={postHref(post.categorySlug, post.slug)} arrow="diagonal">
          Read more
        </TextLink>
      </div>
    </article>
  )
}
