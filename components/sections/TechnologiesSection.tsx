'use client'

import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'motion/react'
import { StaggerTestimonials } from '@/components/ui/stagger-testimonials'

const TECH_LOGOS = [
  { src: 'https://svgl.app/library/nvidia.svg', alt: 'NVIDIA' },
  { src: 'https://svgl.app/library/supabase.svg', alt: 'Supabase' },
  { src: 'https://svgl.app/library/openai.svg', alt: 'OpenAI' },
  { src: 'https://svgl.app/library/turso.svg', alt: 'Turso' },
  { src: 'https://svgl.app/library/vercel.svg', alt: 'Vercel' },
  { src: 'https://svgl.app/library/github.svg', alt: 'GitHub' },
  { src: 'https://svgl.app/library/claude-ai.svg', alt: 'Claude AI' },
  { src: 'https://svgl.app/library/clerk.svg', alt: 'Clerk' },
]

const FAST = 70
const SLOW = 22

export function TechnologiesSection() {
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
    x.set(next <= -halfW ? next + halfW : next)
  })

  return (
    <section className="py-16 md:py-20 overflow-hidden">

      <div className="container mb-8 md:mb-10">
        <h2 className="font-sans font-bold text-3xl md:text-4xl leading-tight text-center text-[var(--color-text)]">
          Powered by AI. Future Tech.
        </h2>
      </div>

      <div
        className="relative"
        onMouseEnter={() => { isHovered.current = true }}
        onMouseLeave={() => { isHovered.current = false }}
      >
        <motion.div
          ref={trackRef}
          className="flex items-center gap-14 w-max"
          style={{ x }}
        >
          {[...TECH_LOGOS, ...TECH_LOGOS].map((logo, i) => (
            <LogoSlot key={i} src={logo.src} alt={logo.alt} />
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10" />
      </div>
    </section>
  )
}

function LogoSlot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center group">
      <img
        src={src}
        alt={alt}
        width={90}
        height={30}
        className="h-7 w-auto object-contain grayscale opacity-50 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
      />
    </div>
  )
}
