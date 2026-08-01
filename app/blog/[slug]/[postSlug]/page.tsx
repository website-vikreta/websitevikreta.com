import { fetchPostBySlug } from '@/sanity/lib/fetch'

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

  return (
    <main className="container pt-32 pb-24">
      <pre className="whitespace-pre-wrap break-words text-sm">
        {JSON.stringify({ categorySlug, postSlug, post }, null, 2)}
      </pre>
    </main>
  )
}
