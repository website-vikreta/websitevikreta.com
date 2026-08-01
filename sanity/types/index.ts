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
  shortBio?: string
  bio?: PortableTextBlock[]
  linkedinUrl?: string
}

export interface Category {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  canonicalUrl?: string
}

export interface Tag {
  _id: string
  title: string
  slug: { current: string }
  description?: string
}

export interface Label {
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
  tags?: Pick<Tag, '_id' | 'title' | 'slug'>[]
  labels?: Pick<Label, '_id' | 'title' | 'slug'>[]
  readTime?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  canonicalUrl?: string
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
        bio?: PortableTextBlock[]
        linkedinUrl?: string
      }
      // Properly-cased title + slug of the resolved category, alongside the
      // existing `category` field (uppercased display string, used by the
      // badge). Needed for breadcrumb links — `category` alone loses the
      // slug and isn't safe to render as a label (see [Anti-pattern] no
      // uppercase eyebrow labels in .claude/learning.md).
      categorySlug?: string
      categoryTitle?: string
      tags?: Pick<Tag, '_id' | 'title' | 'slug'>[]
      labels?: Pick<Label, '_id' | 'title' | 'slug'>[]
      canonicalUrl?: string
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
  // Resolved label refs (e.g. "Featured", "Hero") — used to pick which
  // post gets special placement (see FeaturedBlogHero selection logic).
  labels?: Pick<Label, '_id' | 'title' | 'slug'>[]
  // Resolved tag refs — rendered as pills on the blog card.
  tags?: Pick<Tag, '_id' | 'title' | 'slug'>[]
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
