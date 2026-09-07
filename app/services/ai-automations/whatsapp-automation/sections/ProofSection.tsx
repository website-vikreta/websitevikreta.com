'use client'

import { useRef } from 'react'
import {
  revealLines,
  revealFadeUp,
  useGsapSection,
  STAGGER,
} from '@/lib/gsap/reveals'

const CASES = [
  {
    brand: 'Keeros SuperFoods',
    result: '20 to 40% cart recovery',
    detail: '98% message read rate. Abandoned cart notification 15 to 20 minutes after drop-off.',
  },
  {
    brand: 'The Hatke',
    result: 'Up to 40% recovery',
    detail: '21x ROI reported. WhatsApp open rates far above email and SMS benchmarks.',
  },
  {
    brand: 'Indian Ethnic Co.',
    result: '15 to 20% recovery from 7%',
    detail: 'Cart recovery rose from a 7% baseline after switching from email-first to WhatsApp.',
  },
]

export default function ProofSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#proof-heading', { trigger: scope.current })
    revealFadeUp('.proof-card', {
      y: 20,
      stagger: STAGGER.base,
      trigger: scope.current,
    })
  })

  return (
    <section
      ref={scope}
      id="proof"
      className="py-16 md:py-20"
      aria-labelledby="proof-heading"
    >
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2
            id="proof-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            Documented results from real stores
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CASES.map(({ brand, result, detail }) => (
            <article
              key={brand}
              className="proof-card border border-(--color-border) bg-(--color-surface) p-6 md:p-8"
            >
              <p className="font-sans text-2xl font-bold text-(--color-accent)">{result}</p>
              <h3 className="mt-3 font-sans text-lg font-bold text-(--color-text)">{brand}</h3>
              <p className="mt-3 text-sm leading-relaxed text-(--color-text-muted)">{detail}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm text-(--color-text-faint)">
          Directional ranges from published case studies. Results vary by store
          volume, checkout health, and opt-in rates.
        </p>
      </div>
    </section>
  )
}
