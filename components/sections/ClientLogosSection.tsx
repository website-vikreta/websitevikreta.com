'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useAnimationFrame, useMotionValue } from 'motion/react'
import { RevealText } from '@/components/ui/Reveal'

// Real client logos only — see learning.md [Anti-pattern] fabricated social proof.
const CLIENTS = [
  { src: '/client-logos/sustainable-bitcoin-protocol.svg', alt: 'Sustainable Bitcoin Protocol' },
  { src: '/client-logos/simpli-home.svg', alt: 'Simpli Home' },
  { src: '/client-logos/blancora.svg', alt: 'Blancora' },
  { src: '/client-logos/boompanda.png', alt: 'Boompanda' },
  { src: '/client-logos/ap-cleanco.svg', alt: 'AP Cleanco' },
  { src: '/client-logos/tocal.svg', alt: 'Tocal' },
  { src: '/client-logos/strandzboost.svg', alt: 'Strandzboost' },
  { src: '/client-logos/raicoon.svg', alt: 'Raicoon' },
  { src: '/client-logos/sr-design-hub.svg', alt: 'SR Design Hub' },
  { src: '/client-logos/ambrosia.svg', alt: 'Ambrosia Life Sciences' },
  { src: '/client-logos/budget-renovations.svg', alt: 'Budget Renovations' },
  { src: '/client-logos/champion-lenders.svg', alt: 'Champion Lenders' },
  { src: '/client-logos/cozmo-realty.svg', alt: 'Cozmo Realty' },
  { src: '/client-logos/archmodal.svg', alt: 'Archmodal' },
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

      <div className="container mb-10 md:mb-14">
        <RevealText as="h2" className="text-h2 font-bold text-[var(--color-text)]">
          Who we&apos;ve built for
        </RevealText>
      </div>

      <div className="container">
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => { isHovered.current = true }}
          onMouseLeave={() => { isHovered.current = false }}
        >
          <motion.div
            ref={trackRef}
            className="flex items-center gap-10 md:gap-14 w-max"
            style={{ x }}
          >
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <LogoSlot key={i} src={client.src} alt={client.alt} eager={i < CLIENTS.length} />
            ))}
          </motion.div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-(--color-bg) to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-(--color-bg) to-transparent z-10" />
        </div>
      </div>

    </section>
  )
}

function LogoSlot({ src, alt, eager }: { src: string; alt: string; eager?: boolean }) {
  return (
    <div className="shrink-0 flex items-center justify-center group" title={alt}>
      <Image
        src={src}
        alt={alt}
        width={0}
        height={40}
        unoptimized
        loading={eager ? 'eager' : 'lazy'}
        style={{ width: 'auto' }}
        className="object-contain h-9 md:h-12 grayscale opacity-50 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
      />
    </div>
  )
}
