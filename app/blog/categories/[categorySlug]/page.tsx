import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { BlogHeaderBar } from '@/components/blog/BlogHeaderBar'
import { InfiniteBlogGrid } from '@/components/blog/InfiniteBlogGrid'
import { SITE_URL } from '@/config/site'
import { fetchCategoryBySlug, fetchPostsByCategory } from '@/sanity/lib/fetch'

interface CategoryPageParams {
  params: Promise<{ categorySlug: string }>
}

export async function generateMetadata({ params }: CategoryPageParams): Promise<Metadata> {
  const { categorySlug } = await params
  const category = await fetchCategoryBySlug(categorySlug)
  if (!category) return {}

  const title = category.seoTitle || `${category.title} | Website Vikreta Blog`
  const description = category.seoDescription || category.description
  return {
    title,
    description,
    keywords: category.seoKeywords,
    alternates: { canonical: category.canonicalUrl || `${SITE_URL}/blog/categories/${categorySlug}` },
    openGraph: { title, description, url: `${SITE_URL}/blog/categories/${categorySlug}` },
  }
}

export default async function CategoryLandingPage({ params }: CategoryPageParams) {
  const { categorySlug } = await params
  const [category, posts] = await Promise.all([
    fetchCategoryBySlug(categorySlug),
    fetchPostsByCategory(categorySlug),
  ])
  if (!category) notFound()

  const breadcrumbSegments = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Categories', href: '/blog/categories' },
    { label: category.title },
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
                {category.title}
              </h1>
              {category.description && (
                <p className="mt-3 max-w-2xl text-(--color-text-muted) md:mt-4">
                  {category.description}
                </p>
              )}
            </div>

            {posts.length === 0 ? (
              <p className="text-(--color-text-muted)">No posts under this category yet.</p>
            ) : (
              <InfiniteBlogGrid
                posts={posts}
                endMessage="You've reached the end — that's every post in this category."
              />
            )}
          </div>
        </section>
      </main>
    </>
  )
}
