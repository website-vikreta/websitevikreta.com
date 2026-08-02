import { client } from './client'
import {
  ALL_POSTS_QUERY,
  LATEST_POSTS_QUERY,
  HOMEPAGE_POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  POSTS_BY_CATEGORY_QUERY,
  POSTS_BY_TAG_QUERY,
  POSTS_BY_AUTHOR_QUERY,
  POSTS_BY_LABEL_QUERY,
  LABELS_WITH_POSTS_QUERY,
  LABEL_BY_SLUG_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  TAG_BY_SLUG_QUERY,
  AUTHOR_BY_SLUG_QUERY,
  FILTERED_POSTS_QUERY,
  ALL_CATEGORIES_QUERY,
  ALL_POST_SLUGS_QUERY,
} from './queries'
import { urlFor } from './image'
import type { PortableTextBlock } from '@portabletext/react'
import type { Post, FullPost, DisplayPost, SanityImage, Category, Label, Tag, Author } from '../types'

function isSanityConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
}

// ── Revalidation strategy ────────────────────────────────────────────────────
// NEXT_PUBLIC_REVALIDATE overrides the per-environment default. Unset: 10s
// (Local/Dev/Stage — fast content iteration), 60s (Production).
const PRODUCTION_REVALIDATE_SECONDS = 60
const NON_PRODUCTION_REVALIDATE_SECONDS = 10

function resolveRevalidateSeconds(): number {
  const raw = process.env.NEXT_PUBLIC_REVALIDATE
  const parsed = raw ? Number(raw) : NaN
  if (!Number.isNaN(parsed) && parsed >= 0) return parsed
  return process.env.NODE_ENV === 'production'
    ? PRODUCTION_REVALIDATE_SECONDS
    : NON_PRODUCTION_REVALIDATE_SECONDS
}

export const REVALIDATE_SECONDS = resolveRevalidateSeconds()

