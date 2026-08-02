import { TextLink } from '@/components/ui/TextLink'
import { fetchPostsByLabel } from '@/sanity/lib/fetch'
import { BlogCard } from './BlogCard'

interface FeaturedLabelCarouselProps {
  title: string
  labelSlug: string
  /** Slugs to drop from this row — the post(s) already shown as the page hero, so they aren't duplicated. */
  excludeSlugs?: string[]
}

/** Server Component — fetches the top posts for one label and renders them as a snap-scrolling row of the same `BlogCard` used in the grid, so card design + typography stay identical everywhere a post shows up. Renders nothing if the label has no posts. */
export async function FeaturedLabelCarousel({ title, labelSlug, excludeSlugs }: FeaturedLabelCarouselProps) {
  const posts = await fetchPostsByLabel(labelSlug, 5, excludeSlugs)
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
        {posts.map((post, i) => (
          <div key={post.slug} className="w-72 shrink-0 snap-start sm:w-80">
            <BlogCard post={post} index={i} className="h-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
