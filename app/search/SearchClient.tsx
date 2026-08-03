'use client'

import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { BlogCard } from '@/components/blog/BlogCard'
import { Button } from '@/components/ui/Button'
import { loadMorePosts } from './actions'
import type { Category, DisplayPost, Label, Tag } from '@/sanity/types'

type SlugRef = { slug: { current: string } | string }
type SortOrder = 'desc' | 'asc'
type FilterOption = { _id: string; title: string } & SlugRef

interface SearchClientProps {
  initialPosts: DisplayPost[]
  initialHasMore: boolean
  categories: Category[]
  tags: Tag[]
  labels: Label[]
}

// Shared look for every control in the filter bar — search input, category
// select, tag/label dropdown buttons, sort select. Each control appends its
// own padding/layout utilities on top (inputs need pl-10 for the icon,
// selects need pr-9 for the chevron, etc.) but height/border/radius/type
// stay identical everywhere so the row reads as one tool, not five.
const CONTROL_CLASS =
  'h-11 rounded-[2px] border border-(--color-border) bg-(--color-surface) text-sm text-(--color-text) transition-colors duration-200 hover:border-(--color-text) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text)'

function refSlug(ref: SlugRef): string {
  const raw = ref.slug as { current: string } | string
  return typeof raw === 'string' ? raw : raw.current
}

// selectedTags/selectedLabels are stored as a single comma-separated string
// (per spec) rather than string[] — these two helpers are the only place
// that ever splits/joins it, so the rest of the component just deals with
// plain string state.
function parseList(value: string): string[] {
  return value ? value.split(',').filter(Boolean) : []
}

function toggleInList(value: string, item: string): string {
  const list = parseList(value)
  const next = list.includes(item) ? list.filter((v) => v !== item) : [...list, item]
  return next.join(',')
}

export function SearchClient({ initialPosts, initialHasMore, categories, tags, labels }: SearchClientProps) {
  // ── Filter criteria ──────────────────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState('')
  const [selectedLabels, setSelectedLabels] = useState('')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  // ── Loaded data + lazy loading ───────────────────────────────────────────
  const [posts, setPosts] = useState<DisplayPost[]>(initialPosts)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [loading, setLoading] = useState(false)

  // Filtering runs on every keystroke; deferring the search term keeps
  // typing responsive even once `posts` has grown large from repeated
  // "Load more" fetches.
  const deferredSearchTerm = useDeferredValue(searchTerm)

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedCategory !== null ||
    selectedTags !== '' ||
    selectedLabels !== '' ||
    sortOrder !== 'desc'

  // Filters combine with AND (post must match the search term AND the
  // category AND at least one selected tag AND at least one selected
  // label); within the tags/labels multi-selects, matching ANY selected
  // value is enough (OR) — the standard faceted-filter convention.
  const filteredPosts = useMemo(() => {
    const term = deferredSearchTerm.trim().toLowerCase()
    const activeTags = parseList(selectedTags)
    const activeLabels = parseList(selectedLabels)

    const filtered = posts.filter((post) => {
      // Search matches title/excerpt, author name, category, or any tag/
      // label name — a hit on any one field is enough.
      const searchableFields = [
        post.title,
        post.description,
        post.author?.name,
        post.category,
        post.categorySlug,
        ...(post.tags ?? []).map((tag) => tag.title),
        ...(post.labels ?? []).map((label) => label.title),
      ]
      const matchesSearch = !term || searchableFields.some((field) => field?.toLowerCase().includes(term))
      const matchesCategory = !selectedCategory || post.categorySlug === selectedCategory
      const matchesTags =
        activeTags.length === 0 || (post.tags ?? []).some((tag) => activeTags.includes(refSlug(tag)))
      const matchesLabels =
        activeLabels.length === 0 || (post.labels ?? []).some((label) => activeLabels.includes(refSlug(label)))
      return matchesSearch && matchesCategory && matchesTags && matchesLabels
    })

    return [...filtered].sort((a, b) => {
      const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
      const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
      return sortOrder === 'desc' ? bTime - aTime : aTime - bTime
    })
  }, [posts, deferredSearchTerm, selectedCategory, selectedTags, selectedLabels, sortOrder])

  function clearFilters() {
    setSearchTerm('')
    setSelectedCategory(null)
    setSelectedTags('')
    setSelectedLabels('')
    setSortOrder('desc')
  }

  async function handleLoadMore() {
    setLoading(true)
    try {
      const result = await loadMorePosts(posts.length)
      setPosts((prev) => [...prev, ...result.posts])
      setHasMore(result.hasMore)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Unified filter bar — every control shares CONTROL_CLASS, one row on
          desktop, wraps cleanly on mobile. */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full min-w-[220px] sm:w-auto sm:flex-1 sm:max-w-xs">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-text-faint)"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles…"
            aria-label="Search articles"
            className={`${CONTROL_CLASS} w-full pl-10 pr-4`}
          />
        </div>

        <FilterSelect
          value={selectedCategory ?? ''}
          onChange={(value) => setSelectedCategory(value || null)}
          ariaLabel="Filter by category"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.slug.current}>
              {category.title}
            </option>
          ))}
        </FilterSelect>

        {tags.length > 0 && (
          <MultiSelectDropdown label="Tags" options={tags} value={selectedTags} onChange={setSelectedTags} />
        )}

        {labels.length > 0 && (
          <MultiSelectDropdown label="Labels" options={labels} value={selectedLabels} onChange={setSelectedLabels} />
        )}

        <FilterSelect
          value={sortOrder}
          onChange={(value) => setSortOrder(value as SortOrder)}
          ariaLabel="Sort by release date"
        >
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </FilterSelect>
      </div>

      {/* Result count + clear filters — directly above the grid. */}
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-(--color-border) pt-4">
        <span className="text-sm text-(--color-text-muted)">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="group inline-flex w-fit shrink-0 items-center text-sm font-medium text-(--color-text)"
          >
            <span className="relative">
              Clear filters
              <span className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-(--color-text) transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </span>
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredPosts.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 md:mt-14 md:gap-x-10 md:gap-y-20 lg:grid-cols-3">
          {filteredPosts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center gap-2 border border-dashed border-(--color-border) py-24 text-center md:mt-14">
          <p className="text-lg font-medium text-(--color-text)">No results found</p>
          <p className="text-sm text-(--color-text-muted)">Try a different search term, or clear a filter.</p>
        </div>
      )}

      {/* Lazy loading — fetches the next unfiltered batch; client-side
          filters above re-apply automatically once it lands. */}
      {hasMore && (
        <div className="mt-14 flex justify-center md:mt-20">
          <Button type="button" onClick={handleLoadMore} variant="ghost" size="md" disabled={loading}>
            {loading ? 'Loading…' : 'Load more'}
          </Button>
        </div>
      )}
    </div>
  )
}

