import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { BlogHeaderBar } from '@/components/blog/BlogHeaderBar'
import { InfiniteBlogGrid } from '@/components/blog/InfiniteBlogGrid'
import { Button } from '@/components/ui/Button'
import { TextLink } from '@/components/ui/TextLink'
import { SITE_URL } from '@/config/site'
import { fetchCategoryBySlug, fetchPostsByCategory } from '@/sanity/lib/fetch'
import { BLOG_SEARCH_PATH } from '@/lib/blog-search-params'

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
              <div className="flex items-end justify-between gap-4">
                <h1 className="text-h2 font-bold leading-[1.1] tracking-tight text-(--color-text)">
                  {category.title}
                </h1>
                <TextLink href={BLOG_SEARCH_PATH} arrow="right" className="shrink-0">
                  View all blogs
                </TextLink>
              </div>
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

            <div className="mt-14 flex justify-center md:mt-20">
              <Button href={BLOG_SEARCH_PATH} variant="ghost" size="md" showArrow>
                View all blogs
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
