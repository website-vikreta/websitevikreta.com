import { TextLink } from '@/components/ui/TextLink'
import { buildBlogSearchHref } from '@/lib/blog-search-params'
import { fetchPostsByLabel } from '@/sanity/lib/fetch'
import { BlogCard } from './BlogCard'
import { ScrollableRow } from './ScrollableRow'

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
        {/* Every "View all" on the blog lands on /blog/search with the row's
            filter pre-applied — one place to browse, and the filter state is
            in the URL. (/blog/labels/[labelSlug] still exists as the indexable
            landing page for that label; the search page is noindex when
            filtered, so the two don't compete.) */}
        <TextLink href={buildBlogSearchHref({ labels: [labelSlug] })} arrow="right" className="shrink-0">
          View all
        </TextLink>
      </div>
      <ScrollableRow ariaLabel={title} gapClassName="gap-[1.875rem]">
        {posts.map((post) => (
          <div key={post.slug} className="w-72 shrink-0 snap-start sm:w-80">
            <BlogCard post={post} className="h-full" clampDescription />
          </div>
        ))}
      </ScrollableRow>
    </div>
  )
}
