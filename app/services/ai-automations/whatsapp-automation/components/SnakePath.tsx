'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'

export type SnakeStep = {
  step: string
  title: string
  detail: string
  icon: LucideIcon
  accent?: boolean
}

type Rows = readonly [number, number, number]

const COL_START = [
  'lg:col-start-1',
  'lg:col-start-2',
  'lg:col-start-3',
  'lg:col-start-4',
  'lg:col-start-5',
] as const
const ROW_START = [
  'lg:row-start-1',
  'lg:row-start-2',
  'lg:row-start-3',
] as const
const COLS_CLASS: Record<number, string> = {
  3: 'lg:grid-cols-3',
  5: 'lg:grid-cols-5',
}

function placements(rows: Rows, maxCols: number) {
  const [a, b] = rows
  const out: { row: number; col: number; copy: 'above' | 'below' }[] = []
  for (let i = 0; i < a; i++) {
    out.push({ row: 1, col: i + 1, copy: 'above' })
  }
  for (let k = 0; k < b; k++) {
    out.push({ row: 2, col: maxCols - k, copy: 'above' })
  }
  for (let k = 0; k < rows[2]; k++) {
    out.push({ row: 3, col: k + 1, copy: 'below' })
  }
  return out
}

type Pt = { x: number; y: number }

function pathFromPoints(pts: Pt[]) {
  if (pts.length === 0) return ''
  return pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ')
}

export default function SnakePath({
  steps,
  rows,
  minWidthClass,
  ariaLabel,
}: {
  steps: SnakeStep[]
  rows: Rows
  minWidthClass: string
  ariaLabel: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [line, setLine] = useState({ d: '', w: 0, h: 0 })
  const maxCols = Math.max(...rows)
  const place = placements(rows, maxCols)
  const colsClass = COLS_CLASS[maxCols] ?? 'lg:grid-cols-3'

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const measure = () => {
      if (!window.matchMedia('(min-width: 1024px)').matches) {
        setLine({ d: '', w: 0, h: 0 })
        return
      }
      const box = root.getBoundingClientRect()
      const badges = root.querySelectorAll<HTMLElement>('[data-snake-badge]')
      const pts: Pt[] = []
      badges.forEach((el) => {
        const r = el.getBoundingClientRect()
        pts.push({
          x: r.left + r.width / 2 - box.left,
          y: r.top + r.height / 2 - box.top,
        })
      })
      setLine({ d: pathFromPoints(pts), w: box.width, h: box.height })
    }

    measure()
    const t = window.setTimeout(measure, 900)
    const ro = new ResizeObserver(measure)
    ro.observe(root)
    window.addEventListener('resize', measure)
    return () => {
      window.clearTimeout(t)
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [steps, rows])

  const arrows = (() => {
    if (!line.d) return []
    const nums = [...line.d.matchAll(/[ML]\s([\d.]+)\s([\d.]+)/g)].map((m) => ({
      x: Number(m[1]),
      y: Number(m[2]),
    }))
    const marks: { x: number; y: number; deg: number }[] = []
    for (let i = 0; i < nums.length - 1; i++) {
      const a = nums[i]
      const b = nums[i + 1]
      const dx = b.x - a.x
      const dy = b.y - a.y
      if (Math.abs(dy) > Math.abs(dx)) continue
      marks.push({
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
        deg: dx < 0 ? 180 : 0,
      })
    }
    return marks
  })()

  return (
    <div className="overflow-x-auto pb-2">
      <div
        ref={rootRef}
        className={`relative ${minWidthClass} lg:min-h-[40rem]`}
      >
        {line.d ? (
          <svg
            className="pointer-events-none absolute inset-0 hidden text-(--color-accent) lg:block"
            viewBox={`0 0 ${line.w} ${line.h}`}
            width={line.w}
            height={line.h}
            fill="none"
            aria-hidden="true"
          >
            <path
              className="snake-wave"
              d={line.d}
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}

        {arrows.map((arrow, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute z-[5] hidden text-(--color-text) lg:block"
            style={{
              left: arrow.x,
              top: arrow.y,
              transform: `translate(-50%, -50%) rotate(${arrow.deg}deg)`,
            }}
          >
            <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
              <path d="M10 6 0 0v12z" />
            </svg>
          </span>
        ))}

        <ol
          className={`relative z-10 grid grid-cols-1 gap-8 border-l-2 border-(--color-accent) pl-6 ${colsClass} lg:grid-rows-3 lg:gap-x-0 lg:gap-y-16 lg:border-l-0 lg:pl-0`}
          aria-label={ariaLabel}
        >
          {steps.map((item, index) => {
            const { row, col, copy } = place[index]
            const Icon = item.icon
            const copyBlock = (
              <div className="flex max-w-[11rem] flex-col items-center gap-1.5 px-1 text-center">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-accent) text-(--color-accent)"
                >
                  <Icon size={20} strokeWidth={1.5} />
                </span>
                <h3 className="font-sans text-sm font-bold leading-tight text-(--color-text)">
                  <span className="sr-only">{`Step ${item.step}: `}</span>
                  {item.title}
                </h3>
                <p className="text-xs leading-snug text-(--color-text-muted)">
                  {item.detail}
                </p>
              </div>
            )
            const badge = (
              <span
                data-snake-badge
                aria-hidden="true"
                className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold leading-none tracking-[-0.05em] ${
                  copy === 'above' ? 'lg:order-2' : 'lg:order-1'
                } ${
                  item.accent
                    ? 'bg-(--color-text) text-(--color-accent)'
                    : 'bg-(--color-accent) text-(--color-text)'
                }`}
              >
                {item.step}
              </span>
            )

            return (
              <li
                key={item.step}
                className={`snake-node relative flex gap-4 max-lg:!col-auto max-lg:!row-auto lg:min-h-[11rem] lg:flex-col lg:items-center lg:gap-3 ${
                  copy === 'above' ? 'lg:justify-end' : 'lg:justify-start'
                } ${COL_START[col - 1]} ${ROW_START[row - 1]}`}
              >
                {badge}
                <div
                  className={`min-w-0 ${copy === 'above' ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  {copyBlock}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
