import { fetchPostsByAuthor } from '@/sanity/lib/fetch'

// Phase 3 scope: wire up data fetching only. No UI, no metadata yet.
export default async function AuthorLandingPage({
  params,
}: {
  params: Promise<{ authorSlug: string }>
}) {
  const { authorSlug } = await params
  const posts = await fetchPostsByAuthor(authorSlug)

  return (
    <main className="container pt-32 pb-24">
      <pre className="whitespace-pre-wrap break-words text-sm">
        {JSON.stringify({ authorSlug, posts }, null, 2)}
      </pre>
    </main>
  )
}
