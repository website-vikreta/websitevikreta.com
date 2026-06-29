'use client'

import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'motion/react'
import Image from 'next/image'
import { RevealText } from '@/components/ui/Reveal'

const TECH_LOGOS = [
   { src: '/tools-logos/01-OpenAI.svg',        alt: 'OpenAI' },
   { src: '/tools-logos/02-Claude.svg',        alt: 'Claude AI' },
   { src: '/tools-logos/17-Gemini.svg',        alt: 'Gemini' },
   { src: '/tools-logos/06-Cursor.svg',        alt: 'Cursor' },
   { src: '/tools-logos/04-V0.svg',            alt: 'v0' },
   { src: '/tools-logos/05-Lovable.svg',       alt: 'Lovable' },
   { src: '/tools-logos/15-n8n.svg',           alt: 'n8n' },
   { src: '/tools-logos/16-MakeDotCom.svg',    alt: 'Make.com' },
   { src: '/tools-logos/24-Midjourney.svg',    alt: 'Midjourney' },
   { src: '/tools-logos/23-Sora.svg',          alt: 'Sora' },
   { src: '/tools-logos/30-Flux.svg',          alt: 'Flux' },
   { src: '/tools-logos/18-ElevenLabs.svg',    alt: 'ElevenLabs' },
   { src: '/tools-logos/28-KlingAI.svg',       alt: 'Kling AI' },
   { src: '/tools-logos/32-CrewAI.svg',        alt: 'CrewAI' },
   { src: '/tools-logos/33-LangChain.svg',     alt: 'LangChain' },
   { src: '/tools-logos/14-365Copilot.svg',    alt: 'Microsoft Copilot' },
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

      <div className="container mb-10 md:mb-14">
        <RevealText as="h3" className="text-h3 font-bold text-center text-(--color-text)">
          The AI stack we actually use.
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
            {[...TECH_LOGOS, ...TECH_LOGOS].map((logo, i) => (
              <LogoSlot key={i} src={logo.src} alt={logo.alt} eager={i < 10} />
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
        loading={eager ? 'eager' : 'lazy'}
        style={{ width: 'auto' }}
        className="object-contain h-9 md:h-12 grayscale opacity-50 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
      />
    </div>
  )
}
