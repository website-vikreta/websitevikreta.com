import type { PortableTextBlock } from '@portabletext/react'

// ── Canonical interfaces ──────────────────────────────────────────────────────

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  alt?: string
  caption?: string
}

export interface Author {
  _id: string
  name: string
  slug: { current: string }
  image?: SanityImage
  bio?: string
  linkedinUrl?: string
}

export interface Category {
  _id: string
  title: string
  slug: { current: string }
  description?: string
}

export interface Post {
  _id: string
  _createdAt?: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt: string
  featuredImage?: SanityImage
  author?: Pick<Author, '_id' | 'name' | 'image'>
  category?: Pick<Category, '_id' | 'title' | 'slug'>
  readTime?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  featuredOnHomepage?: boolean
}

// ── Discriminated union — blog detail page handles static + Sanity posts ──────

export type FullPost =
  | {
      source: 'static'
      slug: string
      category: string
      title: string
      description: string
      publishDate: string
      readTime: string
      body: string[]
      seoTitle?: undefined
      seoDescription?: undefined
      seoKeywords?: undefined
    }
  | {
      source: 'sanity'
      slug: string
      category: string
      title: string
      description: string
      publishDate: string
      readTime: string
      body: PortableTextBlock[]
      featuredImage?: SanityImage
      author?: {
        name: string
        image?: SanityImage
        bio?: string
        linkedinUrl?: string
      }
      seoTitle?: string
      seoDescription?: string
      seoKeywords?: string[]
    }

// ── Blog listing UI ───────────────────────────────────────────────────────────

export interface DisplayPost {
  slug: string
  category: string
  title: string
  description: string
  publishDate: string
  readTime: string
  imageUrl?: string
}

// ── Backward-compat aliases ───────────────────────────────────────────────────

/** @deprecated Use SanityImage */
export type SanityImageAsset = SanityImage

/** @deprecated Use Author */
export type SanityAuthor = Author

/** @deprecated Use Category */
export type SanityCategory = Category

/** @deprecated Use Post */
export type SanityBlogPost = Post & { featuredImage?: SanityImage; body?: PortableTextBlock[] }
