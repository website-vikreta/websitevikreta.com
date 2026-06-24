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

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_SUMMARY},
    body,
    seoTitle,
    seoDescription,
    "author": author->{ name, "slug": slug.current, image, bio, linkedinUrl }
  }
`

export const POSTS_BY_CATEGORY_QUERY = groq`
  *[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    ${POST_SUMMARY}
  }
`

export const ALL_POST_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] { "slug": slug.current }
`

// Backward-compat aliases
export const allPostsQuery = ALL_POSTS_QUERY
export const postBySlugQuery = POST_BY_SLUG_QUERY
export const allPostSlugsQuery = ALL_POST_SLUGS_QUERY
