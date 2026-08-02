import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { blogPosts as staticPosts } from '@/lib/blog-data'
import { fetchPostBySlug, fetchAllSlugs } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/image'
import { Button } from '@/components/ui/Button'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { Breadcrumb, type BreadcrumbSegment } from '@/components/ui/Breadcrumb'
import PortableTextContent from '@/components/ui/PortableTextContent'
import type { FullPost } from '@/sanity/types'
import { SITE_URL } from '@/config/site'

export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function calcReadTime(body: any[]): string {
  const text = body
    .filter((b) => b._type === 'block')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .flatMap((b) => (b.children ?? []).map((c: any) => c.text ?? ''))
    .join(' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return `${Math.ceil(words / 200)} min read`
}

const isSanityConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)

export async function generateStaticParams() {
  const staticSlugs = staticPosts.map((p) => ({ slug: p.slug }))
  if (!isSanityConfigured) return staticSlugs
  try {
    const sanitySlugs = await fetchAllSlugs()
    const sanitySet = new Set(sanitySlugs)
    const merged = [
      ...sanitySlugs.map((slug) => ({ slug })),
      ...staticSlugs.filter((s) => !sanitySet.has(s.slug)),
    ]
    return merged
  } catch {
    return staticSlugs
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  if (isSanityConfigured) {
    try {
      const post = await fetchPostBySlug(slug)
      if (post) {
        const featuredImage = post.source === 'sanity' ? post.featuredImage : undefined
        return {
          title: `${post.seoTitle ?? post.title} | Website Vikreta`,
          description: post.seoDescription ?? post.description ?? '',
          keywords: post.seoKeywords ?? [],
          openGraph: {
            title: post.seoTitle ?? post.title,
            description: post.seoDescription ?? post.description ?? '',
            url: `${SITE_URL}/blog/${post.slug}`,
            siteName: 'Website Vikreta',
            type: 'article',
            locale: 'en_IN',
            images: featuredImage
              ? [
                  {
                    url: urlFor(featuredImage).width(1200).height(630).url(),
                    width: 1200,
                    height: 630,
                    alt: post.title,
                  },
                ]
              : [{ url: '/og-image.png', width: 1200, height: 675 }],
          },
          twitter: {
            card: 'summary_large_image',
            title: post.seoTitle ?? post.title,
            description: post.seoDescription ?? post.description ?? '',
            images: featuredImage
              ? [urlFor(featuredImage).width(1200).height(630).url()]
              : ['/og-image.png'],
          },
          alternates: {
            canonical: `${SITE_URL}/blog/${post.slug}`,
          },
          robots: {
            index: true,
            follow: true,
          },
        }
      }
    } catch (err) {
      console.error('[blog/[slug]] generateMetadata Sanity fetch failed:', slug, err)
    }
  }
  const post = staticPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} | Website Vikreta`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${slug}`,
      siteName: 'Website Vikreta',
      type: 'article',
      locale: 'en_IN',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 675,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
  }
}

