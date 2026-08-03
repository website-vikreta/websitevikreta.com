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
  CATEGORIES_WITH_POSTS_QUERY,
  TAGS_WITH_POSTS_QUERY,
  ALL_TAGS_QUERY,
  ALL_LABELS_WITH_POSTS_QUERY,
  ALL_LABELS_QUERY,
  ALL_AUTHORS_QUERY,
  ALL_POST_SLUGS_QUERY,
  ALL_POST_SLUGS_WITH_CATEGORY_QUERY,
  ADJACENT_POSTS_QUERY,
  RELATED_POSTS_QUERY,
  buildBlogSearchQuery,
} from './queries'
import { urlFor } from './image'
import { BLOG_SEARCH_PAGE_SIZE, type BlogSearchParams } from '@/lib/blog-search-params'
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
    categorySlug: post.category?.slug?.current,
    title: post.title,
    description: post.excerpt ?? '',
    publishDate: formatDate(post.publishedAt),
    publishedAt: post.publishedAt,
    readTime: post.readTime ?? '',
    imageUrl: post.featuredImage?.asset
      ? urlFor(post.featuredImage).width(800).fit('crop').url()
      : undefined,
    labels: post.labels,
    tags: post.tags,
    author: post.author ? { name: post.author.name } : undefined,
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

/** DisplayPost[] for a category slug, newest first — powers the /blog/categories landing page. Never throws: an unconfigured store or query failure just yields an empty list. */
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

/** Single category by slug — powers the /blog/categories/[categorySlug] landing page's heading + metadata. */
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

/** DisplayPost[] for an author slug, newest first — powers the /blog/authors landing page. Never throws: an unconfigured store or query failure just yields an empty list. */
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

/** Single author by slug — powers the /blog/authors/[authorSlug] landing page's heading + metadata. */
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

