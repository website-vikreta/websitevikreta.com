import { client } from './client'
import {
  ALL_POSTS_QUERY,
  LATEST_POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  POSTS_BY_CATEGORY_QUERY,
  ALL_POST_SLUGS_QUERY,
} from './queries'
import { urlFor } from './image'
import type { PortableTextBlock } from '@portabletext/react'
import type { Post, FullPost, DisplayPost, SanityImage } from '../types'

function isSanityConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
}

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
  }
}

export async function fetchAllPosts(): Promise<Post[]> {
  if (!isSanityConfigured()) throw new Error('Sanity not configured')
  return client.fetch<Post[]>(ALL_POSTS_QUERY, {}, { next: { revalidate: 60 } })
}

export async function fetchLatestPosts(): Promise<Post[]> {
  if (!isSanityConfigured()) throw new Error('Sanity not configured')
  return client.fetch<Post[]>(LATEST_POSTS_QUERY, {}, { next: { revalidate: 60 } })
}

export async function fetchPostsByCategory(categorySlug: string): Promise<Post[]> {
  if (!isSanityConfigured()) throw new Error('Sanity not configured')
  return client.fetch<Post[]>(
    POSTS_BY_CATEGORY_QUERY,
    { categorySlug },
    { next: { revalidate: 60 } },
  )
}

/** Returns DisplayPost[] — used by blog listing page */
export async function fetchBlogPosts(): Promise<DisplayPost[]> {
  const posts = await fetchAllPosts()
  return posts.map(toDisplayPost)
}

/** Returns FullPost discriminated union — used by blog detail page */
export async function fetchPostBySlug(slug: string): Promise<FullPost | null> {
  if (!isSanityConfigured()) throw new Error('Sanity not configured')
  type PostData = (Omit<Post, 'author'> & {
    body?: unknown[]
    author?: { name: string; image?: SanityImage; bio?: string; linkedinUrl?: string }
  }) | null
  // Try exact slug; fall back to slug with leading space (Studio data-entry issue)
  let post = await client.fetch<PostData>(POST_BY_SLUG_QUERY, { slug }, { next: { revalidate: 60 } })
  if (!post) {
    post = await client.fetch<PostData>(POST_BY_SLUG_QUERY, { slug: ` ${slug}` }, { next: { revalidate: 60 } })
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
      image: post.author.image,
      bio: post.author.bio,
      linkedinUrl: post.author.linkedinUrl,
    } : undefined,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
  } as Extract<FullPost, { source: 'sanity' }>
}

/** All slugs for generateStaticParams. Returns empty array if not configured. */
export async function fetchAllSlugs(): Promise<string[]> {
  if (!isSanityConfigured()) return []
  const results = await client.fetch<{ slug: string }[]>(ALL_POST_SLUGS_QUERY)
  return results.map((r) => r.slug.trim())
}
