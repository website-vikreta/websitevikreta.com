import type { DisplayPost } from '@/sanity/types'

// A post carrying any of these label slugs gets the hero treatment. Falls
// back to the newest post (posts[0] — queries already order by
// publishedAt desc) when nothing is labeled.
const FEATURED_LABEL_SLUGS = new Set(['hero-banner', 'featured', 'featured-post'])

/** Picks the hero post out of a post list — shared by the blog index and any scoped listing (category, label) so each gets its own hero pick from just its own posts. */
export function selectFeaturedPost(posts: DisplayPost[]): {
  featured: DisplayPost | null
  rest: DisplayPost[]
} {
  if (posts.length === 0) return { featured: null, rest: [] }
  const labeled = posts.find((post) =>
    (post.labels ?? []).some((label) => FEATURED_LABEL_SLUGS.has(label.slug?.current ?? '')),
  )
  const featured = labeled ?? posts[0]
  return { featured, rest: posts.filter((post) => post.slug !== featured.slug) }
}
