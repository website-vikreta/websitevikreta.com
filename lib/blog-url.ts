// Single source of truth for building a blog post URL. Every place that
// links to a post (cards, hero, carousels, prev/next, sitemap) must go
// through this — post.category is a required Sanity field so categorySlug
// is normally present, but dangling references (deleted category) and the
// dev-only static fallback posts (lib/blog-data.ts) can still lack one.
export const FALLBACK_CATEGORY_SLUG = 'general'

export function postHref(categorySlug: string | undefined | null, slug: string): string {
  return `/blog/${categorySlug || FALLBACK_CATEGORY_SLUG}/${slug}`
}

/** Dev-only fallback: derives a URL-safe slug from the static posts' plain-text category label (e.g. "SEO & GEO" -> "seo-geo"). */
export function slugifyCategory(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