function formatDate(iso?: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function toDisplayPost(post: Post): DisplayPost {
  return {
    slug: post.slug.current,
    category: post.category?.title?.toUpperCase() ?? 'GENERAL',
    title: post.title,
    description: post.excerpt ?? '',
    publishDate: formatDate(post.publishedAt),
    readTime: post.readTime ?? '',
    imageUrl: post.featuredImage?.asset
      ? urlFor(post.featuredImage).width(800).fit('crop').url()
      : undefined,
    labels: post.labels,
    tags: post.tags,
  }
}

export async function fetchAllPosts(): Promise<Post[]> {
  if (!isSanityConfigured()) throw new Error('Sanity not configured')
  return client.fetch<Post[]>(ALL_POSTS_QUERY, {}, { next: { revalidate: REVALIDATE_SECONDS } })
}

export async function fetchLatestPosts(): Promise<Post[]> {
  if (!isSanityConfigured()) throw new Error('Sanity not configured')
  return client.fetch<Post[]>(LATEST_POSTS_QUERY, {}, { next: { revalidate: REVALIDATE_SECONDS } })
}

/** DisplayPost[] for a category slug, newest first — powers the /blog/category landing page. Never throws: an unconfigured store or query failure just yields an empty list. */
export async function fetchPostsByCategory(categorySlug: string): Promise<DisplayPost[]> {
  if (!isSanityConfigured()) return []
  try {
    const posts = await client.fetch<Post[]>(
      POSTS_BY_CATEGORY_QUERY,
      { categorySlug },
      { next: { revalidate: REVALIDATE_SECONDS } },
    )
    return posts.map(toDisplayPost)
  } catch {
    return []
  }
}

/** Single category by slug — powers the /blog/category/[categorySlug] landing page's heading + metadata. */
export async function fetchCategoryBySlug(categorySlug: string): Promise<Category | null> {
  if (!isSanityConfigured()) return null
  try {
    return await client.fetch<Category | null>(
      CATEGORY_BY_SLUG_QUERY,
      { categorySlug },
      { next: { revalidate: REVALIDATE_SECONDS } },
    )
  } catch {
    return null
  }
}

/** DisplayPost[] for a tag slug, newest first — powers the /blog/tags landing page. Never throws: an unconfigured store or query failure just yields an empty list. */
export async function fetchPostsByTag(tagSlug: string): Promise<DisplayPost[]> {
  if (!isSanityConfigured()) return []
  try {
    const posts = await client.fetch<Post[]>(
      POSTS_BY_TAG_QUERY,
      { tagSlug },
      { next: { revalidate: REVALIDATE_SECONDS } },
    )
    return posts.map(toDisplayPost)
  } catch {
    return []
  }
}

/** Single tag by slug — powers the /blog/tags/[slug] landing page's heading + metadata. */
export async function fetchTagBySlug(tagSlug: string): Promise<Tag | null> {
  if (!isSanityConfigured()) return null
  try {
    return await client.fetch<Tag | null>(
      TAG_BY_SLUG_QUERY,
      { tagSlug },
      { next: { revalidate: REVALIDATE_SECONDS } },
    )
  } catch {
    return null
  }
}

/** DisplayPost[] for an author slug, newest first — powers the /blog/author landing page. Never throws: an unconfigured store or query failure just yields an empty list. */
export async function fetchPostsByAuthor(authorSlug: string): Promise<DisplayPost[]> {
  if (!isSanityConfigured()) return []
  try {
    const posts = await client.fetch<Post[]>(
      POSTS_BY_AUTHOR_QUERY,
      { authorSlug },
      { next: { revalidate: REVALIDATE_SECONDS } },
    )
    return posts.map(toDisplayPost)
  } catch {
    return []
  }
}

/** Single author by slug — powers the /blog/author/[authorSlug] landing page's heading + metadata. */
export async function fetchAuthorBySlug(authorSlug: string): Promise<Author | null> {
  if (!isSanityConfigured()) return null
  try {
    return await client.fetch<Author | null>(
      AUTHOR_BY_SLUG_QUERY,
      { authorSlug },
      { next: { revalidate: REVALIDATE_SECONDS } },
    )
  } catch {
    return null
  }
}

/** Up to `limit` DisplayPost[] carrying a given label slug, newest first — powers FeaturedLabelCarousel and the /blog/label landing page. Never throws: an unconfigured store or query failure just yields an empty carousel row. */
export async function fetchPostsByLabel(labelSlug: string, limit = 5): Promise<DisplayPost[]> {
  if (!isSanityConfigured()) return []
  try {
    const posts = await client.fetch<Post[]>(
      POSTS_BY_LABEL_QUERY,
      { labelSlug },
      { next: { revalidate: REVALIDATE_SECONDS } },
    )
    return posts.slice(0, limit).map(toDisplayPost)
  } catch {
    return []
  }
}

/** Labels that have at least one post — drives which carousel rows render on the blog index. */
export async function fetchLabelsWithPosts(): Promise<Label[]> {
  if (!isSanityConfigured()) return []
  try {
    return await client.fetch<Label[]>(
      LABELS_WITH_POSTS_QUERY,
      {},
      { next: { revalidate: REVALIDATE_SECONDS } },
    )
  } catch {
    return []
  }
}

/** Single label by slug — powers the /blog/label/[labelSlug] landing page's heading + metadata. */
export async function fetchLabelBySlug(labelSlug: string): Promise<Label | null> {
  if (!isSanityConfigured()) return null
  try {
    return await client.fetch<Label | null>(
      LABEL_BY_SLUG_QUERY,
      { labelSlug },
      { next: { revalidate: REVALIDATE_SECONDS } },
    )
  } catch {
    return null
  }
}

export async function fetchAllCategories(): Promise<Category[]> {
  if (!isSanityConfigured()) throw new Error('Sanity not configured')
  return client.fetch<Category[]>(
    ALL_CATEGORIES_QUERY,
    {},
    { next: { revalidate: REVALIDATE_SECONDS } },
  )
}

/** Returns DisplayPost[] filtered by optional category slug and/or search query — used by the /blog index. */
export async function fetchFilteredBlogPosts(filters: {
  categorySlug?: string
  searchQuery?: string
} = {}): Promise<DisplayPost[]> {
  if (!isSanityConfigured()) throw new Error('Sanity not configured')
  const posts = await client.fetch<Post[]>(
    FILTERED_POSTS_QUERY,
    { categorySlug: filters.categorySlug ?? null, searchQuery: filters.searchQuery ?? null },
    { next: { revalidate: REVALIDATE_SECONDS } },
  )
  return posts.map(toDisplayPost)
}

/** Returns up to 3 DisplayPost[] for homepage — featured first, falls back to latest */
export async function fetchHomepagePosts(): Promise<DisplayPost[]> {
  if (!isSanityConfigured()) throw new Error('Sanity not configured')
  const featured = await client.fetch<Post[]>(
    HOMEPAGE_POSTS_QUERY,
    {},
    { next: { revalidate: REVALIDATE_SECONDS } },
  )
  if (featured.length > 0) return featured.map(toDisplayPost)
  const latest = await client.fetch<Post[]>(
    LATEST_POSTS_QUERY,
    {},
    { next: { revalidate: REVALIDATE_SECONDS } },
  )
  return latest.map(toDisplayPost)
}

/** Returns FullPost discriminated union — used by blog detail page */
export async function fetchPostBySlug(slug: string): Promise<FullPost | null> {
  if (!isSanityConfigured()) throw new Error('Sanity not configured')
  type PostData = (Omit<Post, 'author'> & {
    body?: unknown[]
    author?: { name: string; slug: string; image?: SanityImage; bio?: PortableTextBlock[]; linkedinUrl?: string }
  }) | null
  // Try exact slug; fall back to slug with leading space (Studio data-entry issue)
  let post = await client.fetch<PostData>(
    POST_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: REVALIDATE_SECONDS } },
  )
  if (!post) {
    post = await client.fetch<PostData>(
      POST_BY_SLUG_QUERY,
      { slug: ` ${slug}` },
      { next: { revalidate: REVALIDATE_SECONDS } },
    )
  }
  if (!post) return null

  return {
    source: 'sanity',
    slug: post.slug.current,
    category: post.category?.title?.toUpperCase() ?? 'GENERAL',
    title: post.title,
    description: post.excerpt ?? '',
    publishDate: formatDate(post.publishedAt),
    readTime: post.readTime ?? '',
    body: (post.body ?? []) as PortableTextBlock[],
    featuredImage: post.featuredImage,
    author: post.author ? {
      name: post.author.name,
      slug: post.author.slug,
      image: post.author.image,
      bio: post.author.bio,
      linkedinUrl: post.author.linkedinUrl,
    } : undefined,
    categorySlug: post.category?.slug?.current,
    categoryTitle: post.category?.title,
    tags: post.tags,
    labels: post.labels,
    canonicalUrl: post.canonicalUrl,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    seoKeywords: post.seoKeywords,
  } as Extract<FullPost, { source: 'sanity' }>
}

/** All slugs for generateStaticParams. Returns empty array if not configured. */
export async function fetchAllSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) return []
  const results = await client.fetch<{ slug: string }[]>(ALL_POST_SLUGS_QUERY)
  return results.map((r) => r.slug.trim())
}
