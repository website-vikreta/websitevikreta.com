import { fetchPostBySlug } from '@/sanity/lib/fetch'
import { Breadcrumb, type BreadcrumbSegment } from '@/components/ui/Breadcrumb'

// Folder is named [slug] (not [categorySlug]) because Next.js App Router
// disallows two differently-named dynamic segments as siblings under
// app/blog/ — the existing flat app/blog/[slug]/page.tsx already claims
// that slot. This is the agreed transitional routing strategy: both the
// flat and nested routes coexist until a deliberate cutover + 301 redirect
// pass in a later phase. `slug` here IS the category slug.
//
// Phase 3 scope: wire up data fetching only. No UI, no metadata, no
// validation that postSlug actually belongs to categorySlug — that's
// deferred to a later phase.
export default async function NestedBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; postSlug: string }>
}) {
  const { slug: categorySlug, postSlug } = await params
  const post = await fetchPostBySlug(postSlug)

  // Category label is the raw URL slug for now — this route has no
  // category-title lookup yet (that lands with the real layout migration).
  // Post label prefers the fetched title; falls back to the slug if the
  // post wasn't found, since Phase 3 scope doesn't call notFound() here.
  const breadcrumbSegments: BreadcrumbSegment[] = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: categorySlug, href: `/blog/category/${categorySlug}` },
    { label: post?.title ?? postSlug },
  ]

  return (
    <main>
      {/* Breadcrumb — absolute first element, matches the flat route's
          placement/padding so both stay visually consistent. */}
      <div className="container pt-28 pb-4 md:pt-32 md:pb-6 lg:pt-36">
        <Breadcrumb segments={breadcrumbSegments} />
      </div>
      <div className="container pb-24 pt-6 md:pt-8">
        <pre className="whitespace-pre-wrap break-words text-sm">
          {JSON.stringify({ categorySlug, postSlug, post }, null, 2)}
        </pre>
      </div>
    </main>
  )
}
