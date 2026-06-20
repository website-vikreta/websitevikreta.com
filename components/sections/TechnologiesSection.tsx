'use client'

import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'motion/react'
import Image from 'next/image'

const TECH_LOGOS = [
  { src: '/01-OpenAI.svg',                    alt: 'OpenAI' },
  { src: '/02-Claude.svg',                    alt: 'Claude AI' },
  { src: '/03-Figma.svg',                     alt: 'Figma' },
  { src: '/04-V0.svg',                        alt: 'v0' },
  { src: '/05-Lovable.svg',                   alt: 'Lovable' },
  { src: '/06-Cursor.svg',                    alt: 'Cursor' },
  { src: '/07-NextJS.svg',                    alt: 'Next.js' },
  { src: '/08-Python.svg',                    alt: 'Python' },
  { src: '/09-NodeJS.svg',                    alt: 'Node.js' },
  { src: '/10-SQLServer.svg',                 alt: 'SQL Server' },
  { src: '/11-GitHub.svg',                    alt: 'GitHub' },
  { src: '/12-Adobe.svg',                     alt: 'Adobe' },
  { src: '/13-Office365.svg',                 alt: 'Office 365' },
  { src: '/14-365Copilot.svg',               alt: 'Microsoft Copilot' },
  { src: '/15-n8n.svg',                       alt: 'n8n' },
  { src: '/16-MakeDotCom.svg',               alt: 'Make.com' },
  { src: '/17-Gemini.svg',                    alt: 'Gemini' },
  { src: '/18-ElevenLabs.svg',               alt: 'ElevenLabs' },
  { src: '/19-WordPress.svg',                 alt: 'WordPress' },
  { src: '/20-Shopify.svg',                   alt: 'Shopify' },
  { src: '/21-Squarespace.svg',              alt: 'Squarespace' },
  { src: '/22-Canva.svg',                     alt: 'Canva' },
  { src: '/23-Sora.svg',                      alt: 'Sora' },
  { src: '/24-Midjourney.svg',               alt: 'Midjourney' },
  { src: '/25-LinkedIn.svg',                  alt: 'LinkedIn' },
  { src: '/26-Meta.svg',                      alt: 'Meta' },
  { src: '/27-GoogleLabs(GoogleLogo).svg',   alt: 'Google' },
  { src: '/28-KlingAI.svg',                  alt: 'Kling AI' },
  { src: '/30-Flux.svg',                      alt: 'Flux' },
  { src: '/31-Replit.svg',                    alt: 'Replit' },
  { src: '/32-CrewAI.svg',                   alt: 'CrewAI' },
  { src: '/33-LangChain.svg',                alt: 'LangChain' },
  { src: '/34-HubSpot.svg',                  alt: 'HubSpot' },
  { src: '/35-Vercel.svg',                    alt: 'Vercel' },
  { src: '/36-Netlify.svg',                   alt: 'Netlify' },
  { src: '/37-Sanity.svg',                    alt: 'Sanity' },
  { src: '/38-MongoDB.svg',                   alt: 'MongoDB' },
  { src: '/39-Java.svg',                      alt: 'Java' },
  { src: '/40-PHP.svg',                       alt: 'PHP' },
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
        <h2 className="font-sans font-bold text-3xl md:text-4xl leading-tight text-center text-(--color-text)">
          Powered by AI. Future Tech.
        </h2>
      </div>

      <div className="container">
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => { isHovered.current = true }}
          onMouseLeave={() => { isHovered.current = false }}
        >
          <motion.div
            ref={trackRef}
            className="flex items-center gap-14 w-max"
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
        className="object-contain h-8 md:h-10 grayscale opacity-30 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
      />
    </div>
  )
}
