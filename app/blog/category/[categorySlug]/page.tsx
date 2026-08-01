import { fetchPostsByCategory } from '@/sanity/lib/fetch'

// Phase 3 scope: wire up data fetching only. No UI, no metadata yet.
export default async function CategoryLandingPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>
}) {
  const { categorySlug } = await params
  const posts = await fetchPostsByCategory(categorySlug)

  return (
    <main className="container pt-32 pb-24">
      <pre className="whitespace-pre-wrap break-words text-sm">
        {JSON.stringify({ categorySlug, posts }, null, 2)}
      </pre>
    </main>
  )
}
