import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { BlogCard } from '@/components/blog/BlogCard'
import { FeaturedBlogHero } from '@/components/blog/FeaturedBlogHero'
import { TextLink } from '@/components/ui/TextLink'
import PortableTextContent from '@/components/ui/PortableTextContent'
import { selectFeaturedPost } from '@/lib/selectFeaturedPost'
import { SITE_URL } from '@/config/site'
import { urlFor } from '@/sanity/lib/image'
import { fetchAuthorBySlug, fetchPostsByAuthor } from '@/sanity/lib/fetch'

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

  // Hero pick is scoped to this author's own posts — not the sitewide pick
  // used on /blog — so each author gets their own hero from their own posts.
  const { featured, rest } = selectFeaturedPost(posts)

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
          <div className="container pt-32 pb-20 md:pt-40 md:pb-28">
            <Breadcrumb segments={breadcrumbSegments} className="mb-6 md:mb-8" />

            <div className="mb-10 flex items-center gap-4 md:mb-14">
              {author.image && (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-(--color-border)">
                  <Image
                    src={urlFor(author.image).width(128).height(128).url()}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h1 className="text-h2 font-bold leading-[1.1] tracking-tight text-(--color-text)">
                  {author.name}
                </h1>
                {author.shortBio && (
                  <p className="mt-2 text-(--color-text-muted)">{author.shortBio}</p>
                )}
              </div>
            </div>

            {author.linkedinUrl && (
              <div className="mb-10 md:mb-14">
                <TextLink href={author.linkedinUrl} external arrow="diagonal">
                  LinkedIn
                </TextLink>
              </div>
            )}

            {author.bio && author.bio.length > 0 && (
              <div className="mb-10 max-w-[720px] md:mb-14">
                <PortableTextContent value={author.bio} />
              </div>
            )}

            {posts.length === 0 ? (
              <p className="text-(--color-text-muted)">No posts from this author yet.</p>
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
