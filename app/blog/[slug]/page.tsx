import { notFound, permanentRedirect } from 'next/navigation'
import { blogPosts as staticPosts } from '@/lib/blog-data'
import { fetchPostBySlug, fetchAllSlugs } from '@/sanity/lib/fetch'
import { postHref, slugifyCategory, FALLBACK_CATEGORY_SLUG } from '@/lib/blog-url'

// Legacy /blog/{postSlug} route. The canonical post URL is now
// /blog/{categorySlug}/{postSlug} (see app/blog/[slug]/[postSlug]/page.tsx);
// this route just 308s old links/bookmarks/search results to it so nothing
// that pointed at the flat URL breaks.
export const dynamic = 'force-dynamic'

const isSanityConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)

export async function generateStaticParams() {
  const staticSlugs = staticPosts.map((p) => ({ slug: p.slug }))
  if (!isSanityConfigured) return staticSlugs
  try {
    const sanitySlugs = await fetchAllSlugs()
    const sanitySet = new Set(sanitySlugs)
    return [
      ...sanitySlugs.map((slug) => ({ slug })),
      ...staticSlugs.filter((s) => !sanitySet.has(s.slug)),
    ]
  } catch {
    return staticSlugs
  }
}

export default async function LegacyBlogPostRedirect({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (isSanityConfigured) {
    // permanentRedirect()/notFound() work by throwing — they must not be
    // called inside this try, or the catch below swallows the redirect and
    // falls through to a 404 instead of actually redirecting.
    let post: Awaited<ReturnType<typeof fetchPostBySlug>> = null
    try {
      post = await fetchPostBySlug(slug)
    } catch (err) {
      console.error('[blog/[slug]] legacy redirect Sanity fetch failed:', slug, err)
    }
    if (post) {
      const categorySlug = post.source === 'sanity' ? post.categorySlug : undefined
      permanentRedirect(postHref(categorySlug || FALLBACK_CATEGORY_SLUG, post.slug))
    }
  }

  const staticPost = staticPosts.find((p) => p.slug === slug)
  if (staticPost) {
    permanentRedirect(postHref(slugifyCategory(staticPost.category), staticPost.slug))
  }

  notFound()
}
