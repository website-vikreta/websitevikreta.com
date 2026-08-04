import { blogPosts as staticPosts } from "@/lib/blog-data"
import { fetchHomepagePosts } from "@/sanity/lib/fetch"
import { postHref, slugifyCategory } from "@/lib/blog-url"
import { BlogPreviewSectionClient, type BlogPreviewPost } from "./BlogPreviewSectionClient"

function staticFallback(): BlogPreviewPost[] {
  return staticPosts.slice(0, 3).map((p) => ({
    title: p.title,
    excerpt: p.description,
    href: postHref(slugifyCategory(p.category), p.slug),
    imageUrl: p.imageUrl,
    category: p.category,
    readTime: p.readTime,
  }))
}

async function getPosts(): Promise<BlogPreviewPost[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return staticFallback()
  }
  try {
    const posts = await fetchHomepagePosts()
    if (posts.length > 0) {
      return posts.map((p) => ({
        title: p.title,
        excerpt: p.description,
        href: postHref(p.categorySlug, p.slug),
        imageUrl: p.imageUrl,
        category: p.category,
        readTime: p.readTime,
      }))
    }
  } catch {
    // fall through to static
  }
  return staticFallback()
}

export async function BlogPreviewSection() {
  const posts = await getPosts()
  return <BlogPreviewSectionClient posts={posts} />
}
