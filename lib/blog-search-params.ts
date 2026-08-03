// URL ⇄ filter-state contract for /blog/search.
//
// The URL is the single source of truth. Every control writes a new URL, the
// server re-queries Sanity for whatever the URL says, and nothing is filtered
// client-side — so a crawler, a pasted link, and the back button all resolve
// to exactly the same result set a click produces.
//
//   /blog/search?query=ai+automation&category=ai-automation&tags=nextjs,seo
//               &label=top-reads&sort=publish-date&sortOrder=asc&page=2
//
// Both directions go through this file: parseBlogSearchParams() reads a URL,
// buildBlogSearchHref() writes one. Defaults are omitted when writing, so one
// filter state maps to exactly one canonical URL (?query=all&page=1 and the
// bare /blog/search are the same page, and say so via rel=canonical).

export const BLOG_SEARCH_PATH = '/blog/search'
export const BLOG_SEARCH_PAGE_SIZE = 12

/** `?query=all` is the spec's explicit "everything" sentinel — same as no query at all. */
export const QUERY_ALL = 'all'

// Hard caps: a hand-edited or crawler-mangled URL must not be able to turn
// into an unbounded GROQ query or a million-page pagination walk.
const MAX_QUERY_LENGTH = 100
const MAX_FACET_VALUES = 20
const MAX_PAGE = 1000

export const SORT_FIELDS = ['publish-date', 'title'] as const
export const SORT_ORDERS = ['desc', 'asc'] as const
export type SortField = (typeof SORT_FIELDS)[number]
export type SortOrder = (typeof SORT_ORDERS)[number]

export const DEFAULT_SORT: SortField = 'publish-date'
export const DEFAULT_SORT_ORDER: SortOrder = 'desc'

export interface BlogSearchParams {
  /** Free text. Empty when absent or when the `all` sentinel was used. */
  query: string
  /** Single category slug, '' when unset. */
  category: string
  /** Tag slugs — OR within the facet. */
  tags: string[]
  /** Label slugs — OR within the facet. Serialised as `label=` per the URL spec. */
  labels: string[]
  sort: SortField
  sortOrder: SortOrder
  /** 1-based, always ≥ 1. */
  page: number
}

/** Shape Next hands to a page's `searchParams` — a repeated key arrives as an array. */
export type RawSearchParams = Record<string, string | string[] | undefined>

export const DEFAULT_BLOG_SEARCH_PARAMS: BlogSearchParams = {
  query: '',
  category: '',
  tags: [],
  labels: [],
  sort: DEFAULT_SORT,
  sortOrder: DEFAULT_SORT_ORDER,
  page: 1,
}

/** `?page=1&page=2` — first value wins, rather than erroring or concatenating. */
function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? ''
  return value ?? ''
}

/** Free text is handed to GROQ `match`, where `*` is a wildcard — strip it (and
 * quotes/backslashes) so a pasted URL can't widen the query into a full scan. */
function sanitizeQuery(raw: string): string {
  const cleaned = raw
    .replace(/[*"'\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_QUERY_LENGTH)
  return cleaned.toLowerCase() === QUERY_ALL ? '' : cleaned
}

/** Facet values are Sanity slugs. Anything outside [a-z0-9-] isn't one, so it's
 * dropped here rather than round-tripped to the API as a guaranteed miss. */
function sanitizeSlug(raw: string): string {
  return raw.trim().toLowerCase().replace(/[^a-z0-9-]/g, '')
}

/** Accepts both `tags=a,b` and a repeated `tags=a&tags=b`; dedupes, drops
 * empties, and caps the count. */
function parseSlugList(value: string | string[] | undefined): string[] {
  const joined = Array.isArray(value) ? value.join(',') : (value ?? '')
  const seen = new Set<string>()
  for (const part of joined.split(',')) {
    const slug = sanitizeSlug(part)
    if (slug) seen.add(slug)
    if (seen.size >= MAX_FACET_VALUES) break
  }
  return [...seen]
}

function parsePage(value: string | string[] | undefined): number {
  const parsed = Number.parseInt(first(value), 10)
  if (!Number.isFinite(parsed) || parsed < 1) return 1
  return Math.min(parsed, MAX_PAGE)
}

function parseEnum<T extends string>(
  value: string | string[] | undefined,
  allowed: readonly T[],
  fallback: T,
): T {
  const candidate = first(value).trim().toLowerCase() as T
  return allowed.includes(candidate) ? candidate : fallback
}

/** Reads a raw `searchParams` object into fully-validated filter state. Never
 * throws and never returns an out-of-range value — an unparseable URL degrades
 * to the default (unfiltered, page 1) rather than 500ing or 404ing. */
export function parseBlogSearchParams(raw: RawSearchParams = {}): BlogSearchParams {
  return {
    query: sanitizeQuery(first(raw.query)),
    category: sanitizeSlug(first(raw.category)),
    tags: parseSlugList(raw.tags),
    // `label` is the documented key; `labels` accepted as an alias so both spellings work.
    labels: parseSlugList(raw.label ?? raw.labels),
    sort: parseEnum(raw.sort, SORT_FIELDS, DEFAULT_SORT),
    sortOrder: parseEnum(raw.sortOrder, SORT_ORDERS, DEFAULT_SORT_ORDER),
    page: parsePage(raw.page),
  }
}

/** Canonical href for a filter state. Defaults are omitted and key order is
 * fixed, so equivalent states always produce a byte-identical URL — that's what
 * makes the rel=canonical on the page meaningful. */
export function buildBlogSearchHref(params: Partial<BlogSearchParams> = {}): string {
  const p = { ...DEFAULT_BLOG_SEARCH_PARAMS, ...params }
  const qs = new URLSearchParams()
  if (p.query) qs.set('query', p.query)
  if (p.category) qs.set('category', p.category)
  if (p.tags.length) qs.set('tags', p.tags.join(','))
  if (p.labels.length) qs.set('label', p.labels.join(','))
  if (p.sort !== DEFAULT_SORT) qs.set('sort', p.sort)
  if (p.sortOrder !== DEFAULT_SORT_ORDER) qs.set('sortOrder', p.sortOrder)
  if (p.page > 1) qs.set('page', String(p.page))
  // Commas are legal query sub-delimiters; leaving them raw keeps the
  // tags/label lists readable instead of %2C-soup.
  const search = qs.toString().replace(/%2C/g, ',')
  return search ? `${BLOG_SEARCH_PATH}?${search}` : BLOG_SEARCH_PATH
}

/** True when the URL narrows or reorders the default result set. Drives both
 * the "Clear filters" control and the noindex decision — a filtered or
 * re-sorted permutation is a near-duplicate of a page that's already indexed
 * (/blog, /blog/category/…, /blog/label/…), so it must not compete with it. */
export function hasActiveFilters(p: BlogSearchParams): boolean {
  return Boolean(
    p.query ||
      p.category ||
      p.tags.length ||
      p.labels.length ||
      p.sort !== DEFAULT_SORT ||
      p.sortOrder !== DEFAULT_SORT_ORDER,
  )
}

/** Total pages for `total` results — always ≥ 1 so "Page 1 of 1" reads sanely on an empty result set. */
export function totalPages(total: number): number {
  return Math.max(1, Math.ceil(total / BLOG_SEARCH_PAGE_SIZE))
}
