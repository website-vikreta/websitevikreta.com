'use client'

import { useId } from 'react'
import { m } from 'motion/react'

/* A dashed SVG path that draws itself in. Animating pathLength on the dashed path directly would
   overwrite its stroke-dasharray (that's how pathLength works), so the dashes live on the visible
   path and the draw-in runs on a solid mask path instead. Render inside an <svg> under LazyMotion. */
export default function DashedPath({
  d,
  active,
  delay = 0,
  duration = 0.5,
  stroke = '#71717a',
  strokeWidth = 1,
  dash = '3 3',
  markerEnd,
  ease = 'easeInOut',
}: {
  d: string
  active: boolean
  delay?: number
  duration?: number
  stroke?: string
  strokeWidth?: number
  dash?: string
  markerEnd?: string
  ease?: 'easeInOut' | 'linear'
}) {
  const id = useId().replace(/:/g, '')
  return (
    <>
      <mask id={id} maskUnits="userSpaceOnUse" x="-10000" y="-10000" width="20000" height="20000">
        <m.path
          d={d}
          fill="none"
          stroke="white"
          strokeWidth={strokeWidth + 4}
          initial={false}
          animate={{ pathLength: active ? 1 : 0 }}
          transition={{ delay: active ? delay : 0, duration: active ? duration : 0, ease }}
        />
      </mask>
      <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={dash} markerEnd={markerEnd} mask={`url(#${id})`} />
    </>
  )
}
