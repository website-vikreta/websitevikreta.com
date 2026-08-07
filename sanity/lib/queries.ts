import { groq } from 'next-sanity'
import type { SortField, SortOrder } from '@/lib/blog-search-params'

const POST_SUMMARY = groq`
  _id,
  _createdAt,
  title,
  slug { current },
  excerpt,
  featuredImage { asset, hotspot, alt },
  "author": author->{ _id, name, image },
  "category": category->{ _id, title, slug { current } },
  "tags": tags[]->{ _id, title, slug { current } },
  "labels": labels[]->{ _id, title, slug { current } },
  publishedAt,
  readTime
`

export const ALL_POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    ${POST_SUMMARY}
  }
`

export const LATEST_POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3] {
    ${POST_SUMMARY}
  }
`

export const HOMEPAGE_POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && featuredOnHomepage == true] | order(publishedAt desc)[0...3] {
    ${POST_SUMMARY}
  }
`

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_SUMMARY},
    body,
    seoTitle,
    seoDescription,
    seoKeywords,
    canonicalUrl,
    "author": author->{ name, "slug": slug.current, image, bio, linkedinUrl }
  }
`

// Fallback lookup for the legacy /blog/{slug} redirect when $slug no longer
// matches any post's current slug — the post may have been renamed and had
// its old slug recorded in previousSlugs.
export const POST_BY_PREVIOUS_SLUG_QUERY = groq`
  *[_type == "post" && $slug in previousSlugs][0] {
    "slug": slug.current,
    "categorySlug": category->slug.current
  }
`

// Pre-existing — filters posts by category slug, returns POST_SUMMARY shape.
export const POSTS_BY_CATEGORY_QUERY = groq`
  *[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    ${POST_SUMMARY}
  }
`

export const POSTS_BY_TAG_QUERY = groq`
  *[_type == "post" && $tagSlug in tags[]->slug.current] | order(publishedAt desc) {
    ${POST_SUMMARY}
  }
`

export const POSTS_BY_AUTHOR_QUERY = groq`
  *[_type == "post" && author->slug.current == $authorSlug] | order(publishedAt desc) {
    ${POST_SUMMARY}
  }
`

// Powers the /blog index: category and search are both optional — a param
// left undefined is passed as null, and defined() treats null as "not set".
export const FILTERED_POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current)
    && (!defined($categorySlug) || category->slug.current == $categorySlug)
    && (!defined($searchQuery) || title match $searchQuery + "*" || excerpt match $searchQuery + "*")
  ] | order(publishedAt desc) [0...$limit] {
    ${POST_SUMMARY}
  }
`

// Powers the post detail page's Previous/Next nav — the post published
// just before / just after the current one, by publish date. Category is
// joined so the nav can link to /blog/{categorySlug}/{slug} (adjacency is
// global by date, not scoped to category, so the adjacent post can belong
// to a different category than the current one).
export const ADJACENT_POSTS_QUERY = groq`
  {
    "previous": *[_type == "post" && defined(slug.current) && publishedAt < $publishedAt] | order(publishedAt desc) [0] { title, "slug": slug.current, "categorySlug": category->slug.current, "categoryTitle": category->title },
    "next": *[_type == "post" && defined(slug.current) && publishedAt > $publishedAt] | order(publishedAt asc) [0] { title, "slug": slug.current, "categorySlug": category->slug.current, "categoryTitle": category->title }
  }
`

// Powers the post detail page's "Related reads" — other posts sharing the
// same category, an overlapping tag, or an overlapping SEO keyword.
// $tagIds and $keywords may be empty arrays; an empty array never matches
// count(...) > 0, so that clause just contributes nothing.
export const RELATED_POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current) && slug.current != $slug && (
    category->slug.current == $categorySlug ||
    count((tags[]._ref)[@ in $tagIds]) > 0 ||
    count((seoKeywords[])[@ in $keywords]) > 0
  )] | order(publishedAt desc) [0...2] {
    ${POST_SUMMARY}
  }
`

// Powers FeaturedLabelCarousel — up to 100 posts carrying a given label
// slug, newest first. The carousel/landing-page fetch wrappers slice this
// down to whatever limit they need client-side.
export const POSTS_BY_LABEL_QUERY = groq`
  *[_type == "post" && defined(slug.current) && $labelSlug in labels[]->slug.current] | order(publishedAt desc) [0...100] {
    ${POST_SUMMARY}
  }
`

// Only labels actually attached to at least one post — an empty label
// shouldn't render an empty carousel row on the blog index.
export const LABELS_WITH_POSTS_QUERY = groq`
  *[_type == "label" && count(*[_type == "post" && defined(slug.current) && references(^._id)]) > 0] | order(title asc) [0...6] {
    _id,
    title,
    slug { current }
  }
`

export const LABEL_BY_SLUG_QUERY = groq`
  *[_type == "label" && slug.current == $labelSlug][0] {
    _id,
    title,
    slug { current },
    description
  }
`

// Powers the /blog/labels index page's grid — every label regardless of
// post count, with postCount so each card can show how many posts sit
// under it (unlike LABELS_WITH_POSTS_QUERY / ALL_LABELS_WITH_POSTS_QUERY
// above, which both filter to labels that already have posts).
export const ALL_LABELS_QUERY = groq`
  *[_type == "label"] | order(title asc) {
    _id,
    title,
    slug { current },
    description,
    "postCount": count(*[_type == "post" && defined(slug.current) && references(^._id)])
  }
`

export const TAG_BY_SLUG_QUERY = groq`
  *[_type == "tag" && slug.current == $tagSlug][0] {
    _id,
    title,
    slug { current },
    description
  }
`

