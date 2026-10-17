import type { ReactNode } from 'react'

/**
 * Sticky-note callout used in the Pain, Paid, and AI collages. Animate via `.sticky-note`.
 * `soft` = the same brand yellow, rounded with a light shadow, for the smooth illustration style.
 */
export function StickyNote({ children, className = '', soft = false }: { children: ReactNode; className?: string; soft?: boolean }) {
  return (
    <p
      className={`sticky-note relative z-20 w-fit px-4 py-3 text-sm font-bold leading-snug text-(--color-text) md:text-base ${
        soft ? 'rounded-md bg-(--color-accent) shadow-[0_6px_18px_-8px_rgba(18,18,18,0.25)]' : 'bg-(--color-accent)'
      } ${className}`}
    >
      {children}
    </p>
  )
}

/** Dashed hand-drawn style arrow, fixed size; position/rotate via className. Animate via `.sticky-arrow`. */
export function CurvedArrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 56" fill="none" aria-hidden="true" className={`sticky-arrow pointer-events-none absolute z-10 hidden h-14 w-12 text-(--color-text) lg:block ${className}`}>
      <path className="dash-march" d="M8 4 C 30 10, 38 28, 22 48" stroke="currentColor" strokeWidth="1.75" strokeDasharray="4 4" strokeLinecap="round" />
      <path d="M14 44 L22 50 L26 40" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
