import Image from 'next/image'
import Link from 'next/link'
import { TextLink } from '@/components/ui/TextLink'
import { fetchPostsByLabel } from '@/sanity/lib/fetch'
import type { DisplayPost } from '@/sanity/types'

interface FeaturedLabelCarouselProps {
  title: string
  labelSlug: string
}

function CarouselCard({ post }: { post: DisplayPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group/img w-72 shrink-0 snap-start sm:w-80"
    >
      <div className="relative mb-3 aspect-video w-full overflow-hidden bg-(--color-bg-muted)">
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 288px, 320px"
            className="object-cover transition-transform duration-500 group-hover/img:scale-105"
          />
        )}
      </div>
      <h3 className="mb-1 line-clamp-2 font-bold leading-[1.2] tracking-tight text-(--color-text)">
        {post.title}
      </h3>
      <span className="text-xs text-(--color-text-faint)">
        {post.publishDate} · {post.readTime}
      </span>
    </Link>
  )
}

/** Server Component — fetches the top posts for one label and renders them as a snap-scrolling row. Renders nothing if the label has no posts. */
export async function FeaturedLabelCarousel({ title, labelSlug }: FeaturedLabelCarouselProps) {
  const posts = await fetchPostsByLabel(labelSlug, 5)
  if (posts.length === 0) return null

  return (
    <div className="mb-10 md:mb-14">
      <div className="mb-6 flex items-end justify-between gap-4 md:mb-8">
        <h2 className="text-h3 font-bold tracking-tight text-(--color-text)">{title}</h2>
        <TextLink href={`/blog/label/${labelSlug}`} arrow="right" className="shrink-0">
          View all
        </TextLink>
      </div>
      <div className="flex snap-x snap-mandatory flex-row gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {posts.map((post) => (
          <CarouselCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
