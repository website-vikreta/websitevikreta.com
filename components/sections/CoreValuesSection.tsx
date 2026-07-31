'use client'

import { RevealText, RevealFade } from '@/components/ui/Reveal'

const VALUES = [
  {
    number: '01',
    title: 'Think before we open a tool',
    description: 'No platform gets picked before we understand the problem.',
  },
  {
    number: '02',
    title: 'Measure what we ship',
    description: "Launch day isn't the finish line. Something real has to move.",
  },
  {
    number: '03',
    title: 'Keep the work visible',
    description: "You'll know what's being built, why, and what's next.",
  },
  {
    number: '04',
    title: 'Automate on purpose',
    description: 'AI goes where it kills repeat work, not where it demos well.',
  },
  {
    number: '05',
    title: 'Stay reachable',
    description: 'You talk to the people doing the work. No account managers.',
  },
  {
    number: '06',
    title: 'Update the toolkit, not our judgment',
    description: "Tools change every few months. What we test them against doesn't.",
  },
]

export function CoreValuesSection() {
  return (
    // The page's anchor slab. Six principles is the densest block on the About
    // page, so it gets the white `--color-surface` ground plus wider padding —
    // it lifts off the warm `--color-bg` sections either side without the page
    // lurching into a dark band mid-scroll.
    <section className="relative bg-(--color-surface) py-24 md:py-32" aria-label="Core Values">
      <div className="container">
        <div className="mb-14 max-w-3xl md:mb-20">
          <RevealText>
            <h2 className="text-h2 font-bold text-(--color-text)">
              How we decide what to build
            </h2>
          </RevealText>
          <RevealFade delay={0.15}>
            <p className="mt-4 text-body-lg text-(--color-text-muted) leading-(--leading-body)">
              Not values on a slide. The filter every project runs through.
            </p>
          </RevealFade>
        </div>

        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          {VALUES.map((value, index) => (
            <RevealFade key={value.number} delay={index * 0.1}>
              {/* Numerals keep the sitewide big-number treatment but sit as ghost
                  type here — six yellow numerals would blow the accent budget.
                  Yellow returns on hover, one item at a time. */}
              <article className="group">
                <div className="mb-4 font-mono text-5xl font-bold leading-none tracking-[-0.05em] text-(--color-accent) md:text-6xl">
                  {value.number}
                </div>
                <h3 className="mb-3 text-2xl font-bold text-(--color-text) sm:text-3xl">
                  {value.title}
                </h3>
                <p className="text-body text-(--color-text-muted) leading-(--leading-body)">
                  {value.description}
                </p>
              </article>
            </RevealFade>
          ))}
        </div>
      </div>
    </section>
  )
}
