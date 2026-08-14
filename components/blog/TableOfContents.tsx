'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Heading } from '@/sanity/lib/utils'

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    )
    headings.forEach((h) => {
      const el = document.getElementById(h.slug)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  const activeHeading = headings.find((h) => h.slug === activeId)

  return (
    <>
      {/* Mobile / tablet: collapsible accordion, pinned below the site header.
          Same toggle-button + rotating ChevronDown pattern as Navbar.tsx's
          mobile drawer dropdowns — reuse that, don't invent a second one. */}
      <nav
        aria-label="Table of contents"
        className="lg:hidden sticky top-[var(--navbar-height)] z-40 -mx-[var(--section-x)] mb-8 border-b border-(--color-border) bg-white"
      >
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-3 px-[var(--section-x)] py-3 text-left text-(--color-text-muted) transition-colors duration-150 hover:text-(--color-text)"
        >
          <span className="min-w-0 truncate text-sm text-(--color-text)">
            {activeHeading ? activeHeading.text : 'Table of Contents'}
          </span>
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            aria-hidden={true}
            className={cn('shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
          />
        </button>

        {isOpen && (
          <ul className="max-h-[60vh] overflow-y-auto border-t border-(--color-border) px-[var(--section-x)] py-3">
            {headings.map((h) => (
              <li key={h._key}>
                <a
                  href={`#${h.slug}`}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'block py-2 text-sm transition-colors duration-200',
                    h.level === 3 ? 'pl-4' : 'pl-0',
                    activeId === h.slug ? 'font-medium text-(--color-text)' : 'text-(--color-text-muted)',
                  )}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* Desktop: sticky vertical sidebar. Grid placement is explicit (col 1,
          spanning both content rows) so this lands correctly regardless of
          where this component sits in DOM source order — that order instead
          drives where the mobile accordion above falls in the stacked mobile
          layout. Headings wrap naturally (no nowrap/truncate) — the active
          state fakes extra weight with `text-shadow: 0 0 0.5px currentColor`
          instead of a real font-weight change, so a wrapped multi-line title
          never reflows/rewraps when it becomes active (weight never actually
          changes, only color + shadow do — no invisible-twin span needed). */}
      <nav
        aria-label="Table of contents"
        className="hidden lg:sticky lg:top-24 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:block lg:self-start"
      >
        <p className="mb-4 text-sm font-medium text-(--color-text-muted)">On this page</p>
        <ul className="space-y-3">
          {headings.map((h) => (
            <li key={h._key}>
              <a
                href={`#${h.slug}`}
                className={cn(
                  'block whitespace-normal border-l-2 text-sm leading-snug transition-colors duration-200',
                  h.level === 3 ? 'pl-8' : 'pl-4',
                  activeId === h.slug
                    ? 'border-(--color-text) text-(--color-text) [text-shadow:0_0_0.5px_currentColor]'
                    : 'border-(--color-border) text-(--color-text-muted) hover:text-(--color-text)',
                )}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
