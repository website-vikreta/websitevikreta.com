'use client'

/**
 * Sits directly under PainSection — Pain names the problem, this names what
 * it costs in growth terms. Own top-level section (own H2) rather than a
 * sub-block of Pain, matching the ai-automations page's Pain → Pillars
 * precedent of two separate beats back to back. Kept negative/consequence-
 * framed on purpose — unlike PillarsSection.tsx on ai-automations ("what
 * changes when you automate", a benefits grid), this stays pain, not
 * payoff: that's what SolutionSection is for.
 *
 * A plain, unordered icon+title+line grid — same shape as PillarsSection.tsx
 * itself, no connectors or numbering — not a timeline. These three costs
 * are independent facts about the same problem, not a sequence: nothing
 * here happens "after" the last one, so a connected/numbered layout would
 * misread as a procedure. (Two prior layouts got this wrong: an arrow-chain
 * implying a causal sequence, then a vertical timeline implying ordered
 * steps — both visually implied a process where none exists.)
 */

import { useRef } from 'react'
import { Clock, TrendingDown, UserPlus } from 'lucide-react'
import { useGsapSection, revealLines, revealFadeUp, STAGGER } from '@/lib/gsap/reveals'

interface ImpactPoint {
  id: string
  icon: typeof Clock
  title: string
  detail: string
}

const IMPACT_POINTS: ImpactPoint[] = [
  {
    id: 'slower',
    icon: Clock,
    title: 'You’re always a step behind',
    detail: 'Leads wait while someone hunts for the right sheet. The next inquiry doesn’t wait around.',
  },
  {
    id: 'onboarding',
    icon: UserPlus,
    title: 'Every hire starts from zero',
    detail: 'New team members spend their first weeks learning where things live, not doing the job.',
  },
  {
    id: 'ceiling',
    icon: TrendingDown,
    title: 'You stop taking bigger deals',
    detail: 'The ones that would need a fourth spreadsheet just don’t happen.',
  },
]

export default function ImpactSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#impact-heading', { trigger: scope.current })
    revealFadeUp('.impact-point', { y: 24, stagger: STAGGER.base, trigger: scope.current })
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="impact-heading">
      <div className="container">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-(--color-text-muted)">
            The cost
          </p>
          <span className="mt-4 mb-4 block h-px w-8 bg-(--color-accent)" aria-hidden="true" />
          <h2
            id="impact-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            It Doesn&rsquo;t Stay a Minor Annoyance
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {IMPACT_POINTS.map((point) => {
            const Icon = point.icon
            return (
              <div key={point.id} className="impact-point">
                <Icon size={32} strokeWidth={1.5} className="text-(--color-text)" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-bold leading-snug text-(--color-text) sm:text-2xl">
                  {point.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-(--color-text-muted) sm:text-lg">
                  {point.detail}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