function FilterSelect({
  value,
  onChange,
  ariaLabel,
  children,
}: {
  value: string
  onChange: (value: string) => void
  ariaLabel: string
  children: React.ReactNode
}) {
  return (
    <div className="relative shrink-0">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className={`${CONTROL_CLASS} appearance-none pl-4 pr-9`}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-text-faint)"
        aria-hidden="true"
      />
    </div>
  )
}

/** Custom checkbox multi-select — a trigger button ("Tags (2)") that toggles
 * an absolutely positioned panel of checkboxes. Plain React state + a
 * click-outside/Escape listener, no external dropdown/menu library. `value`
 * is the same comma-separated string SearchClient stores; this component
 * never introduces its own array state. */
function MultiSelectDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const selected = parseList(value)

  useEffect(() => {
    if (!open) return
    function handlePointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const buttonLabel = selected.length === 0 ? label : `${label} (${selected.length})`

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`${CONTROL_CLASS} inline-flex items-center gap-2 px-4 ${
          selected.length > 0 ? 'border-(--color-text) font-medium' : ''
        }`}
      >
        <span>{buttonLabel}</span>
        <ChevronDown
          className={`h-4 w-4 text-(--color-text-faint) transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={label}
          aria-multiselectable="true"
          className="absolute left-0 top-[calc(100%+8px)] z-10 max-h-72 w-60 overflow-y-auto rounded-[2px] border border-(--color-border) bg-(--color-surface) p-2 shadow-lg"
        >
          {options.map((option) => {
            const slug = refSlug(option)
            const checked = selected.includes(slug)
            return (
              <label
                key={option._id}
                className="flex cursor-pointer items-center gap-2.5 rounded-[2px] px-2 py-1.5 text-sm text-(--color-text) transition-colors duration-150 hover:bg-(--color-bg-muted)"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange(toggleInList(value, slug))}
                  className="h-4 w-4 shrink-0 accent-(--color-text)"
                />
                {option.title}
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}
