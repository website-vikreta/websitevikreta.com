import { Metadata } from 'next'
import { SearchClient } from './SearchClient'
import { SEARCH_PAGE_SIZE } from './constants'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RevealText } from '@/components/ui/Reveal'
import { SITE_URL } from '@/config/site'
import {
  fetchPaginatedPosts,
  fetchCategoriesWithPosts,
  fetchTagsWithPosts,
  fetchAllLabelsWithPosts,
} from '@/sanity/lib/fetch'

export const metadata: Metadata = {
  title: 'Search the Blog | Website Vikreta',
  description: 'Search and filter every AI automation, Next.js, and web development article on the Website Vikreta blog by category, tag, label, and publish date.',
  alternates: {
    canonical: `${SITE_URL}/search`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

const BREADCRUMB_SEGMENTS = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Search' },
]

export default async function SearchPage() {
  const [posts, categories, tags, labels] = await Promise.all([
    fetchPaginatedPosts(0, SEARCH_PAGE_SIZE),
    fetchCategoriesWithPosts(),
    fetchTagsWithPosts(),
    fetchAllLabelsWithPosts(),
  ])

  return (
    <>
      <ScrollToTop />
      <main>
        <section className="relative overflow-hidden">
          <div className="container pt-20 pb-16 md:pt-24 md:pb-20">
            <Breadcrumb segments={BREADCRUMB_SEGMENTS} className="mb-6 md:mb-8" />

            <div className="mb-10 md:mb-14">
              <RevealText
                as="h1"
                className="text-h2 font-bold leading-[1.1] tracking-tight text-(--color-text)"
              >
                Search the blog
              </RevealText>
            </div>

            <SearchClient
              initialPosts={posts}
              initialHasMore={posts.length === SEARCH_PAGE_SIZE}
              categories={categories}
              tags={tags}
              labels={labels}
            />
          </div>
        </section>
      </main>
    </>
  )
}
