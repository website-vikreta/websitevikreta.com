'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { ToolSprawl } from './SystemDiagram'
import {
  revealLines,
  revealFadeUp,
  useGsapSection,
  DUR,
  EASE,
  STAGGER,
} from '@/lib/gsap/reveals'

export default function PainSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, (reduce) => {
    revealLines('.pain-h2', { trigger: scope.current })
    revealFadeUp('.pain-p', { y: 20, stagger: STAGGER.loose, delay: 0.1, trigger: scope.current })
    revealFadeUp('.pain-diagram .sd-node', { y: 12, stagger: STAGGER.tight, trigger: '.pain-diagram' })

    // Connectors fade in after the chips land — the copying starts.
    if (reduce) return
    gsap.from('.pain-diagram .sd-link line', {
      opacity: 0,
      duration: DUR.slow,
      ease: EASE.out,
      stagger: STAGGER.tight,
      delay: 0.3,
      scrollTrigger: { trigger: '.pain-diagram', start: 'top 85%', once: true },
    })
  })

  return (
    <section ref={scope} className="pb-16 md:pb-20" aria-labelledby="pain-heading">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="max-w-xl">
            <h2
              id="pain-heading"
              className="pain-h2 text-h3 font-bold tracking-tight text-(--color-text) mb-6"
            >
              One Person Is Your Integration Layer
            </h2>

            <p className="pain-p text-body-lg text-(--color-text-muted) leading-relaxed mb-5">
              Leads sit in a sheet. Orders sit in another. Customers ask in
              WhatsApp. Nothing syncs, so someone on your team retypes the same
              row three times a day and hopes they caught them all.
            </p>

            <p className="pain-p text-body-lg text-(--color-text-muted) leading-relaxed">
              Buying the SaaS trades that for a different tax: your process bends
              around fields a stranger designed, billed monthly for the parts you
              never open.
            </p>
          </div>

          <div className="pain-diagram order-first md:order-last">
            <ToolSprawl />
          </div>
        </div>
      </div>
    </section>
  )
}
