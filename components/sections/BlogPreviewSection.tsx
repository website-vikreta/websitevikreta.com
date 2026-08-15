import { blogPosts as staticPosts } from "@/lib/blog-data"
import { slugifyCategory } from "@/lib/blog-url"
import { fetchHomepagePosts } from "@/sanity/lib/fetch"
import type { DisplayPost } from "@/sanity/types"
import { BlogPreviewSectionClient } from "./BlogPreviewSectionClient"

function staticFallback(): DisplayPost[] {
  return staticPosts.slice(0, 3).map((p) => ({
    _id: p.slug,
    slug: p.slug,
    category: p.category,
    categorySlug: slugifyCategory(p.category),
    title: p.title,
    description: p.description,
    publishDate: p.publishDate,
    readTime: p.readTime,
    likes: 0,
    imageUrl: p.imageUrl,
  }))
}

async function getPosts(): Promise<DisplayPost[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return staticFallback()
  }
  try {
    const posts = await fetchHomepagePosts()
    if (posts.length > 0) return posts
  } catch {
    // fall through to static
  }
  return staticFallback()
}

export async function BlogPreviewSection() {
  const posts = await getPosts()
  return <BlogPreviewSectionClient posts={posts} />
}