/** Up to `limit` DisplayPost[] carrying a given label slug, newest first — powers FeaturedLabelCarousel and the /blog/labels landing page. `excludeSlugs` drops posts (e.g. the post(s) already shown as the page's hero) before the limit is applied, so the row still fills up to `limit` distinct posts instead of coming up short. Never throws: an unconfigured store or query failure just yields an empty carousel row. */
export async function fetchPostsByLabel(
  labelSlug: string,
  limit = 5,
  excludeSlugs?: string | string[],
): Promise<DisplayPost[]> {
  if (!isSanityConfigured()) return []
  const exclude = new Set(Array.isArray(excludeSlugs) ? excludeSlugs : excludeSlugs ? [excludeSlugs] : [])
  try {
    const posts = await client.fetch<Post[]>(
      POSTS_BY_LABEL_QUERY,
      { labelSlug },
      { next: { revalidate: REVALIDATE_SECONDS } },
    )
    return posts
      .filter((post) => !exclude.has(post.slug.current))
      .slice(0, limit)
      .map(toDisplayPost)
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

/** Single label by slug — powers the /blog/labels/[labelSlug] landing page's heading + metadata. */
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

/** Every tag regardless of post count, with postCount — powers the /blog/tags index page. */
export async function fetchAllTags(): Promise<Tag[]> {
  if (!isSanityConfigured()) throw new Error('Sanity not configured')
  return client.fetch<Tag[]>(ALL_TAGS_QUERY, {}, { next: { revalidate: REVALIDATE_SECONDS } })
}

/** Every label regardless of post count, with postCount — powers the /blog/labels index page. */
export async function fetchAllLabels(): Promise<Label[]> {
  if (!isSanityConfigured()) throw new Error('Sanity not configured')
  return client.fetch<Label[]>(ALL_LABELS_QUERY, {}, { next: { revalidate: REVALIDATE_SECONDS } })
}

/** Every author, with postCount — powers the /blog/authors index page. */
export async function fetchAllAuthors(): Promise<Author[]> {
  if (!isSanityConfigured()) throw new Error('Sanity not configured')
  return client.fetch<Author[]>(ALL_AUTHORS_QUERY, {}, { next: { revalidate: REVALIDATE_SECONDS } })
}

/** Categories that have at least one post — powers the /blog index's category filter pills. Never throws: an unconfigured store or query failure just yields no pills. */
export async function fetchCategoriesWithPosts(): Promise<Category[]> {
  if (!isSanityConfigured()) return []
  try {
    return await client.fetch<Category[]>(
      CATEGORIES_WITH_POSTS_QUERY,
      {},
      { next: { revalidate: REVALIDATE_SECONDS } },
    )
  } catch {
    return []
  }
}

// /blog's own index grid is a "recent posts" preview, not the complete
// list — the page's "View all" button already sends to the fully
// server-paginated /blog/search for that. Capping here is what keeps this
// query from pulling every post in the blog on every request as the blog
// grows; BLOG_INDEX_DEFAULT_LIMIT is generous enough that it's invisible at
// today's post count.
const BLOG_INDEX_DEFAULT_LIMIT = 24

/** Returns DisplayPost[] filtered by optional category slug and/or search query — used by the /blog index. */
export async function fetchFilteredBlogPosts(filters: {
  categorySlug?: string
  searchQuery?: string
  limit?: number
} = {}): Promise<DisplayPost[]> {
  if (!isSanityConfigured()) throw new Error('Sanity not configured')
  const posts = await client.fetch<Post[]>(
    FILTERED_POSTS_QUERY,
    {
      categorySlug: filters.categorySlug ?? null,
      searchQuery: filters.searchQuery ?? null,
      limit: filters.limit ?? BLOG_INDEX_DEFAULT_LIMIT,
    },
    { next: { revalidate: REVALIDATE_SECONDS } },
  )
  return posts.map(toDisplayPost)
}

export interface BlogSearchResult {
  posts: DisplayPost[]
  /** Matches across ALL pages, not just this slice — drives the result count and pagination. */
  total: number
}

/**
 * One page of /blog/search results. Every filter (text, category, tags,
 * labels, sort, page) is applied server-side in GROQ, so page N is *fetched*,
 * never sliced out of a client-side pool — a crawler hitting
 * `?category=x&page=3` gets exactly those posts in the HTML.
 *
 * Never throws: an unconfigured store or a failed query yields zero results
 * and the page renders its empty state instead of a 500.
 */
export async function fetchBlogSearchResults(params: BlogSearchParams): Promise<BlogSearchResult> {
  if (!isSanityConfigured()) return { posts: [], total: 0 }
  const start = (params.page - 1) * BLOG_SEARCH_PAGE_SIZE
  try {
    const { total, items } = await client.fetch<{ total: number; items: Post[] }>(
      buildBlogSearchQuery(params.sort, params.sortOrder),
      {
        // GROQ's defined() treats null as "not set", which is how each of
        // these clauses neutralises itself when the facet is unused.
        categorySlug: params.category || null,
        tagSlugs: params.tags,
        labelSlugs: params.labels,
        // Named searchQuery, not query — `query` is reserved on Sanity's
        // QueryParams type. Trailing wildcard = prefix search on the last
        // token, so "ai autom" matches "AI automation" while the earlier
        // tokens stay exact.
        searchQuery: params.query ? `${params.query}*` : null,
        start,
        end: start + BLOG_SEARCH_PAGE_SIZE,
      },
      { next: { revalidate: REVALIDATE_SECONDS } },
    )
    return { posts: items.map(toDisplayPost), total }
  } catch (err) {
    console.error('[blog/search] Sanity query failed:', err)
    return { posts: [], total: 0 }
  }
}

/** Tags that have at least one post — powers the /blog/search page's tag filter. Never throws: an unconfigured store or query failure just yields no filter options. */
export async function fetchTagsWithPosts(): Promise<Tag[]> {
  if (!isSanityConfigured()) return []
  try {
    return await client.fetch<Tag[]>(TAGS_WITH_POSTS_QUERY, {}, { next: { revalidate: REVALIDATE_SECONDS } })
  } catch {
    return []
  }
}

/** All labels with at least one post, uncapped — powers the /blog/search page's label filter (LABELS_WITH_POSTS_QUERY above stays capped at 6 for the blog index carousels). Never throws: an unconfigured store or query failure just yields no filter options. */
export async function fetchAllLabelsWithPosts(): Promise<Label[]> {
  if (!isSanityConfigured()) return []
  try {
    return await client.fetch<Label[]>(ALL_LABELS_WITH_POSTS_QUERY, {}, { next: { revalidate: REVALIDATE_SECONDS } })
  } catch {
    return []
  }
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
    publishedAt: post.publishedAt,
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

export interface AdjacentPost {
  title: string
  slug: string
  categorySlug?: string
  categoryTitle?: string
}

/** Previous/next post by publish date, relative to `publishedAt` — powers the post detail page's Previous/Next nav. Never throws: an unconfigured store or query failure just yields no nav links. */
export async function fetchAdjacentPosts(
  publishedAt: string,
): Promise<{ previous: AdjacentPost | null; next: AdjacentPost | null }> {
  if (!isSanityConfigured()) return { previous: null, next: null }
  try {
    return await client.fetch<{ previous: AdjacentPost | null; next: AdjacentPost | null }>(
      ADJACENT_POSTS_QUERY,
      { publishedAt },
      { next: { revalidate: REVALIDATE_SECONDS } },
    )
  } catch {
    return { previous: null, next: null }
  }
}

/** Up to 3 DisplayPost[] sharing the current post's category, an overlapping tag, or an overlapping SEO keyword — powers the post detail page's "Related reads". Never throws: an unconfigured store or query failure just yields no related posts. */
export async function fetchRelatedPosts(params: {
  slug: string
  categorySlug?: string
  tagIds?: string[]
  keywords?: string[]
}): Promise<DisplayPost[]> {
  if (!isSanityConfigured()) return []
  try {
    const posts = await client.fetch<Post[]>(
      RELATED_POSTS_QUERY,
      {
        slug: params.slug,
        categorySlug: params.categorySlug ?? '',
        tagIds: params.tagIds ?? [],
        keywords: params.keywords ?? [],
      },
      { next: { revalidate: REVALIDATE_SECONDS } },
    )
    return posts.map(toDisplayPost)
  } catch {
    return []
  }
}

/** All slugs for generateStaticParams. Returns empty array if not configured. */
export async function fetchAllSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) return []
  const results = await client.fetch<{ slug: string }[]>(ALL_POST_SLUGS_QUERY)
  return results.map((r) => r.slug.trim())
}

/** { categorySlug, slug } pairs for /blog/{categorySlug}/{postSlug}'s generateStaticParams. A post with no category reference is dropped — it has no static path to prerender and is only reachable once it's given a category. Returns empty array if not configured. */
export async function fetchAllSlugsWithCategory(): Promise<{ categorySlug: string; slug: string }[]> {
  if (!isSanityConfigured()) return []
  const results = await client.fetch<{ slug: string; categorySlug: string | null }[]>(
    ALL_POST_SLUGS_WITH_CATEGORY_QUERY,
  )
  return results
    .filter((r): r is { slug: string; categorySlug: string } => Boolean(r.categorySlug))
    .map((r) => ({ categorySlug: r.categorySlug, slug: r.slug.trim() }))
}
