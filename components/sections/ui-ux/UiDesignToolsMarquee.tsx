'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useAnimationFrame, useMotionValue } from 'motion/react'

export interface DesignToolLogo {
  src: string
  alt: string
}

export const UI_DESIGN_TOOL_LOGOS: readonly DesignToolLogo[] = [
  { src: '/tools-logos/03-Figma.svg', alt: 'Figma' },
  { src: '/tools-logos/22-Canva.svg', alt: 'Canva' },
  { src: '/tools-logos/12-Adobe.svg', alt: 'Adobe' },
  { src: '/tools-logos/04-V0.svg', alt: 'v0' },
  { src: '/tools-logos/05-Lovable.svg', alt: 'Lovable' },
  { src: '/tools-logos/06-Cursor.svg', alt: 'Cursor' },
  { src: '/tools-logos/24-Midjourney.svg', alt: 'Midjourney' },
  { src: '/tools-logos/19-WordPress.svg', alt: 'WordPress' },
  { src: '/tools-logos/20-Shopify.svg', alt: 'Shopify' },
  { src: '/tools-logos/21-Squarespace.svg', alt: 'Squarespace' },
  { src: '/tools-logos/35-Vercel.svg', alt: 'Vercel' },
  { src: '/tools-logos/37-Sanity.svg', alt: 'Sanity' },
  { src: '/tools-logos/07-NextJS.svg', alt: 'Next.js' },
] as const

const FAST = 90
const SLOW = 28

function ToolLogoSlot({ src, alt, eager }: { src: string; alt: string; eager?: boolean }) {
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

export function UiDesignToolsMarquee({
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

  const tools = UI_DESIGN_TOOL_LOGOS

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => {
        isHovered.current = true
      }}
      onMouseLeave={() => {
        isHovered.current = false
      }}
      aria-label="UI/UX tools we use"
    >
      <motion.div ref={trackRef} className={`flex w-max items-center ${gapClass}`} style={{ x }}>
        {[...tools, ...tools].map((tool, i) => (
          <ToolLogoSlot key={`${tool.alt}-${i}`} src={tool.src} alt={tool.alt} eager={i < tools.length} />
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-(--color-bg) to-transparent md:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-(--color-bg) to-transparent md:w-16" />
    </div>
  )
}
