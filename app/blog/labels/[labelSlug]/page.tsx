import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { BlogHeaderBar } from '@/components/blog/BlogHeaderBar'
import { InfiniteBlogGrid } from '@/components/blog/InfiniteBlogGrid'
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
    alternates: { canonical: `${SITE_URL}/blog/labels/${labelSlug}` },
    openGraph: { title, description: label.description, url: `${SITE_URL}/blog/labels/${labelSlug}` },
  }
}

export default async function LabelLandingPage({ params }: LabelPageParams) {
  const { labelSlug } = await params
  const [label, posts] = await Promise.all([
    fetchLabelBySlug(labelSlug),
    fetchPostsByLabel(labelSlug, 100),
  ])
  if (!label) notFound()

  const breadcrumbSegments = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Labels', href: '/blog/labels' },
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
              <InfiniteBlogGrid
                posts={posts}
                endMessage="You've reached the end — that's every post under this label."
              />
            )}
          </div>
        </section>
      </main>
    </>
  )
}
