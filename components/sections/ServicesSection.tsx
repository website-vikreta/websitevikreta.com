'use client'

import React, { useRef } from 'react'
import { useScroll } from 'motion/react'
import { ReactLenis } from 'lenis/react'
import { StackingCard } from '@/components/ui/stacking-card'
import { Button } from '@/components/ui/Button'
import { SERVICES } from '@/config/services'

export function ServicesSection() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  return (
    <ReactLenis root>
      <div ref={container} className="relative bg-(--color-bg)">
        {/* Section Header — outside sticky scroll, above cards */}
        <div className="relative z-10 py-20 md:py-32 flex flex-col items-center justify-center">
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-500 font-sans mb-4">
            Services
          </p>
          <h2 className="font-sans font-semibold text-4xl md:text-6xl text-center text-neutral-900">
            What we build for you
          </h2>
        </div>

        {/* Cards — direct children of scroll container, no intermediate wrapper */}
        {SERVICES.map((service, i) => {
          const targetScale = 1 - (SERVICES.length - i) * 0.05
          return (
            <StackingCard
              key={service.id}
              i={i}
              title={service.title}
              description={service.description}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          )
        })}

        {/* CTA — after cards, inside same container */}
        <div className="relative z-10 py-24 flex flex-col items-center justify-center gap-8 bg-(--color-bg)">
          <h3 className="font-sans font-semibold text-3xl md:text-4xl text-center text-neutral-900">
            Ready to transform your business?
          </h3>
          <Button href="/contact" variant="primary" size="lg" showArrow>
            Book a Call
          </Button>
        </div>
      </div>
    </ReactLenis>
  )
}
