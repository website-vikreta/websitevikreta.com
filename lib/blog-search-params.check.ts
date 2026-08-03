// Self-check for the /blog/search URL contract. No test framework — this file
// has no imports beyond the module under test, so it runs standalone:
//
//   npx tsc lib/blog-search-params.ts lib/blog-search-params.check.ts \
//     --outDir /tmp/bsp --module commonjs --target es2022 --strict --esModuleInterop &&
//   node /tmp/bsp/blog-search-params.check.js
//
// Covers the round trip (parse ∘ build === identity) and the edge cases the
// page relies on: sentinels, malformed input, duplicate keys, caps.

import {
  buildBlogSearchHref,
  parseBlogSearchParams,
  hasActiveFilters,
  totalPages,
  DEFAULT_BLOG_SEARCH_PARAMS,
  BLOG_SEARCH_PATH,
} from './blog-search-params'
import assert from 'node:assert/strict'

/** Parses an href the same way the page does, so build→parse can be asserted end to end. */
function parseHref(href: string) {
  const raw: Record<string, string | string[]> = {}
  for (const [key, value] of new URL(href, 'https://x.test').searchParams) {
    const existing = raw[key]
    if (existing === undefined) raw[key] = value
    else raw[key] = Array.isArray(existing) ? [...existing, value] : [existing, value]
  }
  return parseBlogSearchParams(raw)
}

// ── Defaults ────────────────────────────────────────────────────────────────
assert.deepEqual(parseBlogSearchParams({}), DEFAULT_BLOG_SEARCH_PARAMS)
assert.equal(buildBlogSearchHref(), BLOG_SEARCH_PATH)
assert.equal(buildBlogSearchHref(DEFAULT_BLOG_SEARCH_PARAMS), BLOG_SEARCH_PATH)

// ── `all` sentinel and page 1 collapse to the bare canonical URL ────────────
assert.deepEqual(parseBlogSearchParams({ query: 'all', page: '1' }), DEFAULT_BLOG_SEARCH_PARAMS)
assert.equal(buildBlogSearchHref(parseBlogSearchParams({ query: 'all', page: '2' })), '/blog/search?page=2')

// ── Full round trip ─────────────────────────────────────────────────────────
const full = parseBlogSearchParams({
  query: 'ai automation engine',
  category: 'ai-automation',
  tags: 'x,y,z',
  label: 'top-reads',
  sort: 'publish-date',
  sortOrder: 'asc',
  page: '3',
})
assert.deepEqual(full, {
  query: 'ai automation engine',
  category: 'ai-automation',
  tags: ['x', 'y', 'z'],
  labels: ['top-reads'],
  sort: 'publish-date',
  sortOrder: 'asc',
  page: 3,
})
assert.deepEqual(parseHref(buildBlogSearchHref(full)), full)
// sort is the default field, so it is omitted; sortOrder is not.
assert.equal(
  buildBlogSearchHref(full),
  '/blog/search?query=ai+automation+engine&category=ai-automation&tags=x,y,z&label=top-reads&sortOrder=asc&page=3',
)

// ── Repeated keys: `tags=x&tags=y` behaves like `tags=x,y`; first wins elsewhere ──
assert.deepEqual(parseBlogSearchParams({ tags: ['x', 'y'] }).tags, ['x', 'y'])
assert.equal(parseBlogSearchParams({ page: ['2', '9'] }).page, 2)

// ── Garbage in, defaults out — never a throw, never an out-of-range value ───
assert.equal(parseBlogSearchParams({ page: 'abc' }).page, 1)
assert.equal(parseBlogSearchParams({ page: '0' }).page, 1)
assert.equal(parseBlogSearchParams({ page: '-5' }).page, 1)
assert.equal(parseBlogSearchParams({ page: '99999999' }).page, 1000)
assert.equal(parseBlogSearchParams({ sort: 'DROP TABLE' }).sort, 'publish-date')
assert.equal(parseBlogSearchParams({ sortOrder: 'sideways' }).sortOrder, 'desc')

// ── Sanitisation ────────────────────────────────────────────────────────────
// GROQ `match` wildcards stripped, whitespace collapsed.
assert.equal(parseBlogSearchParams({ query: '  ***ai   **automation*  ' }).query, 'ai automation')
// Non-slug facet junk dropped; empties and duplicates removed; case normalised.
assert.deepEqual(parseBlogSearchParams({ tags: ',,SEO, next js ,seo,<script>' }).tags, ['seo', 'nextjs', 'script'])
assert.equal(parseBlogSearchParams({ category: '../../etc/passwd' }).category, 'etcpasswd')
// Facet list is capped.
assert.equal(parseBlogSearchParams({ tags: Array.from({ length: 50 }, (_, i) => `t${i}`).join(',') }).tags.length, 20)

// ── `labels` accepted as an alias for `label` ───────────────────────────────
assert.deepEqual(parseBlogSearchParams({ labels: 'top-reads' }).labels, ['top-reads'])

// ── Index policy ────────────────────────────────────────────────────────────
assert.equal(hasActiveFilters(DEFAULT_BLOG_SEARCH_PARAMS), false)
// Paging alone stays indexable; sorting or filtering does not.
assert.equal(hasActiveFilters({ ...DEFAULT_BLOG_SEARCH_PARAMS, page: 4 }), false)
assert.equal(hasActiveFilters({ ...DEFAULT_BLOG_SEARCH_PARAMS, sortOrder: 'asc' }), true)
assert.equal(hasActiveFilters({ ...DEFAULT_BLOG_SEARCH_PARAMS, tags: ['seo'] }), true)

// ── Pagination maths ────────────────────────────────────────────────────────
assert.equal(totalPages(0), 1)
assert.equal(totalPages(12), 1)
assert.equal(totalPages(13), 2)

console.log('blog-search-params: all checks passed')