async function getPost(slug: string): Promise<FullPost | null> {
  if (isSanityConfigured) {
    try {
      const sanityPost = await fetchPostBySlug(slug)
      if (sanityPost) return sanityPost
    } catch (err) {
      console.error('[blog/[slug]] Sanity fetch failed for slug:', slug, err)
    }
  }
  const p = staticPosts.find((s) => s.slug === slug)
  if (!p) return null
  return {
    source: 'static',
    slug: p.slug,
    category: p.category,
    title: p.title,
    description: p.description,
    publishDate: p.publishDate,
    readTime: p.readTime,
    body: p.body,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const hasCover = post.source === 'sanity' && Boolean(post.featuredImage)
  const readTime = post.source === 'sanity' && Array.isArray(post.body) && post.body.length > 0
    ? calcReadTime(post.body)
    : post.readTime

  // Category is only linkable when we have a real Sanity category doc +
  // slug behind it — static posts and Sanity posts with no category
  // reference just render the label as plain (unlinked) text.
  const categorySegment: BreadcrumbSegment =
    post.source === 'sanity' && post.categorySlug
      ? { label: post.categoryTitle ?? post.category, href: `/blog/category/${post.categorySlug}` }
      : { label: post.category }

  const breadcrumbSegments: BreadcrumbSegment[] = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    categorySegment,
    { label: post.title },
  ]

  return (
    <>
      <ScrollToTop />
      <main>
      <article>

        {/* Breadcrumb — absolute first element, clears the fixed navbar,
            sits above the cover image (full container width, not
            constrained to the 720px title column below). */}
        <div className="container pt-28 pb-4 md:pt-32 md:pb-6 lg:pt-36">
          <Breadcrumb segments={breadcrumbSegments} />
        </div>

        {/* Cover image — Sanity posts only */}
        {post.source === 'sanity' && post.featuredImage && (
          <div className="container">
            <div className="relative w-full overflow-hidden aspect-video lg:aspect-[16/6]">
              <Image
                src={urlFor(post.featuredImage).width(1200).height(675).url()}
                alt={post.featuredImage.alt ?? post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        <div className={`container pb-24 md:pb-32 ${hasCover ? 'pt-16 md:pt-20' : 'pt-6 md:pt-8'}`}>

          {/* Title */}
          <h2 className="text-h2 font-bold text-[var(--color-text)] tracking-tight mb-8 max-w-[720px] mx-auto">
            {post.title}
          </h2>

          {/* Byline — Sanity posts only */}
          {post.source === 'sanity' && (
            <div className="max-w-[720px] mx-auto mb-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                {/* Left: category + read time */}
                <div className="flex items-center gap-3 flex-wrap">
                  {post.category && (
                    <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-text)] border border-[var(--color-border)] px-2.5 py-1">
                      {post.category}
                    </span>
                  )}
                  {readTime && (
                    <>
                      <span className="text-[var(--color-text-muted)] text-xs">·</span>
                      <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest">
                        {readTime}
                      </span>
                    </>
                  )}
                </div>

                {/* Right: author */}
                {post.author && (
                  <div className="flex items-center gap-3">
                    {post.author.image && (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[var(--color-border)]">
                        <Image
                          src={urlFor(post.author.image).width(80).height(80).url()}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <Link
                      href={`/blog/author/${post.author.slug}`}
                      className="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-text-muted)] transition-colors duration-200 leading-tight"
                    >
                      {post.author.name}
                    </Link>
                  </div>
                )}

              </div>
              <hr className="mt-6 border-[var(--color-border)]" />
            </div>
          )}

          {/* Body */}
          <div className="mx-auto max-w-[720px]">
            {post.source === 'static' ? (
              <div className="space-y-6">
                {post.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-[var(--color-text-muted)] text-[1.0625rem] leading-[1.8]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <PortableTextContent value={post.body} />
            )}
          </div>

          {/* Tags */}
          {post.source === 'sanity' && post.tags && post.tags.length > 0 && (
            <div className="mx-auto max-w-[720px] mt-10 pt-8 border-t border-(--color-border)">
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => {
                  // Slug should always resolve to { current: string } per our
                  // Sanity schema, but handled defensively regardless.
                  const rawSlug = tag.slug as { current: string } | string | undefined
                  const slug = typeof rawSlug === 'string' ? rawSlug : rawSlug?.current
                  if (!slug) return null
                  return (
                    <Link
                      key={tag._id}
                      href={`/blog/tags/${slug}`}
                      className="rounded-full border border-(--color-border) px-4 py-1.5 text-sm text-(--color-text-muted) hover:border-(--color-text) hover:text-(--color-text) transition-colors duration-200"
                    >
                      {tag.title}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Go back */}
          <div className="flex justify-center mt-16">
            <Button href="/blog" variant="ghost">
              ← Go Back
            </Button>
          </div>

        </div>
      </article>
    </main>
    </>
  )
}
