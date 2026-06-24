import { blogPosts as staticPosts } from "@/lib/blog-data"
import { fetchHomepagePosts } from "@/sanity/lib/fetch"
import { BlogPreviewSectionClient, type BlogPreviewPost } from "./BlogPreviewSectionClient"

async function getPosts(): Promise<BlogPreviewPost[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return staticPosts.slice(0, 3).map((p) => ({
      title: p.title,
      excerpt: p.description,
      href: `/blog/${p.slug}`,
      imageUrl: p.imageUrl,
    }))
  }
  try {
    const posts = await fetchHomepagePosts()
    if (posts.length > 0) {
      return posts.map((p) => ({
        title: p.title,
        excerpt: p.description,
        href: `/blog/${p.slug}`,
        imageUrl: p.imageUrl,
      }))
    }
  } catch {
    // fall through to static
  }
  return staticPosts.slice(0, 3).map((p) => ({
    title: p.title,
    excerpt: p.description,
    href: `/blog/${p.slug}`,
    imageUrl: p.imageUrl,
  }))
}

export async function BlogPreviewSection() {
  const posts = await getPosts()
  return <BlogPreviewSectionClient posts={posts} />
}
