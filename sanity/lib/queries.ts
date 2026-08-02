import { groq } from 'next-sanity'

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
  ] | order(publishedAt desc) {
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

export const TAG_BY_SLUG_QUERY = groq`
  *[_type == "tag" && slug.current == $tagSlug][0] {
    _id,
    title,
    slug { current },
    description
  }
`

export const AUTHOR_BY_SLUG_QUERY = groq`
  *[_type == "author" && slug.current == $authorSlug][0] {
    _id,
    name,
    slug { current },
    image,
    shortBio,
    bio,
    linkedinUrl
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

export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(title asc) {
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

export const ALL_POST_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] { "slug": slug.current }
`

// Backward-compat aliases
export const allPostsQuery = ALL_POSTS_QUERY
export const postBySlugQuery = POST_BY_SLUG_QUERY
export const allPostSlugsQuery = ALL_POST_SLUGS_QUERY
