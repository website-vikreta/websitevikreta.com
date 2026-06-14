'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useScroll, useTransform, motion } from 'motion/react'
import { SERVICES, Service } from '@/config/services'
import { Button } from '@/components/ui/Button'

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [maxTranslate, setMaxTranslate] = useState(0)
  const [sectionHeight, setSectionHeight] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current || !sectionRef.current) return
      // Measure actual sectionX in px from the container element's computed padding
      const overflow = trackRef.current.scrollWidth - window.innerWidth
      const safeOverflow = Math.max(0, overflow)
      setMaxTranslate(safeOverflow)
      setSectionHeight(window.innerHeight + safeOverflow * 1.25)
    }

    measure()

    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener('resize', measure)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -maxTranslate])

  return (
    <section
      ref={sectionRef}
      style={{ height: sectionHeight ? `${sectionHeight}px` : '340vh' }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col pt-14 pb-6">

        {/* Header */}
        <div className="container pb-10 flex-shrink-0">
          <h2 className="font-sans font-bold text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight text-[var(--color-text)]">
            Every service we offer,<br />
            now <span className='text-[var(--color-accent)]'>powered by AI</span>.
          </h2>
          <p className="mt-4 text-sm md:text-base text-[var(--color-text-muted)] max-w-xl leading-relaxed">
            We didn&apos;t slap &ldquo;AI&rdquo; onto our services as a trend. We rebuilt how we work — so every website, every app, every workflow we touch is smarter, faster, and built to compound over time.
          </p>
        </div>

        {/* Cards track */}
        <motion.div
          ref={trackRef}
          className="flex gap-5 pl-[var(--section-x)] pr-[var(--section-x)] flex-shrink-0"
          style={{ x }}
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: Service }) {
  const isNew = service.isNew

  return (
    <div
      // Inline style: card fills container content area (viewport minus both section-x gutters)
      style={{ width: 'calc(min(100vw, 1440px) - clamp(3rem, 12vw, 15rem))' }}
      className={[
        'flex-shrink-0',
        'h-[52vh]',
        'rounded-2xl overflow-hidden',
        'flex flex-row',
        isNew
          ? 'bg-[var(--color-text)]'
          : 'bg-[var(--color-surface)] border border-[var(--color-border)]',
      ].join(' ')}
    >
      {/* Text — left half */}
      <div className="flex flex-col justify-between w-1/2 p-10 md:p-14 flex-shrink-0">
        <div className="flex flex-col gap-4">
          {isNew && (
            <span className="self-start text-[10px] font-bold uppercase tracking-widest bg-[var(--color-accent)] text-black px-2.5 py-1 rounded-full">
              New
            </span>
          )}
          <h3
            className={`font-sans font-bold text-2xl md:text-[1.75rem] leading-snug ${
              isNew ? 'text-white' : 'text-[var(--color-text)]'
            }`}
          >
            {service.title}
          </h3>
          <p
            className={`text-sm md:text-base leading-relaxed ${
              isNew ? 'text-neutral-400' : 'text-[var(--color-text-muted)]'
            }`}
          >
            {service.description}
          </p>
        </div>

        <Button
          href="/contact"
          variant={isNew ? 'accent' : 'ghost'}
          size="sm"
          showArrow
          className="w-fit"
        >
          Get in touch
        </Button>
      </div>

      {/* Image — right half */}
      <div
        className={`w-1/2 h-full flex-shrink-0 ${
          isNew ? 'bg-neutral-800' : 'bg-neutral-100'
        }`}
      />
    </div>
  )
}
