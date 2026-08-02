import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { BlogCard } from '@/components/blog/BlogCard'
import { FeaturedBlogHero } from '@/components/blog/FeaturedBlogHero'
import { selectFeaturedPost } from '@/lib/selectFeaturedPost'
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

  // Hero pick is scoped to this tag's own posts — not the sitewide pick
  // used on /blog — so each tag gets its own hero from its own post list.
  const { featured, rest } = selectFeaturedPost(posts)

  const breadcrumbSegments = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: tag.title },
  ]

  return (
    <>
      <ScrollToTop />
      <main>
        <section className="relative overflow-hidden">
          <div className="container pt-32 pb-20 md:pt-40 md:pb-28">
            <Breadcrumb segments={breadcrumbSegments} className="mb-6 md:mb-8" />

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
              <>
                {featured && <FeaturedBlogHero post={featured} />}
                {rest.length > 0 && (
                  <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 md:gap-x-10 md:gap-y-20 lg:grid-cols-3">
                    {rest.map((post, i) => (
                      <BlogCard key={post.slug} post={post} index={i} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
