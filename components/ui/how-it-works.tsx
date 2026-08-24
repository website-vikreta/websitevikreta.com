/**
 * A horizontal row of steps, connected by a looping arc underneath each pair
 * — not the zigzag/S-curve this component used to be. Below `lg:` there's no
 * clean way to loop-connect a row that's wrapped onto two lines, so it's a
 * plain grid with no connector there — same as mobile always was.
 *
 * The connector line is a static stroke, not a scroll-triggered "draw-in" —
 * an earlier version animated it via getTotalLength()/strokeDashoffset and
 * it rendered as an incomplete loop ("only half of the first card"). That
 * technique needs the path's rendered geometry to match its measured
 * geometry exactly; simpler to just draw it solid and skip the risk.
 *
 * Adapted from a shadcn-style community snippet — the source used per-card
 * pastel themes, a handwriting font, drop shadows, 25px radii, dark-mode
 * variants, and rotated "pinned note" cards. None of that survives here:
 * this project has no dark theme, one accent color, Epilogue only, no
 * shadows, and a 4px radius cap (see .claude/context/brand.md,
 * .claude/standards/design-system.md).
 */

import { ArrowRight, Pin } from 'lucide-react'

export interface HowItWorksStep {
  title: string
  description: string
  /** Optional — what the customer does at this step, rendered as a distinct line. */
  action?: string
}

export interface HowItWorksProps {
  steps: HowItWorksStep[]
  className?: string
}

// Row gap as a FRACTION of the row's own width, not a fixed px/rem value —
// `columnCenters()` and the grid's own `columnGap` below both read this one
// constant, so the loop connectors can never drift out of alignment with
// the actual column centers the way two independently-hardcoded values
// would (see learning.md 2026-08-22 [Bug] entry on the SolutionSection
// stack's track-height mismatch — same bug class, don't reintroduce it here
// by hardcoding the gap in a Tailwind class instead of reading this const).
const GAP_FRACTION  = 0.035
const LOOP_DEPTH    = 55 // % of the connector strip's own height — also where the arrow sits

function columnCenters(n: number): number[] {
  const colWidth = (1 - (n - 1) * GAP_FRACTION) / n
  return Array.from({ length: n }, (_, i) => (i * (colWidth + GAP_FRACTION) + colWidth / 2) * 100)
}

function loopPath(x1: number, x2: number): string {
  const midX = (x1 + x2) / 2
  return `M ${x1} 0 Q ${midX} ${LOOP_DEPTH} ${x2} 0`
}

function StepCard({ step, index }: { step: HowItWorksStep; index: number }) {
  return (
    <div className="group flex h-full flex-col border border-(--color-border) bg-(--color-surface) p-6 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-(--color-accent)">
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex h-10 w-10 items-center justify-center bg-(--color-accent) font-mono text-lg font-bold leading-none tracking-[-0.05em] text-(--color-text) transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
          {String(index + 1).padStart(2, '0')}
        </span>
        <Pin size={20} strokeWidth={1.75} className="text-(--color-accent) transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-12" aria-hidden="true" />
      </div>
      <h3 className="text-2xl sm:text-3xl font-bold leading-[1.1] text-(--color-text)">
        {step.title}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-(--color-text-muted)">
        {step.description}
      </p>
      {step.action && (
        <p className="mt-auto pt-4 text-sm text-(--color-text)">
          <span className="font-medium">Your part:</span> {step.action}
        </p>
      )}
    </div>
  )
}

export default function HowItWorks({ steps, className }: HowItWorksProps) {
  const centers = columnCenters(steps.length)

  return (
    <div className={className}>
      {/* Below lg: a plain grid — nothing to loop-connect once the row wraps. */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
        {steps.map((step, i) => (
          <StepCard key={step.title} step={step} index={i} />
        ))}
      </div>

      {/* lg+: one horizontal row, looped together underneath. */}
      <div className="relative hidden lg:block">
        <div
          className="grid items-stretch"
          style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)`, columnGap: `${GAP_FRACTION * 100}%` }}
        >
          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </div>

        {/* Connector strip — the loop line (SVG) and the flow arrows (plain
            icons, not SVG markers) share this box so both read the same
            percentage coordinates. A marker's rotation is computed in the
            path's own coordinate system, which `preserveAspectRatio="none"`
            distorts heavily on a row this much wider than it is tall — a
            plain icon sidesteps that distortion entirely. */}
        <div className="absolute inset-x-0 top-full h-14">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {centers.slice(0, -1).map((x1, i) => (
              <path
                key={i}
                d={loopPath(x1, centers[i + 1])}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={2.5}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          {centers.slice(0, -1).map((x1, i) => {
            const midX = (x1 + centers[i + 1]) / 2
            return (
              <span
                key={i}
                className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-(--color-accent)"
                style={{ left: `${midX}%`, top: `${LOOP_DEPTH}%` }}
                aria-hidden="true"
              >
                <ArrowRight size={14} strokeWidth={2} className="text-(--color-text)" />
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
