'use client'

import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'motion/react'

const CLIENTS = [
  'Harvestt', 'Studio One', 'UrbanEdge', 'NovaMed',
  'Brightline', 'Kinetica', 'Forsa', 'Pinnacle',
]

const FAST = 90   // px / s  — base speed
const SLOW = 28   // px / s  — hover speed

export function ClientLogosSection() {
  const x = useMotionValue(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const isHovered = useRef(false)
  const vel = useRef(FAST)

  useAnimationFrame((_, delta) => {
    const target = isHovered.current ? SLOW : FAST
    vel.current += (target - vel.current) * 0.06          // lerp for smooth speed change
    const halfW = trackRef.current ? trackRef.current.offsetWidth / 2 : 0
    if (!halfW) return
    const next = x.get() - (vel.current * delta) / 1000
    x.set(next <= -halfW ? next + halfW : next)           // reset at exactly half = one full copy
  })

  return (
    <section className="py-16 md:py-20 overflow-hidden">

      <div className="container mb-10 md:mb-12">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-faint)] mb-2">
          Our Clients
        </p>
        <h2 className="font-sans font-bold text-3xl md:text-4xl leading-tight text-[var(--color-text)]">
          Businesses we&apos;ve built for
        </h2>
      </div>

      <div
        className="relative"
        onMouseEnter={() => { isHovered.current = true }}
        onMouseLeave={() => { isHovered.current = false }}
      >
        <motion.div
          ref={trackRef}
          className="flex items-center gap-10 w-max"
          style={{ x }}
        >
          {[...CLIENTS, ...CLIENTS].map((name, i) => (
            <LogoSlot key={i} name={name} />
          ))}
        </motion.div>

        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10" />
      </div>

    </section>
  )
}

function LogoSlot({ name }: { name: string }) {
  return (
    <div className="flex-shrink-0 h-11 px-7 flex items-center justify-center rounded border border-[var(--color-border)] bg-[var(--color-surface)]">
      <span className="text-sm font-semibold text-[var(--color-text-muted)] whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}
