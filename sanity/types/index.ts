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
  designation?: string
  shortBio?: string
  bio?: PortableTextBlock[]
  linkedinUrl?: string
  /** Only populated by ALL_AUTHORS_QUERY (powers the /blog/authors index grid). */
  postCount?: number
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
  /** Only populated by ALL_CATEGORIES_QUERY (powers the /blog/categories index grid). */
  postCount?: number
}

export interface Tag {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  /** Only populated by ALL_TAGS_QUERY (powers the /blog/tags index grid). */
  postCount?: number
}

export interface Comment {
  _id: string
  name: string
  message: string
  _createdAt: string
  /** Set when this comment is a reply — the `_id` of the comment it replies to. Never nested more than one level (a reply's own parentId always points at a top-level comment). */
  parentId?: string
}

export interface Label {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  /** Only populated by ALL_LABELS_QUERY (powers the /blog/labels index grid). */
  postCount?: number
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
  likes: number
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
      _id: string
      slug: string
      category: string
      title: string
      description: string
      publishDate: string
      // Raw ISO publish timestamp, alongside the formatted publishDate above
      // — needed to query for the previous/next post by publish order.
      publishedAt?: string
      readTime: string
      likes: number
      comments: Comment[]
      body: PortableTextBlock[]
      featuredImage?: SanityImage
      author?: {
        name: string
        slug: string
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
  _id: string
  slug: string
  category: string
  // Category's own slug (not the uppercased display title above) — needed
  // to filter/match against a category identity, e.g. the /blog index's
  // client-side category filter.
  categorySlug?: string
  title: string
  description: string
  publishDate: string
  // Raw ISO publish timestamp, alongside the formatted publishDate above —
  // needed for chronological sort (e.g. the /search page's Newest/Oldest
  // toggle), since publishDate's "MMM D, YYYY" format doesn't sort
  // correctly as a plain string.
  publishedAt?: string
  readTime: string
  likes: number
  imageUrl?: string
  // Resolved label refs (e.g. "Featured", "Hero") — used to pick which
  // post gets special placement (see FeaturedBlogHero selection logic).
  labels?: Pick<Label, '_id' | 'title' | 'slug'>[]
  // Resolved tag refs — rendered as pills on the blog card.
  tags?: Pick<Tag, '_id' | 'title' | 'slug'>[]
  // Author name only — enough for the /search page's free-text search to
  // match against the byline without pulling in the author's image/bio.
  author?: { name: string }
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
