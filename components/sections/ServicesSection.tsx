'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useScroll, useTransform, motion } from 'motion/react'
import { SERVICES, Service } from '@/config/services'
import { Button } from '@/components/ui/Button'

const grainBg = (() => {
  const svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#g)"/></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
})()

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const [leftPad, setLeftPad] = useState<number | null>(null)
  const [maxTranslate, setMaxTranslate] = useState(0)
  const [sectionHeight, setSectionHeight] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Measure container content-left-edge so ServicesSection aligns with other sections at all viewport widths
  useEffect(() => {
    const measurePad = () => {
      if (!anchorRef.current) return
      const rect = anchorRef.current.getBoundingClientRect()
      const pl = parseFloat(getComputedStyle(anchorRef.current).paddingLeft)
      setLeftPad(Math.round(rect.left + pl))
    }
    measurePad()
    window.addEventListener('resize', measurePad)
    return () => window.removeEventListener('resize', measurePad)
  }, [])

  // Re-measure scroll overflow after leftPad is applied to the DOM
  useEffect(() => {
    if (leftPad === null) return
    const measureOverflow = () => {
      if (!trackRef.current) return
      const overflow = trackRef.current.scrollWidth - window.innerWidth
      const safeOverflow = Math.max(0, overflow)
      setMaxTranslate(safeOverflow)
      setSectionHeight(window.innerHeight + safeOverflow)
    }
    const id = requestAnimationFrame(measureOverflow)
    const ro = new ResizeObserver(measureOverflow)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener('resize', measureOverflow)
    return () => {
      cancelAnimationFrame(id)
      ro.disconnect()
      window.removeEventListener('resize', measureOverflow)
    }
  }, [leftPad])

  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -maxTranslate])

  return (
    <section
      ref={sectionRef}
      style={{ height: sectionHeight ? `${sectionHeight}px` : '400vh' }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-x-hidden overflow-y-hidden">
        {/* Hidden container anchor — measures the left content edge so the track aligns with other sections at xl+ */}
        <div ref={anchorRef} className="container absolute inset-0 pointer-events-none" aria-hidden />
        <motion.div
          ref={trackRef}
          className="flex gap-5 items-start"
          style={{ x, width: 'max-content', paddingLeft: leftPad ?? 'var(--section-x)', paddingRight: 'var(--section-x)' }}
        >
          <IntroPanel />
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function IntroPanel() {
  return (
    <div
      className="flex-shrink-0 flex flex-col justify-start py-8 md:py-10"
      style={{
        width: 'min(55vw, 700px)',
        height: 'clamp(400px, 60vh, 800px)',
      }}
    >
      <h2
        className="font-sans font-bold leading-[1.05] tracking-tight mb-5"
        style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--color-text)' }}
      >
        We don&apos;t build pages.<br />
        <span style={{ color: 'var(--color-accent)' }}>We build systems.</span>
      </h2>
      <p
        className="text-sm md:text-[0.9375rem] leading-relaxed max-w-[44ch]"
        style={{ color: 'var(--color-text-muted)' }}
      >
        Design, development, and automation in one build — leads flow in, manual work drops out, your business runs cleaner.
      </p>
    </div>
  )
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [hovered, setHovered] = useState(false)
  const cardBg = index % 2 === 0 ? '#131313' : '#181818'

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex-shrink-0 rounded-3xl overflow-hidden relative cursor-pointer flex flex-row"
      style={{ width: 'min(70vw, 900px)', height: 'clamp(400px, 60vh, 800px)', background: cardBg }}
    >
      {/* Grain texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: grainBg,
          backgroundSize: '200px 200px',
          opacity: 0.14,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Left — text content (40%) */}
      <div className="relative z-20 flex flex-col justify-between p-8 md:p-10" style={{ width: '40%' }}>
        <div>
          <h3
            className="font-sans font-bold text-white leading-snug mb-3"
            style={{ fontSize: 'clamp(1.15rem, 2vw, 1.75rem)' }}
          >
            {service.title}
          </h3>
          <p className="text-sm md:text-[0.9375rem] leading-relaxed text-white/50">
            {service.description}
          </p>
        </div>
        <Button href="/contact" variant="light" size="sm" className="w-fit">
          Get in touch
        </Button>
      </div>

      {/* Right — image (60%) */}
      <motion.div
        className="relative overflow-hidden rounded-2xl m-3"
        style={{ width: '60%' }}
        animate={{ scale: hovered ? 1.02 : 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-white/5" />
        {/* <Image src={service.image} alt={service.title} fill className="object-cover grayscale" sizes="42vw" /> */}
      </motion.div>
    </motion.div>
  )
}
