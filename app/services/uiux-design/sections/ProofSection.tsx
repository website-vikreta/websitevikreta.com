'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useGsapSection, revealLines, revealFadeUp, STAGGER } from '@/lib/gsap/reveals'
import { WEB_PROJECTS, CASE_STUDIES } from '@/lib/work-data'
import { ExternalProjectLink, CaseStudyReadLink } from '@/components/sections/work/CaseStudyCard'

// Real projects tagged UI/UX DESIGN in lib/work-data.ts — no invented case studies.
const PROOF_PROJECTS = WEB_PROJECTS.filter((p) =>
  ['tocal', 'sustainable-bitcoin-protocol-site', 'earth-by-blancora', 'archmodal'].includes(p.slug)
)

const SBP_CASE_STUDY = CASE_STUDIES.find((c) => c.slug === 'sustainable-bitcoin-protocol')

export default function ProofSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#proof-heading', { trigger: scope.current })
    revealFadeUp('.proof-card', { y: 0, stagger: STAGGER.base, trigger: scope.current })
    revealFadeUp('.proof-quote', { y: 20, trigger: '.proof-quote' })
  })

  return (
    <section ref={scope} className="py-16 md:py-20 bg-(--color-surface)" aria-labelledby="proof-heading">
      <div className="container">

        <div className="mb-10 md:mb-14 max-w-2xl">
          <h2 id="proof-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            What We&rsquo;ve Designed
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-(--color-border)">
          {PROOF_PROJECTS.map((project) => (
            <div key={project.slug} className="proof-card border-r border-b border-(--color-border)">
              <ExternalProjectLink
                title={project.title}
                description={project.description}
                href={project.href}
                logo={project.logo}
                skills={project.skills}
                className="h-full"
              />
            </div>
          ))}
        </div>

        {SBP_CASE_STUDY?.testimonial && (
          <Link
            href={`/work/${SBP_CASE_STUDY.slug}`}
            className="proof-quote group mt-12 md:mt-16 block max-w-2xl border-l-2 border-(--color-text) pl-6 md:pl-8"
          >
            <p className="text-h3 font-normal text-(--color-text) leading-snug">
              &ldquo;{SBP_CASE_STUDY.testimonial.quote}&rdquo;
            </p>
            <p className="mt-4 text-sm text-(--color-text-muted)">
              {SBP_CASE_STUDY.testimonial.role} · {SBP_CASE_STUDY.metric?.value} {SBP_CASE_STUDY.metric?.label.toLowerCase()}
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
