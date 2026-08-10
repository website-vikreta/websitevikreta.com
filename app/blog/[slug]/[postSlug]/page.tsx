import { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { blogPosts as staticPosts } from '@/lib/blog-data'
import {
  fetchPostBySlug,
  fetchAllSlugsWithCategory,
  fetchAdjacentPosts,
  fetchRelatedPosts,
} from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/image'
import { postHref, slugifyCategory, FALLBACK_CATEGORY_SLUG } from '@/lib/blog-url'
import { BlogCard } from '@/components/blog/BlogCard'
import { PostNavigation } from '@/components/blog/PostNavigation'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { Breadcrumb, type BreadcrumbSegment } from '@/components/ui/Breadcrumb'
import PortableTextContent from '@/components/ui/PortableTextContent'
import { SocialShare } from '@/components/ui/SocialShare'
import { LikeButton } from '@/components/blog/LikeButton'
import { CommentSection } from '@/components/blog/CommentSection'
import type { AdjacentPost } from '@/sanity/lib/fetch'
import type { DisplayPost, FullPost } from '@/sanity/types'
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

/** The category segment a post's own URL should live under, independent of whatever categorySlug is currently in the route params. */
function canonicalCategorySlug(post: FullPost): string {
  if (post.source === 'sanity') return post.categorySlug || FALLBACK_CATEGORY_SLUG
  return slugifyCategory(post.category)
}

export async function generateStaticParams() {
  const staticParams = staticPosts.map((p) => ({
    slug: slugifyCategory(p.category),
    postSlug: p.slug,
  }))
  if (!isSanityConfigured) return staticParams
  try {
    const sanityPairs = await fetchAllSlugsWithCategory()
    const sanitySlugSet = new Set(sanityPairs.map((p) => p.slug))
    return [
      ...sanityPairs.map((p) => ({ slug: p.categorySlug, postSlug: p.slug })),
      ...staticParams.filter((p) => !sanitySlugSet.has(p.postSlug)),
    ]
  } catch {
    return staticParams
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; postSlug: string }>
}): Promise<Metadata> {
  const { postSlug } = await params
  if (isSanityConfigured) {
    try {
      const post = await fetchPostBySlug(postSlug)
      if (post) {
        const featuredImage = post.source === 'sanity' ? post.featuredImage : undefined
        const canonicalPath = postHref(canonicalCategorySlug(post), post.slug)
        return {
          title: `${post.seoTitle ?? post.title} | Website Vikreta`,
          description: post.seoDescription ?? post.description ?? '',
          keywords: post.seoKeywords ?? [],
          openGraph: {
            title: post.seoTitle ?? post.title,
            description: post.seoDescription ?? post.description ?? '',
            url: `${SITE_URL}${canonicalPath}`,
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
            canonical: `${SITE_URL}${canonicalPath}`,
          },
          robots: {
            index: true,
            follow: true,
          },
        }
      }
    } catch (err) {
      console.error('[blog/[slug]/[postSlug]] generateMetadata Sanity fetch failed:', postSlug, err)
    }
  }
  const post = staticPosts.find((p) => p.slug === postSlug)
  if (!post) return {}
  const canonicalPath = postHref(slugifyCategory(post.category), post.slug)
  return {
    title: `${post.title} | Website Vikreta`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}${canonicalPath}`,
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
      canonical: `${SITE_URL}${canonicalPath}`,
    },
  }
}

async function getPost(postSlug: string): Promise<FullPost | null> {
  if (isSanityConfigured) {
    try {
      const sanityPost = await fetchPostBySlug(postSlug)
      if (sanityPost) return sanityPost
    } catch (err) {
      console.error('[blog/[slug]/[postSlug]] Sanity fetch failed for slug:', postSlug, err)
    }
  }
  const p = staticPosts.find((s) => s.slug === postSlug)
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
  params: Promise<{ slug: string; postSlug: string }>
}) {
  const { slug: categorySlug, postSlug } = await params
  const post = await getPost(postSlug)
  if (!post) notFound()

  // The category segment in the URL is decorative routing on top of a
  // globally-unique post slug — if it doesn't match the post's real
  // category (stale link, wrong category picked, category renamed), send
  // search engines and users to the one canonical URL instead of serving
  // the same post under two paths.
  const canonicalSlug = canonicalCategorySlug(post)
  if (canonicalSlug !== categorySlug) {
    permanentRedirect(postHref(canonicalSlug, post.slug))
  }

  // The Sanity `readTime` field is editor-authored and is what every listing
  // card (grid, hero, label carousels) already displays — it must win here
  // too, or the detail page shows a different number than the card the
  // reader just clicked. Only compute from the body when the field is empty.
  const readTime = post.readTime ||
    (post.source === 'sanity' && Array.isArray(post.body) && post.body.length > 0 ? calcReadTime(post.body) : '')

  // Category is only linkable when we have a real Sanity category doc +
  // slug behind it — static posts and Sanity posts with no category
  // reference just render the label as plain (unlinked) text.
  const categorySegment: BreadcrumbSegment =
    post.source === 'sanity' && post.categorySlug
      ? { label: post.categoryTitle ?? post.category, href: `/blog/categories/${post.categorySlug}` }
      : { label: post.category }

  const breadcrumbSegments: BreadcrumbSegment[] = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    categorySegment,
    { label: post.title },
  ]

  // Same segments that render the visible Breadcrumb UI below, converted to
  // an absolute-URL BreadcrumbList so schema can never drift from what's on
  // screen. `item` is omitted for unlinked segments (last one, or a category
  // with no Sanity slug) per Google's breadcrumb spec.
  const breadcrumbJsonLd = {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}${postHref(canonicalSlug, post.slug)}#breadcrumb`,
    itemListElement: breadcrumbSegments.map((segment, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: segment.label,
      ...(segment.href ? { item: `${SITE_URL}${segment.href}` } : {}),
    })),
  }

  // Previous/Next nav + related reads are Sanity-only — static fallback
  // posts (used when Sanity isn't configured) have no adjacency/relation
  // data to query against.
  let previousPost: AdjacentPost | null = null
  let nextPost: AdjacentPost | null = null
  let relatedPosts: DisplayPost[] = []
  if (post.source === 'sanity') {
    const [adjacent, related] = await Promise.all([
      post.publishedAt ? fetchAdjacentPosts(post.publishedAt) : Promise.resolve({ previous: null, next: null }),
      fetchRelatedPosts({
        slug: post.slug,
        categorySlug: post.categorySlug,
        tagIds: (post.tags ?? []).map((tag) => tag._id),
        keywords: post.seoKeywords,
      }),
    ])
    previousPost = adjacent.previous
    nextPost = adjacent.next
    relatedPosts = related
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', ...breadcrumbJsonLd }) }}
      />
      <ScrollToTop />
      <main>
      <article>

        {/* Breadcrumb — pt-20/24 matches /blog's own header container
            exactly, so it sits at the same height as on the parent route. */}
        <div className="container pt-20 pb-6 md:pt-24 md:pb-8">
          <Breadcrumb segments={breadcrumbSegments} />
        </div>

        {/* Cover image — Sanity posts only. Matches the 720px content column
            (title/body/byline) and stays 16:9 at every breakpoint. */}
        {post.source === 'sanity' && post.featuredImage && (
          <div className="container">
            <div className="relative mx-auto aspect-video w-full max-w-[720px] overflow-hidden">
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

        <div className="container pb-24 pt-6 md:pb-32 md:pt-8">

          {/* Title — same pt-6/8 gap above (from breadcrumb or cover image)
              as below (to byline/body), matching the compact rhythm above.
              This is the page's only <h1> — everything else on the post
              (Related reads, card titles) nests under it. */}
          <h1 className="text-h2 font-bold text-[var(--color-text)] tracking-tight mb-6 max-w-[720px] mx-auto md:mb-8">
            {post.title}
          </h1>

          {/* Byline — Sanity posts only */}
          {post.source === 'sanity' && (
            <div className="max-w-[720px] mx-auto mb-6 md:mb-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                {/* Left: category + read time */}
                <div className="flex items-center gap-3 flex-wrap">
                  {post.category && (
                    post.categorySlug ? (
                      <Link
                        href={`/blog/categories/${post.categorySlug}`}
                        className="bg-(--color-accent) px-3 py-1 text-sm font-medium text-(--color-text) transition-colors duration-300 hover:bg-(--color-accent-dark)"
                      >
                        {post.categoryTitle ?? post.category}
                      </Link>
                    ) : (
                      <span className="bg-(--color-accent) px-3 py-1 text-sm font-medium text-(--color-text)">
                        {post.categoryTitle ?? post.category}
                      </span>
                    )
                  )}
                  {readTime && (
                    <>
                      <span className="text-[var(--color-text-muted)] text-xs">·</span>
                      <span className="text-sm text-(--color-text-muted)">
                        {readTime}
                      </span>
                    </>
                  )}
                </div>

                {/* Right: author — whole block is one link, not just the name */}
                {post.author && (
                  <Link
                    href={`/blog/authors/${post.author.slug}`}
                    className="group flex items-center gap-3 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text)"
                  >
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
                    <div className="flex flex-col">
                      <span className="text-xs text-(--color-text-faint)">Written by</span>
                      <span className="text-sm font-medium text-[var(--color-text)] transition-colors duration-200 leading-tight group-hover:text-[var(--color-text-muted)]">
                        {post.author.name}
                      </span>
                    </div>
                  </Link>
                )}

              </div>
              <hr className="mt-6 border-[var(--color-border)]" />
              <div className="mt-6 flex items-center justify-between gap-4">
                <SocialShare path={postHref(canonicalSlug, post.slug)} title={post.title} campaign="blog" />
                <LikeButton postId={post._id} initialLikes={post.likes} />
              </div>
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

          {/* Tags — link to each tag's own landing page. Filled light-grey
              pills, distinct from the category's solid dark badge above. */}
          {post.source === 'sanity' && post.tags && post.tags.length > 0 && (
            <div className="mx-auto max-w-[720px] mt-10 pt-8 border-t border-(--color-border)">
              <h3 className="mb-4 text-sm font-semibold text-(--color-text-muted)">Tags</h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <Link
                    key={tag._id}
                    href={`/blog/tags/${tag.slug.current}`}
                    className="rounded-full bg-(--color-bg-muted) px-4 py-1.5 text-sm text-(--color-text-muted) transition-colors duration-300 hover:bg-(--color-border-strong) hover:text-(--color-text)"
                  >
                    {tag.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Comments — directly under the post's own content (tags), so it
              reads as commenting on the article above it rather than a
              disconnected form. Prev/Next + Related reads (navigating away)
              come after, not before. */}
          {post.source === 'sanity' && (
            <div className="mx-auto mt-16 max-w-[720px] md:mt-20">
              <CommentSection postId={post._id} comments={post.comments} />
            </div>
          )}

          {/* Previous / Next */}
          <PostNavigation previous={previousPost} next={nextPost} />

          {/* Related reads — same 720px column as the rest of the post */}
          {relatedPosts.length > 0 && (
            <div className="mx-auto mt-16 max-w-[720px] md:mt-20">
              <h2 className="mb-6 text-h3 font-bold tracking-tight text-(--color-text) md:mb-8">
                Related reads
              </h2>
              <div className="grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2">
                {relatedPosts.map((related) => (
                  <BlogCard key={related.slug} post={related} />
                ))}
              </div>
            </div>
          )}

        </div>
      </article>
    </main>
    </>
  )
}
