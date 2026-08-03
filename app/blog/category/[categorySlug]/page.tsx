import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { BlogHeaderBar } from '@/components/blog/BlogHeaderBar'
import { BlogCard } from '@/components/blog/BlogCard'
import { FeaturedBlogHero } from '@/components/blog/FeaturedBlogHero'
import { selectFeaturedPost } from '@/lib/selectFeaturedPost'
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
    alternates: { canonical: category.canonicalUrl || `${SITE_URL}/blog/category/${categorySlug}` },
    openGraph: { title, description, url: `${SITE_URL}/blog/category/${categorySlug}` },
  }
}

export default async function CategoryLandingPage({ params }: CategoryPageParams) {
  const { categorySlug } = await params
  const [category, posts] = await Promise.all([
    fetchCategoryBySlug(categorySlug),
    fetchPostsByCategory(categorySlug),
  ])
  if (!category) notFound()

  // Hero pick is scoped to this category's own posts — not the sitewide
  // pick used on /blog — so each category gets its own hero from its own
  // post list, not whatever happens to be featured globally.
  const { featured, rest } = selectFeaturedPost(posts)

  // "Category" carries no href — /blog/category (the bare intermediate
  // segment) 404s, there's no landing page at that path, so the breadcrumb
  // must not link to it. See the [Breadcrumb] entry in .claude/learning.md.
  const breadcrumbSegments = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Category' },
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
