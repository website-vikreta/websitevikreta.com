'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useAnimationFrame, useMotionValue } from 'motion/react'
import { RevealText } from '@/components/ui/Reveal'

import { CLIENT_LOGO_MARQUEE_ITEMS } from '@/content/client-logos'

export { CLIENT_LOGO_MARQUEE_ITEMS }

const FAST = 90
const SLOW = 28

function LogoSlot({ src, alt, eager }: { src: string; alt: string; eager?: boolean }) {
  return (
    <div className="group flex h-9 w-24 shrink-0 items-center justify-center md:h-11 md:w-32" title={alt}>
      <Image
        src={src}
        alt={alt}
        width={0}
        height={56}
        unoptimized
        loading={eager ? 'eager' : 'lazy'}
        className="h-full w-full object-contain opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
      />
    </div>
  )
}

export function ClientLogoMarquee({
  className = '',
  gapClass = 'gap-10 md:gap-14',
}: {
  className?: string
  gapClass?: string
}) {
  const x = useMotionValue(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const isHovered = useRef(false)
  const vel = useRef(FAST)

  useAnimationFrame((_, delta) => {
    const target = isHovered.current ? SLOW : FAST
    vel.current += (target - vel.current) * 0.06
    const halfW = trackRef.current ? trackRef.current.offsetWidth / 2 : 0
    if (!halfW) return
    const next = x.get() - (vel.current * delta) / 1000
    x.set(next % halfW)
  })

  const clients = CLIENT_LOGO_MARQUEE_ITEMS

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => {
        isHovered.current = true
      }}
      onMouseLeave={() => {
        isHovered.current = false
      }}
      aria-label="Client logos"
    >
      <motion.div ref={trackRef} className={`flex w-max items-center ${gapClass}`} style={{ x }}>
        {[...clients, ...clients].map((client, i) => (
          <LogoSlot key={i} src={client.src} alt={client.alt} eager={i < clients.length} />
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-(--color-bg) to-transparent md:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-(--color-bg) to-transparent md:w-16" />
    </div>
  )
}

export function ClientLogosSection() {
  return (
    <section className="overflow-x-clip py-16 md:py-20">
      <div className="container mb-10 md:mb-14">
        <RevealText as="h2" className="text-h2 font-bold text-(--color-text)">
          Who we&apos;ve built for
        </RevealText>
      </div>
      <div className="container">
        <ClientLogoMarquee />
      </div>
    </section>
  )
}
