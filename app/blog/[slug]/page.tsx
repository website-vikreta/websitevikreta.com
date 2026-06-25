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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ptComponents: any = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-10 mb-4 text-[var(--color-text)]">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold mt-8 mb-3 text-[var(--color-text)]">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-semibold mt-6 mb-2 text-[var(--color-text)]">{children}</h4>
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
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-outside ml-6 mb-4 space-y-1 text-[var(--color-text-muted)]">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-outside ml-6 mb-4 space-y-1 text-[var(--color-text-muted)]">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
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
  types: {
    image: ({ value }: any) =>
      value?.asset ? (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(720).url()}
            alt={value.alt ?? ''}
            width={720}
            height={405}
            className="rounded w-full h-auto"
          />
          {value.caption && (
            <figcaption className="text-sm text-center text-[var(--color-text-muted)] mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      ) : null,
    table: ({ value }: any) => {
      const rows: { cells?: string[] }[] = value?.rows ?? []
      if (!rows.length) return null
      return (
        <div className="overflow-x-auto my-8">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={
                    i === 0
                      ? 'border-b-2 border-[#FFD600] bg-neutral-900'
                      : 'border-b border-neutral-800'
                  }
                >
                  {(row.cells ?? []).map((cell, j) => {
                    const Tag = i === 0 ? 'th' : 'td'
                    return (
                      <Tag
                        key={j}
                        className="px-4 py-2 text-left text-[var(--color-text)] font-normal"
                      >
                        {cell}
                      </Tag>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
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
          keywords: post.seoKeywords,
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
  const readTime = post.source === 'sanity' && Array.isArray(post.body) && post.body.length > 0
    ? calcReadTime(post.body)
    : post.readTime

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
          <h2 className="text-h2 font-bold text-[var(--color-text)] tracking-tight mb-8 max-w-[720px] mx-auto">
            {post.title}
          </h2>

          {/* Author byline — Sanity posts only */}
          {post.source === 'sanity' && post.author && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 items-start mb-16 max-w-[720px] mx-auto">
              {/* Left: label + photo + name */}
              <div className="flex flex-col gap-3">
                <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest">
                  Written by
                </p>
                <div className="flex items-center gap-3">
                  {post.author.linkedinUrl ? (
                    <a
                      href={post.author.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-block text-sm font-medium text-[var(--color-text)]"
                    >
                      {post.author.name}
                      <span className="absolute -bottom-px left-0 w-full h-px bg-[var(--color-text)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-[var(--color-text)]">{post.author.name}</span>
                  )}
                </div>
              </div>
              {/* Right: read time aligned to right border */}
              {readTime && (
                <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest md:text-right">
                  {readTime}
                </p>
              )}
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
              <PortableText value={post.body} components={ptComponents} />
            )}
          </div>

          {/* Go back */}
          <div className="flex justify-center mt-16">
            <Button href="/blog" variant="ghost">
              ← Go Back
            </Button>
          </div>

        </div>
      </article>
    </main>
  )
}
