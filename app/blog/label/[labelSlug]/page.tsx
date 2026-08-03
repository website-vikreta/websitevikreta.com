import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { BlogHeaderBar } from '@/components/blog/BlogHeaderBar'
import { BlogCard } from '@/components/blog/BlogCard'
import { FeaturedBlogHero } from '@/components/blog/FeaturedBlogHero'
import { selectFeaturedPost } from '@/lib/selectFeaturedPost'
import { SITE_URL } from '@/config/site'
import { fetchLabelBySlug, fetchPostsByLabel } from '@/sanity/lib/fetch'

interface LabelPageParams {
  params: Promise<{ labelSlug: string }>
}

export async function generateMetadata({ params }: LabelPageParams): Promise<Metadata> {
  const { labelSlug } = await params
  const label = await fetchLabelBySlug(labelSlug)
  if (!label) return {}

  const title = `${label.title} | Website Vikreta Blog`
  return {
    title,
    description: label.description,
    alternates: { canonical: `${SITE_URL}/blog/label/${labelSlug}` },
    openGraph: { title, description: label.description, url: `${SITE_URL}/blog/label/${labelSlug}` },
  }
}

export default async function LabelLandingPage({ params }: LabelPageParams) {
  const { labelSlug } = await params
  const [label, posts] = await Promise.all([
    fetchLabelBySlug(labelSlug),
    fetchPostsByLabel(labelSlug, 100),
  ])
  if (!label) notFound()

  // Hero pick is scoped to this label's own posts — not the sitewide pick
  // used on /blog — so each label gets its own hero from its own post list.
  const { featured, rest } = selectFeaturedPost(posts)

  // "Label" carries no href — /blog/label (the bare intermediate segment)
  // 404s, there's no landing page at that path. See the [Breadcrumb] entry
  // in .claude/learning.md.
  const breadcrumbSegments = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Label' },
    { label: label.title },
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
                {label.title}
              </h1>
              {label.description && (
                <p className="mt-3 max-w-2xl text-(--color-text-muted) md:mt-4">
                  {label.description}
                </p>
              )}
            </div>

            {posts.length === 0 ? (
              <p className="text-(--color-text-muted)">No posts under this label yet.</p>
            ) : (
              <>
                {featured && <FeaturedBlogHero post={featured} />}
                {rest.length > 0 && (
                  <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 md:gap-x-10 md:gap-y-20 lg:grid-cols-3">
                    {rest.map((post) => (
                      <BlogCard key={post.slug} post={post} />
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
