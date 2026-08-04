'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const EDGE_EPSILON = 1

/** Snap-scrolling row with prev/next arrows overlaid on its left/right
 * edges (same square `CarouselButton` look as the hero slider). Arrow
 * state tracks real scroll position, not just clicks, so a manual swipe/
 * trackpad scroll updates disabled state too:
 *   - the whole control pair is hidden when the row doesn't overflow its
 *     container (nothing to scroll — e.g. 2 cards on a wide desktop)
 *   - left disables at scrollLeft ≈ 0, right disables at the end of
 *     scrollWidth, so neither arrow ever no-ops past the last card */
export function ScrollableRow({
  children,
  ariaLabel,
  gapClassName = 'gap-6',
}: {
  children: React.ReactNode
  ariaLabel: string
  gapClassName?: string
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hasOverflow, setHasOverflow] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const updateState = () => {
      setHasOverflow(el.scrollWidth > el.clientWidth + EDGE_EPSILON)
      setCanScrollLeft(el.scrollLeft > EDGE_EPSILON)
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - EDGE_EPSILON)
    }

    updateState()
    el.addEventListener('scroll', updateState, { passive: true })
    const observer = new ResizeObserver(updateState)
    observer.observe(el)
    return () => {
      el.removeEventListener('scroll', updateState)
      observer.disconnect()
    }
  }, [])

  const scroll = (direction: 1 | -1) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: 'smooth' })
  }

  return (
    <div
      className="relative"
      role="group"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div
        ref={scrollRef}
        className={`flex snap-x snap-mandatory flex-row ${gapClassName} overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        {children}
      </div>

      {hasOverflow && (
        <>
          <CarouselButton
            label={`Scroll ${ariaLabel} left`}
            onClick={() => scroll(-1)}
            disabled={!canScrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </CarouselButton>
          <CarouselButton
            label={`Scroll ${ariaLabel} right`}
            onClick={() => scroll(1)}
            disabled={!canScrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </CarouselButton>
        </>
      )}
    </div>
  )
}

function CarouselButton({
  label,
  onClick,
  disabled,
  className = '',
  children,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`z-10 flex h-9 w-9 items-center justify-center border border-(--color-border) bg-(--color-surface) text-(--color-text) shadow-sm transition-colors hover:enabled:bg-(--color-text) hover:enabled:text-(--color-surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text) disabled:opacity-30 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  )
}
