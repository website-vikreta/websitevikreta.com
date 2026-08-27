'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useGsapSection, revealLines, revealFadeUp } from '@/lib/gsap/reveals'
import { CASE_STUDIES } from '@/lib/work-data'
import { CaseStudyVisual } from '@/components/sections/work/CaseStudyCard'

// Only real marketing/SEO work on file — no invented case studies or metrics.
const AP_CLEANCO = CASE_STUDIES.find((c) => c.slug === 'ap-cleanco')

export default function ProofSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#proof-heading', { trigger: scope.current })
    revealFadeUp('.proof-card', { y: 24, trigger: scope.current })
  })

  if (!AP_CLEANCO) return null

  return (
    <section ref={scope} className="py-16 md:py-20 bg-(--color-surface)" aria-labelledby="proof-heading">
      <div className="container">
        <div className="mb-10 md:mb-14 max-w-2xl">
          <h2 id="proof-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            What We&rsquo;ve Shipped
          </h2>
        </div>

        <Link
          href={`/work/${AP_CLEANCO.slug}`}
          className="proof-card group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center border border-(--color-border) bg-(--color-bg) p-6 md:p-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text)"
        >
          <CaseStudyVisual study={AP_CLEANCO} />

          <div>
            <span className="text-sm text-(--color-text-muted)">{AP_CLEANCO.tags}</span>
            <p className="mt-3 text-h3 font-bold text-(--color-text) leading-snug mb-4 group-hover:underline">
              {AP_CLEANCO.title}
            </p>
            <p className="text-body-lg text-(--color-text-muted) leading-relaxed mb-6">
              {AP_CLEANCO.excerpt}
            </p>
            {AP_CLEANCO.testimonial && (
              <blockquote className="border-l-2 border-(--color-text) pl-5">
                <p className="text-lg text-(--color-text) leading-snug">
                  &ldquo;{AP_CLEANCO.testimonial.quote}&rdquo;
                </p>
                <p className="mt-3 text-sm text-(--color-text-muted)">
                  {AP_CLEANCO.testimonial.role} &middot; {AP_CLEANCO.metric?.value} {AP_CLEANCO.metric?.label.toLowerCase()}
                </p>
              </blockquote>
            )}
          </div>
        </Link>
      </div>
    </section>
  )
}
