'use client'

import { useRef } from 'react'
import { useGsapSection, revealLines, revealFadeUp } from '@/lib/gsap/reveals'
import { CASE_STUDIES } from '@/lib/work-data'
import { CaseStudyFeaturedLink } from '@/components/sections/work/CaseStudyCard'

// Only one real automation case study exists — no invented clients padding
// a grid, same "single real project" rule as digital-marketing/uiux-design's
// ProofSection when only one real example exists in the domain.
const SIMPLI_HOME = CASE_STUDIES.find((study) => study.slug === 'simpli-home')

export default function ProofSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#proof-heading', { trigger: scope.current })
    revealFadeUp('.proof-card', { y: 0, trigger: '.proof-card' })
    revealFadeUp('.proof-quote', { y: 20, trigger: '.proof-quote' })
  })

  if (!SIMPLI_HOME) return null

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="proof-heading">
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2 id="proof-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            Where this has already worked
          </h2>
        </div>

        <div className="proof-card border border-(--color-border)">
          <CaseStudyFeaturedLink study={SIMPLI_HOME} />
        </div>

        {SIMPLI_HOME.testimonial && (
          <div className="proof-quote mt-12 max-w-2xl border-l-2 border-(--color-text) pl-6 md:mt-16 md:pl-8">
            <p className="text-h3 font-normal leading-snug text-(--color-text)">
              &ldquo;{SIMPLI_HOME.testimonial.quote}&rdquo;
            </p>
            <p className="mt-4 text-sm text-(--color-text-muted)">
              {SIMPLI_HOME.testimonial.role}
              {SIMPLI_HOME.metric && `, ${SIMPLI_HOME.metric.value} ${SIMPLI_HOME.metric.label.toLowerCase()}`}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
