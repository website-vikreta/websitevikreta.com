'use client'

import { RevealText, RevealFade } from '@/components/ui/Reveal'
import { CASE_STUDY_GRID, FEATURED_CASE_STUDY } from '@/lib/work-data'
import { CaseStudyFeaturedLink, CaseStudyGridLink } from '@/components/sections/work/CaseStudyCard'

interface FeaturedWorkSectionProps {
  id?: string
  heading?: string
  subheading?: string
  ariaLabel?: string
  showImage?: boolean
  showExcerpt?: boolean
}

/**
 * The case-study block, shared by the home page and /work. Both pages rendered
 * their own hardcoded copy of this layout before — same markup, two sets of
 * case-study copy that could drift apart. Content now comes from
 * `lib/work-data.ts` in both places; only the heading differs.
 */
export function FeaturedWorkSection({
  id,
  heading = 'Proof over promises.',
  subheading = "We don't pitch what we might do. Here is what we've already shipped, and what it changed for the businesses behind it.",
  ariaLabel = 'Featured Work',
  showImage = true,
  showExcerpt = true,
}: FeaturedWorkSectionProps = {}) {
  return (
    <section id={id} className="relative py-16 md:py-20" aria-label={ariaLabel}>
      <div className="container">
        <div className="mb-10 md:mb-14 max-w-3xl">
          <RevealText as="h2" className="text-h2 font-bold tracking-tight text-(--color-text)">
            {heading}
          </RevealText>
          <RevealFade className="mt-5" delay={0.1}>
            <p className="text-body-lg leading-relaxed text-(--color-text-muted) max-w-xl">
              {subheading}
            </p>
          </RevealFade>
        </div>

        <div className="border border-(--color-border)">
          <RevealFade delay={0.15}>
            <CaseStudyFeaturedLink
              study={FEATURED_CASE_STUDY}
              showImage={showImage}
              showExcerpt={showExcerpt}
            />
          </RevealFade>

          <RevealFade className="grid border-t border-(--color-border) lg:grid-cols-2" delay={0.25}>
            {CASE_STUDY_GRID.map((study, index) => (
              <CaseStudyGridLink
                key={study.slug}
                study={study}
                showExcerpt={showExcerpt}
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
