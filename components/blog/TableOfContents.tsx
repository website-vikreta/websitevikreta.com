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

    // Scroll spy: which heading currently sits at the top-of-viewport
    // "reading line". The band is intentionally narrow (crisp single-
    // heading signal, not "anything visible on screen") — which is why the
    // no-intersection branch below needs explicit direction handling: a
    // heading can leave the band by scrolling either past it (down) or
    // away from it (up), and only one of those should advance activeId.
    const spy = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting)
        if (intersecting.length > 0) {
          // Normally exactly one entry. A fast scroll can occasionally
          // land two headings in the band within the same callback batch
          // (or a very short section keeps both on screen at once) — pick
          // the one nearest the line, not just whichever this batch
          // happened to list first (entries order isn't guaranteed to
          // match document order).
          const nearest = intersecting.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
          )
          setActiveId(nearest.target.id)
          return
        }
        // Nothing in the band. A heading can leave it through either
        // boundary, and only one direction should move activeId backward:
        // - Exits through the TOP boundary (boundingClientRect.top is a
        //   small value near `rootBounds.top`, i.e. roughly "0 minus its
        //   own height") means normal forward reading — we scrolled PAST
        //   it going down. No action needed; the next heading's own
        //   intersecting entry takes over, or the bottom-of-page sentinel
        //   does if this was the last heading.
        // - Exits through the BOTTOM boundary (top >= rootBounds.bottom)
        //   means it left by moving DOWN the screen, i.e. we scrolled UP
        //   away from it — step back to the previous heading, or clear
        //   entirely if it was the first one (scrolled above all content).
        // Comparing against `rootBounds` (the observer's own computed
        // band, not a guessed sign check on `top`) is what actually
        // distinguishes these — a naive `top > 0` matches BOTH cases
        // (a top-boundary exit's `top` sits at roughly `-height`, which
        // for normal single-line headings is a small POSITIVE number, not
        // negative), which was the previous bug: every forward scroll
        // transition wrongly fired the "step back to previous" branch,
        // visibly flashing the previous heading bold before the next one
        // took over.
        const exited = entries.find(
          (e) => e.rootBounds != null && e.boundingClientRect.top >= e.rootBounds.bottom,
        )
        if (exited) {
          const idx = headings.findIndex((h) => h.slug === exited.target.id)
          setActiveId(idx > 0 ? headings[idx - 1].slug : '')
        }
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 },
    )
    headings.forEach((h) => {
      const el = document.getElementById(h.slug)
      if (el) spy.observe(el)
    })

    // Bottom-of-page fallback: if a post's last heading doesn't have enough
    // trailing content to ever get pushed up into the band above (its
    // `isIntersecting` never turns true), the spy alone can never mark it
    // active even while it's the section actually being read at the very
    // bottom of the page. A 1px sentinel appended after everything else in
    // the document reports back exactly once scrolling has gone as far as
    // the page allows, regardless of how much (or little) content trails
    // the last heading — force it active then. Still zero per-scroll-frame
    // work, same IntersectionObserver primitive, no scroll listener.
    const sentinel = document.createElement('div')
    sentinel.style.cssText = 'height:1px;pointer-events:none'
    sentinel.setAttribute('aria-hidden', 'true')
    document.body.appendChild(sentinel)
    const bottomWatch = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveId(headings[headings.length - 1].slug)
      },
      { threshold: 0 },
    )
    bottomWatch.observe(sentinel)

    return () => {
      spy.disconnect()
      bottomWatch.disconnect()
      sentinel.remove()
    }
  }, [headings])

  if (headings.length === 0) return null

  const activeHeading = headings.find((h) => h.slug === activeId)

  return (
    <>
      {/* Mobile / tablet: collapsible accordion, pinned below the site header.
          Same toggle-button + rotating ChevronDown pattern as Navbar.tsx's
          mobile drawer dropdowns — reuse that, don't invent a second one. The
          open list is `absolute` (nav's own `sticky` positioning already
          gives it a containing block, no extra `relative` needed) so it
          floats over the article instead of pushing the post content down
          every time it opens/closes. */}
      <nav
        aria-label="Table of contents"
        className="lg:hidden sticky top-[var(--navbar-height)] z-40 -mx-[var(--section-x)] mb-8 border-b border-(--color-border) bg-white"
      >
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="mobile-toc-list"
          className="flex w-full items-center justify-between gap-3 px-[var(--section-x)] py-3 text-left text-(--color-text-muted) transition-colors duration-150 hover:text-(--color-text)"
        >
          <span className="min-w-0 flex flex-col">
            <span className="text-xs text-(--color-text-faint)">Table of Contents</span>
            <span className="truncate text-sm font-medium text-(--color-text)">
              {activeHeading ? activeHeading.text : 'On this page'}
            </span>
          </span>
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            aria-hidden={true}
            className={cn('shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
          />
        </button>

        {isOpen && (
          <ul
            id="mobile-toc-list"
            className={cn(
              'absolute top-full left-0 max-h-[60vh] w-full overflow-y-auto border-t border-(--color-border) bg-white px-[var(--section-x)] py-3 shadow-lg',
              '[scrollbar-width:thin] [scrollbar-color:var(--color-border)_transparent]',
              '[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-(--color-border)',
            )}
          >
            {headings.map((h) => (
              <li key={h._key}>
                <a
                  href={`#${h.slug}`}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-start gap-1.5 py-2 transition-colors duration-200',
                    h.level === 3 ? 'pl-4 text-xs' : 'pl-0 text-sm',
                    activeId === h.slug
                      ? 'font-medium text-(--color-text)'
                      : h.level === 3
                        ? 'text-(--color-text-faint)'
                        : 'text-(--color-text-muted)',
                  )}
                >
                  {h.level === 3 && (
                    <span aria-hidden="true" className="text-(--color-text-faint)">
                      •
                    </span>
                  )}
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
        className={cn(
          'hidden lg:sticky lg:top-32 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:block lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto lg:pr-2',
          '[scrollbar-width:thin] [scrollbar-color:var(--color-border)_transparent]',
          '[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-(--color-border)',
        )}
      >
        <div className="mb-4">
          <p className="text-xs text-(--color-text-faint)">Table of Contents</p>
          <p className="mt-1 text-lg font-bold tracking-tight text-(--color-text)">On this page</p>
        </div>
        <ul className="space-y-3">
          {headings.map((h) => (
            <li key={h._key}>
              <a
                href={`#${h.slug}`}
                className={cn(
                  'flex items-start gap-1.5 whitespace-normal border-l-2 leading-snug transition-colors duration-200',
                  h.level === 3 ? 'pl-8 text-xs' : 'pl-4 text-sm',
                  activeId === h.slug
                    ? 'border-(--color-text) text-(--color-text) [text-shadow:0_0_0.5px_currentColor]'
                    : h.level === 3
                      ? 'border-(--color-border) text-(--color-text-faint) hover:text-(--color-text)'
                      : 'border-(--color-border) text-(--color-text-muted) hover:text-(--color-text)',
                )}
              >
                {h.level === 3 && (
                  <span aria-hidden="true" className="text-(--color-text-faint)">
                    •
                  </span>
                )}
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
