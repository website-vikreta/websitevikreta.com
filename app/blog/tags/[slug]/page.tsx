import { fetchPostsByTag } from '@/sanity/lib/fetch'

// Phase 3 scope: wire up data fetching only. No UI, no metadata yet.
export default async function TagLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: tagSlug } = await params
  const posts = await fetchPostsByTag(tagSlug)

  return (
    <main className="container pt-32 pb-24">
      <pre className="whitespace-pre-wrap break-words text-sm">
        {JSON.stringify({ tagSlug, posts }, null, 2)}
      </pre>
    </main>
  )
}
