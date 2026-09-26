'use client'

import { useRef } from 'react'
import { TrendingDown, Clock, Zap, AlertTriangle, Frown, Lock } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useGsapSection, revealLines, revealFadeUp } from '@/lib/gsap/reveals'
import { REVEAL_EASE } from '@/components/ui/Reveal'

interface Impact {
  icon:  typeof TrendingDown
  title: string
  line:  string
}

const IMPACTS: Impact[] = [
  { icon: TrendingDown,  title: 'Margin',         line: 'Every manual step quietly eats into what you actually keep on each order.' },
  { icon: Clock,         title: 'Team time',      line: 'Your best people spend their day on work a workflow could do in minutes.' },
  { icon: Zap,           title: 'Response speed', line: 'A slow reply is the door a competitor walks through.' },
  { icon: AlertTriangle, title: 'Mistakes',       line: 'Manual steps done fifty times a day start slipping, and slipping gets expensive.' },
  { icon: Frown,         title: 'Burnout',        line: 'People don’t stay in a job that’s mostly repetitive busywork.' },
  { icon: Lock,          title: 'Growth',         line: 'Scaling means hiring more people to do the same manual thing, not actually growing.' },
]

// Hub-and-spoke canvas — one manual step in the center, every real impact
// arranged around it in a rectangle (3 across the top, 3 across the bottom),
// not a circle and not stacked down one side. No board behind it: sits
// straight on the page background, same dotted-canvas feel as n8n.
const NODE = { w: 260, h: 90 }
const GAP_X = 40
const GAP_Y = 40
const COL_X = [0, NODE.w + GAP_X, 2 * (NODE.w + GAP_X)]
const ROW_Y = [0, NODE.h + GAP_Y, 2 * (NODE.h + GAP_Y)]
const PAD = 20
const VB = { w: COL_X[2] + NODE.w + PAD * 2, h: ROW_Y[2] + NODE.h + PAD * 2 }
const CENTER = { x: VB.w / 2, y: VB.h / 2 }
const HUB = { w: 240, h: 76 }

// Grid slot per impact: top row (cols 0,1,2), then bottom row (cols 0,1,2) —
// the two middle-row side slots stay empty so the hub reads as the center.
const SLOTS: [number, number][] = [
  [0, 0], [1, 0], [2, 0],
  [0, 2], [1, 2], [2, 2],
]

function slotRect(i: number) {
  const [col, row] = SLOTS[i]
  return { x: PAD + COL_X[col], y: PAD + ROW_Y[row], w: NODE.w, h: NODE.h }
}

function slotCenter(i: number) {
  const r = slotRect(i)
  return { x: r.x + r.w / 2, y: r.y + r.h / 2 }
}

// Port sits on the hub's boundary along the line toward that slot — hub is
// small relative to the grid gap, so a circular approximation reads fine.
function hubPort(i: number) {
  const c = slotCenter(i)
  const dx = c.x - CENTER.x
  const dy = c.y - CENTER.y
  const dist = Math.sqrt(dx * dx + dy * dy) || 1
  const r = Math.min(HUB.w, HUB.h) / 2
  return { x: CENTER.x + (dx / dist) * r, y: CENTER.y + (dy / dist) * r }
}

export default function ImpactSection() {
  const scope = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGsapSection(scope, () => {
    revealLines('#impact-heading', { trigger: scope.current })
    revealFadeUp('.impact-intro', { y: 20, delay: 0.1, trigger: scope.current })
    revealFadeUp('.impact-canvas', { y: 24, trigger: scope.current })
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="impact-heading">
      <div className="container">
        {/* Same structure as PainSection: heading in its own full-width block
            above, then a narrower text column beside the wider visual —
            not the heading grouped inside the text column. */}
        <div className="max-w-2xl">
          <h2 id="impact-heading" className="text-h3 font-bold tracking-tight text-(--color-text)">
            What this is costing you, right now
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-5">
            <p className="impact-intro max-w-sm text-body-lg leading-relaxed text-(--color-text-muted)">
              One manual step, done by hand every time it should have been automatic. It
              doesn&rsquo;t stay contained — here&rsquo;s everywhere it actually shows up.
            </p>
          </div>

          <div className="impact-canvas lg:col-span-7">
            <svg
              viewBox={`0 0 ${VB.w} ${VB.h}`}
              className="h-auto w-full"
              role="img"
              aria-label={`One manual step fans out into: ${IMPACTS.map((i) => i.title).join(', ')}`}
            >
            {IMPACTS.map((impact, i) => {
              const c = slotCenter(i)
              return (
                <motion.line
                  key={impact.title}
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={c.x}
                  y2={c.y}
                  stroke="var(--color-accent)"
                  strokeWidth={1.5}
                  initial={{ pathLength: reduced ? 1 : 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: reduced ? 0 : 0.6,
                    ease: REVEAL_EASE,
                    delay: reduced ? 0 : 0.1 + i * 0.06,
                  }}
                />
              )
            })}

            {IMPACTS.map((impact, i) => {
              const p = hubPort(i)
              return (
                <circle
                  key={`hub-port-${impact.title}`}
                  cx={p.x}
                  cy={p.y}
                  r={4}
                  fill="var(--color-bg)"
                  stroke="var(--color-accent)"
                  strokeWidth={1.5}
                />
              )
            })}

            {/* The hub — centered, everything else sits around it */}
            <foreignObject
              x={CENTER.x - HUB.w / 2}
              y={CENTER.y - HUB.h / 2}
              width={HUB.w}
              height={HUB.h}
            >
              <div className="flex h-full w-full items-center justify-center border border-(--color-text) bg-(--color-surface) px-3 py-2 text-center">
                <span className="text-sm font-semibold text-(--color-text)">
                  Someone does it by hand, every time
                </span>
              </div>
            </foreignObject>

            {IMPACTS.map(({ icon: Icon, title, line }, i) => {
              const rect = slotRect(i)
              return (
                <foreignObject key={title} x={rect.x} y={rect.y} width={rect.w} height={rect.h}>
                  <div className="flex h-full w-full items-center gap-3 border border-(--color-accent) bg-(--color-accent)/10 px-4 py-2">
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" className="shrink-0 text-(--color-accent)" />
                    <div className="min-w-0">
                      <p className="text-sm font-bold leading-tight text-(--color-text)">{title}</p>
                      <p className="mt-0.5 text-xs leading-snug text-(--color-text-muted)">{line}</p>
                    </div>
                  </div>
                </foreignObject>
              )
            })}
          </svg>
        </div>
        </div>
      </div>
    </section>
  )
}
