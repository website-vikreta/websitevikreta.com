import { Metadata } from 'next'
import { BlogListingClient } from './BlogListingClient'
import { blogPosts as staticPosts } from '@/lib/blog-data'
import { fetchBlogPosts } from '@/sanity/lib/fetch'
import type { DisplayPost } from '@/sanity/types'

export const metadata: Metadata = {
  title: 'Blog | Website Vikreta',
  description: 'Insights on AI, automation, web design, and digital growth from Website Vikreta.',
}

async function getPosts(): Promise<DisplayPost[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    // Sanity not yet configured — use static data
    return staticPosts.map((p) => ({
      slug: p.slug,
      category: p.category,
      title: p.title,
      description: p.description,
      publishDate: p.publishDate,
      readTime: p.readTime,
      imageUrl: p.imageUrl,
    }))
  }
  const staticFallback = staticPosts.map((p) => ({
    slug: p.slug,
    category: p.category,
    title: p.title,
    description: p.description,
    publishDate: p.publishDate,
    readTime: p.readTime,
    imageUrl: p.imageUrl,
  }))
  try {
    const posts = await fetchBlogPosts()
    return posts.length > 0 ? posts : staticFallback
  } catch {
    return staticFallback
  }
}

export default async function BlogPage() {
  const posts = await getPosts()
  return <BlogListingClient posts={posts} />
}
