'use client'

import { RevealFade } from '@/components/ui/Reveal'

/** Monochrome tool marks — illustrative, not official brand assets. */
function FigmaMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-7 md:size-8" aria-hidden>
      <rect x="3" y="3" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="3" y="11" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.85" />
      <rect x="11" y="3" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.7" />
      <rect x="11" y="11" width="6" height="6" rx="3" fill="currentColor" opacity="0.55" />
      <rect x="11" y="19" width="6" height="2" rx="1" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

function SketchMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-7 md:size-8" aria-hidden>
      <polygon points="12,2 21,8 21,16 12,22 3,16 3,8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12 L12 8 L16 12 L12 16 Z" fill="currentColor" opacity="0.75" />
    </svg>
  )
}

function FramerMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-7 md:size-8" aria-hidden>
      <path d="M4 4 H14 V14 H4 Z" fill="currentColor" />
      <path d="M14 4 H20 V10 H14 Z" fill="currentColor" opacity="0.65" />
      <path d="M4 14 H14 V20 H4 Z" fill="currentColor" opacity="0.45" />
    </svg>
  )
}

function CanvaMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-7 md:size-8" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 15 C8 10 11 8 12 8 C14 8 16 10 16 12 C16 14 14 16 12 16 C10 16 8 14 8 15 Z"
        fill="currentColor"
        opacity="0.8"
      />
    </svg>
  )
}

function MiroMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-7 md:size-8" aria-hidden>
      <rect x="4" y="5" width="7" height="14" rx="2" fill="currentColor" opacity="0.9" />
      <rect x="13" y="5" width="7" height="14" rx="2" fill="currentColor" opacity="0.55" />
    </svg>
  )
}

function AdobeXdMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-7 md:size-8" aria-hidden>
      <path d="M4 4 H12 L16 20 H12 L11 15 H7 L6 20 H4 Z M7.5 12 H10.5 L9 7.5 Z" fill="currentColor" />
      <path d="M16 8 H20 V20 H16 Z" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

const TOOLS = [
  { id: 'figma', label: 'Figma', Mark: FigmaMark },
  { id: 'sketch', label: 'Sketch', Mark: SketchMark },
  { id: 'framer', label: 'Framer', Mark: FramerMark },
  { id: 'canva', label: 'Canva', Mark: CanvaMark },
  { id: 'miro', label: 'Miro', Mark: MiroMark },
  { id: 'xd', label: 'Adobe XD', Mark: AdobeXdMark },
] as const

export function UiDesignToolsRow() {
  return (
    <RevealFade className="mt-6 border-t border-(--color-border) pt-6 md:mt-8 md:pt-8">
      <p className="mb-4 text-xs font-bold uppercase tracking-wide text-(--color-text-muted) md:text-sm">
        Tools we design in
      </p>
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-4 md:gap-x-10">
        {TOOLS.map(({ id, label, Mark }) => (
          <li key={id} className="flex items-center gap-2 text-(--color-text)">
            <Mark />
            <span className="text-sm font-semibold text-(--color-text-muted)">{label}</span>
          </li>
        ))}
      </ul>
    </RevealFade>
  )
}
