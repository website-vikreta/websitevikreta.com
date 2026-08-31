'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useGsapSection, revealLines, revealFadeUp } from '@/lib/gsap/reveals'
import { WEB_PROJECTS, CASE_STUDIES } from '@/lib/work-data'
import { ExternalProjectLink, CaseStudyReadLink } from '@/components/sections/work/CaseStudyCard'

// Only one real project in this domain — no invented case studies, so this
// is a single full-width card rather than padding out a grid.
const AP_CLEANCO_PROJECT = WEB_PROJECTS.find((p) => p.slug === 'ap-cleanco-site')
const AP_CLEANCO_CASE_STUDY = CASE_STUDIES.find((c) => c.slug === 'ap-cleanco')

export default function ProofSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#proof-heading', { trigger: scope.current })
    revealFadeUp('.proof-card', { y: 0, trigger: '.proof-card' })
    revealFadeUp('.proof-quote', { y: 20, trigger: '.proof-quote' })
  })

  return (
    <section ref={scope} className="py-16 md:py-20 bg-(--color-surface)" aria-labelledby="proof-heading">
      <div className="container">

        <div className="mb-10 md:mb-14 max-w-2xl">
          <h2 id="proof-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            Where This Has Worked
          </h2>
        </div>

        {AP_CLEANCO_PROJECT && (
          <div className="proof-card border border-(--color-border) max-w-2xl">
            <ExternalProjectLink
              title={AP_CLEANCO_PROJECT.title}
              description={AP_CLEANCO_PROJECT.description}
              href={AP_CLEANCO_PROJECT.href}
              logo={AP_CLEANCO_PROJECT.logo}
              skills={AP_CLEANCO_PROJECT.skills}
            />
          </div>
        )}

        {AP_CLEANCO_CASE_STUDY?.testimonial && (
          <Link
            href={`/work/${AP_CLEANCO_CASE_STUDY.slug}`}
            className="proof-quote group mt-12 md:mt-16 block max-w-2xl border-l-2 border-(--color-text) pl-6 md:pl-8"
          >
            <p className="text-h3 font-normal text-(--color-text) leading-snug">
              &ldquo;{AP_CLEANCO_CASE_STUDY.testimonial.quote}&rdquo;
            </p>
            <p className="mt-4 text-sm text-(--color-text-muted)">
              {AP_CLEANCO_CASE_STUDY.testimonial.role} — {AP_CLEANCO_CASE_STUDY.metric?.value} {AP_CLEANCO_CASE_STUDY.metric?.label.toLowerCase()}
            </p>
            <div className="mt-4">
              <CaseStudyReadLink />
            </div>
          </Link>
        )}

      </div>
    </section>
  )
}
