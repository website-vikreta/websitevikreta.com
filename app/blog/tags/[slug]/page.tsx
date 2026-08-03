import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { BlogHeaderBar } from '@/components/blog/BlogHeaderBar'
import { InfiniteBlogGrid } from '@/components/blog/InfiniteBlogGrid'
import { SITE_URL } from '@/config/site'
import { fetchTagBySlug, fetchPostsByTag } from '@/sanity/lib/fetch'

interface TagPageParams {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: TagPageParams): Promise<Metadata> {
  const { slug: tagSlug } = await params
  const tag = await fetchTagBySlug(tagSlug)
  if (!tag) return {}

  const title = `${tag.title} | Website Vikreta Blog`
  return {
    title,
    description: tag.description,
    alternates: { canonical: `${SITE_URL}/blog/tags/${tagSlug}` },
    openGraph: { title, description: tag.description, url: `${SITE_URL}/blog/tags/${tagSlug}` },
  }
}

export default async function TagLandingPage({ params }: TagPageParams) {
  const { slug: tagSlug } = await params
  const [tag, posts] = await Promise.all([
    fetchTagBySlug(tagSlug),
    fetchPostsByTag(tagSlug),
  ])
  if (!tag) notFound()

  const breadcrumbSegments = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Tags', href: '/blog/tags' },
    { label: tag.title },
  ]

  return (
    <>
      <ScrollToTop />
      <main>
        <section className="relative overflow-hidden">
          <div className="container pt-20 pb-16 md:pt-24 md:pb-20">
            <BlogHeaderBar segments={breadcrumbSegments} />

            <div className="mb-10 md:mb-14">
              <h1 className="text-h2 font-bold leading-[1.1] tracking-tight text-(--color-text)">
                {tag.title}
              </h1>
              {tag.description && (
                <p className="mt-3 max-w-2xl text-(--color-text-muted) md:mt-4">
                  {tag.description}
                </p>
              )}
            </div>

            {posts.length === 0 ? (
              <p className="text-(--color-text-muted)">No posts under this tag yet.</p>
            ) : (
              <InfiniteBlogGrid
                posts={posts}
                endMessage="You've reached the end — that's every post with this tag."
              />
            )}
          </div>
        </section>
      </main>
    </>
  )
}
