import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { RevealText, RevealFade } from '@/components/ui/Reveal'
import { SITE_URL } from '@/config/site'
import { urlFor } from '@/sanity/lib/image'
import { fetchAllAuthors } from '@/sanity/lib/fetch'

const FALLBACK_DESIGNATION = 'Author at Website Vikreta'

export const metadata: Metadata = {
  title: 'All Authors | Website Vikreta Blog',
  description: 'Meet every author writing for the Website Vikreta blog.',
  alternates: { canonical: `${SITE_URL}/blog/authors` },
  openGraph: {
    title: 'All Authors | Website Vikreta Blog',
    description: 'Meet every author writing for the Website Vikreta blog.',
    url: `${SITE_URL}/blog/authors`,
  },
}

const breadcrumbSegments = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Authors' },
]

export default async function AuthorsIndexPage() {
  const authors = await fetchAllAuthors()

  return (
    <>
      <ScrollToTop />
      <main>
        <section className="relative overflow-hidden">
          <div className="container pt-32 pb-20 md:pt-40 md:pb-28">
            <Breadcrumb segments={breadcrumbSegments} className="mb-6 md:mb-8" />

            <div className="mb-10 md:mb-14">
              <RevealText as="h1" className="text-h2 font-bold leading-[1.1] tracking-tight text-(--color-text)">
                All Authors
              </RevealText>
            </div>

            {authors.length === 0 ? (
              <p className="text-(--color-text-muted)">No authors yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 border-t border-l border-(--color-border)">
                {authors.map((author, i) => (
                  <RevealFade key={author._id} delay={i * 0.05} className="border-r border-b border-(--color-border)">
                    <Link
                      href={`/blog/authors/${author.slug.current}`}
                      className="group flex h-full items-center gap-4 bg-(--color-surface) p-6 transition-colors duration-300 hover:bg-(--color-bg-muted) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text)"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-(--color-bg-muted)">
                        {author.image && (
                          <Image
                            src={urlFor(author.image).width(128).height(128).url()}
                            alt={author.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h2 className="truncate text-2xl font-bold tracking-tight text-(--color-text)">
                          {author.name}
                        </h2>
                        <p className="mt-1 truncate text-sm text-(--color-text-muted)">
                          {author.designation || FALLBACK_DESIGNATION}
                        </p>
                        <span className="mt-1 block text-sm text-(--color-text-faint)">
                          {author.postCount ?? 0} {author.postCount === 1 ? 'post' : 'posts'}
                        </span>
                      </div>
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
