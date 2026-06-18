import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { blogPosts as staticPosts } from '@/lib/blog-data'
import { fetchPostBySlug, fetchAllSlugs } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/image'
import { Button } from '@/components/ui/Button'
import type { FullPost } from '@/sanity/types'

export const dynamic = 'force-dynamic'

const isSanityConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ptComponents: any = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-8 mb-4 text-[var(--color-text)]">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold mt-6 mb-3 text-[var(--color-text)]">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed text-[var(--color-text-muted)]">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#FFD600] pl-4 italic my-6 text-[var(--color-text-muted)]">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-[var(--color-text)]">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-neutral-800 px-1 rounded text-sm font-mono text-[#FFD600]">{children}</code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : '_self'}
        rel={value?.blank ? 'noreferrer' : undefined}
        className="underline hover:text-[#FFD600] transition-colors"
      >
        {children}
      </a>
    ),
  },
}

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
        return {
          title: `${post.seoTitle ?? post.title} | Website Vikreta`,
          description: post.seoDescription ?? post.description,
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

  return (
    <main>
      <article>

        {/* Cover image — Sanity posts only */}
        {post.source === 'sanity' && post.featuredImage && (
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9', maxHeight: 520 }}>
            <Image
              src={urlFor(post.featuredImage).width(1200).height(675).url()}
              alt={post.featuredImage.alt ?? post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className={`container pb-24 md:pb-32 ${hasCover ? 'pt-16 md:pt-20' : 'pt-32 md:pt-40'}`}>

          {/* Title */}
          <h2 className="text-h2 font-bold text-[var(--color-text)] tracking-tight mb-12 max-w-[720px] mx-auto text-center">
            {post.title}
          </h2>

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
              <PortableText value={post.body} components={ptComponents} />
            )}
          </div>

          {/* Go back */}
          <div className="flex justify-center mt-20">
            <Button href="/blog" variant="ghost">
              ← Go Back
            </Button>
          </div>

        </div>
      </article>
    </main>
  )
}
