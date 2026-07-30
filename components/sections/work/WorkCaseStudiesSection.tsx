'use client'

import { RevealText, RevealFade } from '@/components/ui/Reveal'
import {
  CASE_STUDY_GRID,
  FEATURED_CASE_STUDY,
} from '@/lib/work-data'
import {
  CaseStudyFeaturedLink,
  CaseStudyGridLink,
} from '@/components/sections/CaseStudyCard'

export function WorkCaseStudiesSection() {
  return (
    <section
      id="case-studies"
      className="relative py-16 md:py-20"
      aria-label="Case Studies"
    >
      <div className="container">
        <div className="mb-10 md:mb-14 max-w-3xl">
          <RevealText as="h2" className="text-h2 font-bold tracking-tight text-(--color-text)">
            Case studies
          </RevealText>
          <RevealFade className="mt-5" delay={0.1}>
            <p className="text-body-lg leading-relaxed text-(--color-text-muted)">
              Real client work with measurable outcomes — not mockups, not concept decks.
            </p>
          </RevealFade>
        </div>

        <div className="border border-(--color-border)">
          <RevealFade delay={0.15}>
            <CaseStudyFeaturedLink study={FEATURED_CASE_STUDY} />
          </RevealFade>

          <RevealFade
            className="grid border-t border-(--color-border) lg:grid-cols-2"
            delay={0.25}
          >
            {CASE_STUDY_GRID.map((study, index) => (
              <CaseStudyGridLink
                key={study.slug}
                study={study}
                className={
                  index === 1
                    ? 'border-t border-(--color-border) lg:border-t-0 lg:border-l'
                    : ''
                }
              />
            ))}
          </RevealFade>
        </div>
      </div>
    </section>
  )
}
