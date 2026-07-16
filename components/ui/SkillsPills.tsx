'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const MAX_LINES = 2
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function SkillsPills({ skills }: { skills: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(skills.length)

  // Reset to full list whenever the skill set or viewport width changes, so the
  // measurement effect below always re-checks from scratch.
  useIsomorphicLayoutEffect(() => {
    setVisibleCount(skills.length)
  }, [skills])

  useIsomorphicLayoutEffect(() => {
    const onResize = () => setVisibleCount(skills.length)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [skills])

  // Runs after every render (no deps) — shrinks visibleCount one pill at a time
  // until the rendered rows (including the "+N" badge) fit within MAX_LINES.
  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = Array.from(container.children) as HTMLElement[]
    if (items.length === 0) return

    const rowTops: number[] = []
    let overflow = false
    for (const item of items) {
      const top = item.offsetTop
      if (!rowTops.includes(top)) rowTops.push(top)
      if (rowTops.length > MAX_LINES) {
        overflow = true
        break
      }
    }

    if (overflow) {
      setVisibleCount((count) => Math.max(0, count - 1))
    }
  })

  const remainder = skills.length - visibleCount

  return (
    <div ref={containerRef} className="flex flex-wrap gap-2">
      {skills.slice(0, visibleCount).map((skill) => (
        <span
          key={skill}
          className="rounded-full border border-(--color-border) px-3 py-1 text-sm text-(--color-text)"
        >
          {skill}
        </span>
      ))}
      {remainder > 0 && (
        <span className="relative inline-flex">
          <span
            aria-hidden
            className="absolute inset-0 translate-x-1 translate-y-1 rounded-full border border-(--color-border) bg-(--color-surface)"
          />
          <span className="relative z-10 rounded-full border border-(--color-border) bg-(--color-surface) px-3 py-1 text-sm text-(--color-text-muted)">
            +{remainder}
          </span>
        </span>
      )}
    </div>
  )
}
