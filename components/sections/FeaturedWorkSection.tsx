import {
  CaseStudyFeaturedLink,
  CaseStudyGridLink,
} from '@/components/sections/CaseStudyCard'
import { RevealFade, RevealText } from '@/components/ui/Reveal'
import { CASE_STUDY_GRID, FEATURED_CASE_STUDY } from '@/lib/work-data'

export function FeaturedWorkSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container py-16 md:py-20">

        {/* ── Section header ─────────────────────────────────────── */}
        <div className="max-w-3xl mb-10 md:mb-14">
          <RevealText
            as="h2"
            className="text-h2 font-bold tracking-tight text-(--color-text)"
          >
            Proof over promises.
          </RevealText>

          <RevealFade className="mt-5" delay={0.1}>
            <span className="block text-body-lg text-(--color-text-muted) max-w-xl leading-relaxed">
              We don&apos;t pitch what we might do. Here is what we&apos;ve already
              shipped, and what it changed for the businesses behind it.
            </span>
          </RevealFade>
        </div>

        {/* ── Case study grid ────────────────────────────────────── */}
        <div className="border border-(--color-border)">

          {/* Featured */}
          <RevealFade delay={0.15}>
            <CaseStudyFeaturedLink study={FEATURED_CASE_STUDY} />
          </RevealFade>

          {/* Two-up rows */}
          <RevealFade className="grid border-t border-(--color-border) lg:grid-cols-2" delay={0.25}>
            {CASE_STUDY_GRID.map((study, idx) => (
              <CaseStudyGridLink
                key={study.slug}
                study={study}
                className={
                  idx === 1
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
