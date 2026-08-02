import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import PortableTextContent from '@/components/ui/PortableTextContent'
import { AuthorArticlesList } from '@/components/blog/AuthorArticlesList'
import { SITE_URL } from '@/config/site'
import { urlFor } from '@/sanity/lib/image'
import { fetchAuthorBySlug, fetchPostsByAuthor } from '@/sanity/lib/fetch'

const FALLBACK_DESIGNATION = 'Author at Website Vikreta'

// lucide-react ships no brand/logo icons (dropped for licensing reasons) —
// inline the standard LinkedIn glyph rather than pulling in a whole
// brand-icon package for one icon.
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45z" />
    </svg>
  )
}

interface AuthorPageParams {
  params: Promise<{ authorSlug: string }>
}

export async function generateMetadata({ params }: AuthorPageParams): Promise<Metadata> {
  const { authorSlug } = await params
  const author = await fetchAuthorBySlug(authorSlug)
  if (!author) return {}

  const title = `${author.name} | Website Vikreta Blog`
  return {
    title,
    description: author.shortBio,
    alternates: { canonical: `${SITE_URL}/blog/author/${authorSlug}` },
    openGraph: { title, description: author.shortBio, url: `${SITE_URL}/blog/author/${authorSlug}` },
  }
}

export default async function AuthorLandingPage({ params }: AuthorPageParams) {
  const { authorSlug } = await params
  const [author, posts] = await Promise.all([
    fetchAuthorBySlug(authorSlug),
    fetchPostsByAuthor(authorSlug),
  ])
  if (!author) notFound()

  const breadcrumbSegments = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: author.name },
  ]

  return (
    <>
      <ScrollToTop />
      <main>
        <section className="relative overflow-hidden">
          <div className="container pt-20 pb-16 md:pt-24 md:pb-20">
            <Breadcrumb segments={breadcrumbSegments} className="mb-6 md:mb-8" />

            <div className="mx-auto max-w-[720px]">
              {/* Author identity — image, name, designation, LinkedIn */}
              <div className="mb-6 flex items-start gap-5">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-(--color-bg-muted) md:h-28 md:w-28">
                  {author.image && (
                    <Image
                      src={urlFor(author.image).width(224).height(224).url()}
                      alt={author.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-center self-stretch md:min-h-28">
                  <h1 className="text-h2 font-bold leading-[1.1] tracking-tight text-(--color-text)">
                    {author.name}
                  </h1>
                  <p className="mt-2 text-sm font-medium text-(--color-text-muted) md:text-base">
                    {author.designation || FALLBACK_DESIGNATION}
                  </p>
                  {author.linkedinUrl && (
                    <a
                      href={author.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-(--color-border) bg-(--color-surface) px-3.5 py-1.5 text-sm font-medium text-(--color-text) transition-colors duration-200 hover:border-(--color-text) hover:bg-(--color-bg-muted)"
                    >
                      <LinkedinIcon className="h-4 w-4" />
                      View on LinkedIn
                    </a>
                  )}
                </div>
              </div>

              {/* Short description */}
              {author.shortBio && (
                <p className="mb-6 border border-(--color-border) bg-(--color-bg-muted) p-5 text-lg leading-[1.6] text-(--color-text) md:mb-8 md:p-6">
                  {author.shortBio}
                </p>
              )}

              {/* Full bio */}
              {author.bio && author.bio.length > 0 && (
                <div className="mb-10 md:mb-12">
                  <h2 className="mb-4 text-lg font-bold tracking-tight text-(--color-text)">Bio</h2>
                  <PortableTextContent value={author.bio} />
                </div>
              )}

              {/* Articles by this author */}
              <div className="border-t border-(--color-border) pt-8 md:pt-10">
                <h2 className="mb-6 text-h3 font-bold tracking-tight text-(--color-text) md:mb-8">
                  Articles
                </h2>
                {posts.length === 0 ? (
                  <p className="text-(--color-text-muted)">No posts from this author yet.</p>
                ) : (
                  <AuthorArticlesList posts={posts} />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
