import { Metadata } from 'next'
import Link from 'next/link'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RevealText, RevealFade } from '@/components/ui/Reveal'
import { SITE_URL } from '@/config/site'
import { fetchAllTags } from '@/sanity/lib/fetch'

export const metadata: Metadata = {
  title: 'All Tags | Website Vikreta Blog',
  description: 'Browse every blog tag on Website Vikreta.',
  alternates: { canonical: `${SITE_URL}/blog/tags` },
  openGraph: {
    title: 'All Tags | Website Vikreta Blog',
    description: 'Browse every blog tag on Website Vikreta.',
    url: `${SITE_URL}/blog/tags`,
  },
}

const breadcrumbSegments = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Tags' },
]

export default async function TagsIndexPage() {
  const tags = await fetchAllTags()

  return (
    <>
      <ScrollToTop />
      <main>
        <section className="relative overflow-hidden">
          <div className="container pt-32 pb-20 md:pt-40 md:pb-28">
            <Breadcrumb segments={breadcrumbSegments} className="mb-6 md:mb-8" />

            <div className="mb-10 md:mb-14">
              <RevealText as="h1" className="text-h2 font-bold leading-[1.1] tracking-tight text-(--color-text)">
                All Tags
              </RevealText>
            </div>

            {tags.length === 0 ? (
              <p className="text-(--color-text-muted)">No tags yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 border-t border-l border-(--color-border)">
                {tags.map((tag, i) => (
                  <RevealFade key={tag._id} delay={i * 0.05} className="border-r border-b border-(--color-border)">
                    <Link
                      href={`/blog/tags/${tag.slug.current}`}
                      className="group flex h-full flex-col justify-between gap-4 bg-(--color-surface) p-6 transition-colors duration-300 hover:bg-(--color-bg-muted) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text)"
                    >
                      <div>
                        <h2 className="text-2xl font-bold tracking-tight text-(--color-text)">
                          {tag.title}
                        </h2>
                        {tag.description && (
                          <p className="mt-2 text-sm text-(--color-text-muted) line-clamp-2">
                            {tag.description}
                          </p>
                        )}
                      </div>
                      <span className="text-sm text-(--color-text-faint)">
                        {tag.postCount ?? 0} {tag.postCount === 1 ? 'post' : 'posts'}
                      </span>
                    </Link>
                  </RevealFade>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