// Powers the /blog/tags index page's grid — every tag regardless of post
// count, with postCount (unlike TAGS_WITH_POSTS_QUERY above).
export const ALL_TAGS_QUERY = groq`
  *[_type == "tag"] | order(title asc) {
    _id,
    title,
    slug { current },
    description,
    "postCount": count(*[_type == "post" && defined(slug.current) && references(^._id)])
  }
`

export const AUTHOR_BY_SLUG_QUERY = groq`
  *[_type == "author" && slug.current == $authorSlug][0] {
    _id,
    name,
    slug { current },
    image,
    designation,
    shortBio,
    bio,
    linkedinUrl
  }
`

// Powers the /blog/authors index page's grid — every author, with
// postCount so each card can show how many articles they've written.
export const ALL_AUTHORS_QUERY = groq`
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    slug { current },
    image,
    designation,
    "postCount": count(*[_type == "post" && defined(slug.current) && references(^._id)])
  }
`

export const CATEGORY_BY_SLUG_QUERY = groq`
  *[_type == "category" && slug.current == $categorySlug][0] {
    _id,
    title,
    slug { current },
    description,
    seoTitle,
    seoDescription,
    seoKeywords,
    canonicalUrl
  }
`

// Powers the /blog/categories index page's grid — includes postCount so
// each card can show how many posts sit under that category.
export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug { current },
    description,
    seoTitle,
    seoDescription,
    seoKeywords,
    canonicalUrl,
    "postCount": count(*[_type == "post" && defined(slug.current) && references(^._id)])
  }
`

// Only categories actually attached to at least one post — powers the
// /blog index's category filter pills, so an empty category never shows
// as a filterable pill with nothing behind it.
export const CATEGORIES_WITH_POSTS_QUERY = groq`
  *[_type == "category" && count(*[_type == "post" && defined(slug.current) && references(^._id)]) > 0] | order(title asc) {
    _id,
    title,
    slug { current },
    description,
    seoTitle,
    seoDescription,
    seoKeywords,
    canonicalUrl
  }
`

// ── /blog/search ─────────────────────────────────────────────────────────────
// One filter expression, interpolated into BOTH the count and the page slice
// so the reported total can never drift from the rows actually returned.
//
// Every facet is optional and self-neutralising: an undefined param or an
// empty array contributes nothing to the predicate. Facets combine with AND
// (category AND tag AND label AND text); values *within* a facet combine with
// OR — the standard faceted-search convention.
const POST_SEARCH_FILTER = `
  _type == "post" && defined(slug.current)
  && (!defined($categorySlug) || category->slug.current == $categorySlug)
  && (count($tagSlugs) == 0 || count((tags[]->slug.current)[@ in $tagSlugs]) > 0)
  && (count($labelSlugs) == 0 || count((labels[]->slug.current)[@ in $labelSlugs]) > 0)
  && (!defined($searchQuery)
      || title match $searchQuery
      || excerpt match $searchQuery
      || category->title match $searchQuery
      || author->name match $searchQuery
      || count((tags[]->title)[@ match $searchQuery]) > 0
      || count((labels[]->title)[@ match $searchQuery]) > 0)
`

// GROQ's `order()` cannot take a parameter, so the clause is *selected* from
// this table rather than interpolated from user input — sort/sortOrder are
// already whitelisted enums in lib/blog-search-params.ts, and this keeps the
// only string concatenation in the query away from anything user-controlled.
const SEARCH_ORDER_CLAUSE: Record<SortField, Record<SortOrder, string>> = {
  'publish-date': { desc: 'publishedAt desc', asc: 'publishedAt asc' },
  title: { desc: 'lower(title) desc', asc: 'lower(title) asc' },
}

/** Builds the /blog/search query for one sort combination. Returns
 * `{ total, items }` in a single round trip — the page needs the unpaginated
 * total to render pagination, and a second query could disagree with the first. */
export function buildBlogSearchQuery(sort: SortField, sortOrder: SortOrder): string {
  return groq`{
    "total": count(*[${POST_SEARCH_FILTER}]),
    "items": *[${POST_SEARCH_FILTER}] | order(${SEARCH_ORDER_CLAUSE[sort][sortOrder]}) [$start...$end] {
      ${POST_SUMMARY}
    }
  }`
}

// Only tags actually attached to at least one post — powers the /blog/search
// page's tag filter (mirrors CATEGORIES_WITH_POSTS_QUERY).
export const TAGS_WITH_POSTS_QUERY = groq`
  *[_type == "tag" && count(*[_type == "post" && defined(slug.current) && references(^._id)]) > 0] | order(title asc) {
    _id,
    title,
    slug { current }
  }
`

// All labels with at least one post, uncapped — powers the /blog/search
// page's label filter. Distinct from LABELS_WITH_POSTS_QUERY above, which
// caps at 6 for the blog index's carousel rows.
export const ALL_LABELS_WITH_POSTS_QUERY = groq`
  *[_type == "label" && count(*[_type == "post" && defined(slug.current) && references(^._id)]) > 0] | order(title asc) {
    _id,
    title,
    slug { current }
  }
`

export const ALL_POST_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] { "slug": slug.current }
`

// Powers generateStaticParams for /blog/{categorySlug}/{postSlug}.
export const ALL_POST_SLUGS_WITH_CATEGORY_QUERY = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
    "categorySlug": category->slug.current
  }
`

// Backward-compat aliases
export const allPostsQuery = ALL_POSTS_QUERY
export const postBySlugQuery = POST_BY_SLUG_QUERY
export const allPostSlugsQuery = ALL_POST_SLUGS_QUERY
