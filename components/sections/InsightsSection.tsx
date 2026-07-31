'use client'

import { RevealText, RevealFade } from '@/components/ui/Reveal'

const INSIGHTS = [
  {
    id: 'walkthrough',
    title: 'Client walkthroughs',
    description: 'We map how your team actually works before proposing anything.',
  },
  {
    id: 'toolbench',
    title: 'A tool bench, not a trend list',
    description: 'We test AI tools on real client work, not demo reels.',
  },
  {
    id: 'sprints',
    title: 'Build sprints',
    description: 'Focused weeks against one problem. Ship, measure, decide.',
  },
]

export function InsightsSection() {
  return (
    <section className="relative py-16 md:py-20" aria-label="How We Work">
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <RevealText>
            <h2 className="text-h2 font-bold text-(--color-text)">
              What working with us actually looks like
            </h2>
          </RevealText>
          <RevealFade delay={0.1}>
            <p className="mt-4 text-body-lg text-(--color-text-muted) leading-(--leading-body)">
              The same three moves on every project.
            </p>
          </RevealFade>
        </div>

        {/* One layout at every width — the desktop timeline and mobile stack used
            to be two `hidden`-toggled copies of the same three items, which put
            every word in the DOM twice. */}
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {INSIGHTS.map((insight, index) => (
            <RevealFade key={insight.id} delay={0.15 + index * 0.1}>
              <h3 className="mb-3 text-2xl font-bold text-(--color-text) sm:text-3xl">
                {insight.title}
              </h3>
              <p className="text-body text-(--color-text-muted) leading-(--leading-body)">
                {insight.description}
              </p>
            </RevealFade>
          ))}
        </div>
      </div>
    </section>
  )
}
