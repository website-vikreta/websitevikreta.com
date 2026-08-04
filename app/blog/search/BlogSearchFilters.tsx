'use client'

import { useCallback, useEffect, useOptimistic, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ChevronDown } from 'lucide-react'
import {
  buildBlogSearchHref,
  hasActiveFilters,
  DEFAULT_BLOG_SEARCH_PARAMS,
  type BlogSearchParams,
  type SortField,
  type SortOrder,
} from '@/lib/blog-search-params'
import type { Category, Label, Tag } from '@/sanity/types'

type SlugRef = { slug: { current: string } | string }
type FilterOption = { _id: string; title: string } & SlugRef

interface BlogSearchFiltersProps {
  /** Filter state parsed from the URL upstream — this component holds no state of its own beyond the in-flight text input. */
  params: BlogSearchParams
  categories: Category[]
  tags: Tag[]
  labels: Label[]
  /** Server-rendered results (count + grid + pagination), dimmed while the next URL is loading. */
  children: React.ReactNode
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

function toggleInList(list: string[], item: string): string[] {
  return list.includes(item) ? list.filter((value) => value !== item) : [...list, item]
}

/**
 * The interactive half of /blog/search. Every control writes a new URL and the
 * server re-queries — there is deliberately no client-side filtering, so what
 * a click produces and what a crawler (or a pasted link) sees are the same
 * HTML.
 *
 * Two React 19 pieces make that feel instant instead of laggy:
 * `useTransition` keeps the current results on screen (dimmed) while the next
 * page streams in, and `useOptimistic` lets a select/checkbox show its new
 * value immediately instead of snapping back to the old prop until the server
 * responds.
 */
export function BlogSearchFilters({ params, categories, tags, labels, children }: BlogSearchFiltersProps) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [optimistic, setOptimistic] = useOptimistic(params)

  // The raw input value. Typing schedules a debounced navigation (see below);
  // submit (Enter / icon click) fires immediately instead of waiting out the
  // debounce. Re-synced from the URL whenever it changes underneath us
  // (back/forward, "Clear filters", a pasted link), adjusted during render
  // per the React-documented "resetting state when a prop changes" pattern.
  const [text, setText] = useState(params.query)
  const [syncedQuery, setSyncedQuery] = useState(params.query)
  if (syncedQuery !== params.query) {
    setSyncedQuery(params.query)
    setText(params.query)
  }

  const navigate = useCallback(
    (next: Partial<BlogSearchParams>, mode: 'push' | 'replace' = 'push') => {
      // Any change to *what* is matched invalidates the current page number —
      // without this reset, narrowing a filter from page 5 lands on an empty
      // (404ing) page instead of the new page 1.
      const merged: BlogSearchParams = { ...params, page: 1, ...next }
      startTransition(() => {
        setOptimistic(merged)
        const href = buildBlogSearchHref(merged)
        // scroll:false keeps the filter bar under the cursor; paginating (which
        // uses real <a> links in the results below) does jump to the top.
        if (mode === 'replace') router.replace(href, { scroll: false })
        else router.push(href, { scroll: false })
      })
    },
    [params, router, setOptimistic],
  )

  // Type-to-search: debounce keystrokes so a fresh GROQ query fires once
  // typing pauses, not on every character — an un-debounced query-per-keystroke
  // would multiply Sanity reads and dim/rerender the grid mid-word, costing
  // more than it gives back. 400ms is short enough to feel live, long enough
  // that a normal typing cadence never fires mid-word. Guarded on `text !==
  // params.query` so it never fires for the sync-from-URL case (back/forward,
  // "Clear filters", a pasted link) — only genuine local edits schedule a
  // request, and an explicit submit below (Enter / icon click) cancels any
  // timer already in flight so a submitted query is never re-fetched a
  // second time once the debounce catches up.
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const trimmed = text.trim()
    if (trimmed === params.query) return
    debounceRef.current = setTimeout(() => navigate({ query: trimmed }, 'replace'), 400)
    return () => clearTimeout(debounceRef.current)
  }, [text, params.query, navigate])

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    clearTimeout(debounceRef.current)
    navigate({ query: text.trim() })
  }

  const showClear = hasActiveFilters(params)
  const sortValue = `${optimistic.sort}:${optimistic.sortOrder}`

  return (
    <div>
      {/* Unified filter bar — every control shares CONTROL_CLASS, one row on
          desktop, wraps cleanly on mobile. */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Typing schedules a debounced search (see the effect above); Enter
            or the search icon submits immediately, bypassing the debounce. */}
        <form
          role="search"
          onSubmit={handleSearchSubmit}
          className="relative w-full min-w-[220px] sm:w-auto sm:flex-1 sm:max-w-xs"
        >
          <button
            type="submit"
            aria-label="Search"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--color-text-faint) transition-colors duration-200 hover:text-(--color-text) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text)"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </button>
          <input
            type="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search articles…"
            aria-label="Search articles"
            className={`${CONTROL_CLASS} w-full pl-10 pr-4`}
          />
        </form>

        <FilterSelect
          value={optimistic.category}
          onChange={(value) => navigate({ category: value })}
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
          <MultiSelectDropdown
            label="Tags"
            options={tags}
            selected={optimistic.tags}
            onToggle={(slug) => navigate({ tags: toggleInList(params.tags, slug) })}
          />
        )}

        {labels.length > 0 && (
          <MultiSelectDropdown
            label="Labels"
            options={labels}
            selected={optimistic.labels}
            onToggle={(slug) => navigate({ labels: toggleInList(params.labels, slug) })}
          />
        )}

        {/* sort + sortOrder are two URL params but one decision, so they ride
            in a single select as "field:order". */}
        <FilterSelect
          value={sortValue}
          onChange={(value) => {
            const [sort, sortOrder] = value.split(':') as [SortField, SortOrder]
            navigate({ sort, sortOrder })
          }}
          ariaLabel="Sort results"
        >
          <option value="publish-date:desc">Newest first</option>
          <option value="publish-date:asc">Oldest first</option>
          <option value="title:asc">Title A–Z</option>
          <option value="title:desc">Title Z–A</option>
        </FilterSelect>

        {showClear && (
          <button
            type="button"
            onClick={() => navigate(DEFAULT_BLOG_SEARCH_PARAMS)}
            className="group inline-flex h-11 w-fit shrink-0 items-center text-sm font-medium text-(--color-text)"
          >
            <span className="relative">
              Clear filters
              <span className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-(--color-text) transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </span>
          </button>
        )}
      </div>

      {/* Results stay mounted and readable while the next URL loads — no
          layout-shifting spinner swap. */}
      <div
        aria-busy={pending}
        className={`transition-opacity duration-200 ${pending ? 'opacity-40' : 'opacity-100'}`}
      >
        {children}
      </div>
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
 * click-outside/Escape listener, no external dropdown/menu library. Selection
 * itself is not state here: it comes from the URL and each toggle navigates. */
function MultiSelectDropdown({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string
  options: FilterOption[]
  selected: string[]
  onToggle: (slug: string) => void
}) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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
            return (
              <label
                key={option._id}
                className="flex cursor-pointer items-center gap-2.5 rounded-[2px] px-2 py-1.5 text-sm text-(--color-text) transition-colors duration-150 hover:bg-(--color-bg-muted)"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(slug)}
                  onChange={() => onToggle(slug)}
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
