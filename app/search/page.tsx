import { permanentRedirect } from 'next/navigation'
import { buildBlogSearchHref, parseBlogSearchParams, type RawSearchParams } from '@/lib/blog-search-params'

// Legacy /search route. It only ever searched blog posts, and now lives under
// the section it belongs to at /blog/search; this route 308s old links,
// bookmarks and indexed URLs across, carrying any filters in the query string
// with them (and normalising them on the way, via the shared parser).
export default async function LegacySearchRedirect({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>
}) {
  permanentRedirect(buildBlogSearchHref(parseBlogSearchParams(await searchParams)))
}
