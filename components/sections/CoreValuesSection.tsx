'use client'

import { RevealText, RevealFade } from '@/components/ui/Reveal'

const VALUES = [
  {
    number: '01',
    title: 'Think before tools',
    description:
      'We do not begin with a platform, template, or trend. We begin by understanding the business problem and the people who deal with it every day.',
  },
  {
    number: '02',
    title: 'Measure the outcome',
    description:
      'A launch is only useful when it improves something real: leads, response time, conversion, reporting, team capacity, or customer experience.',
  },
  {
    number: '03',
    title: 'Keep the work visible',
    description:
      'Clear communication, transparent tradeoffs, and no mystery boxes. You should always know what is being built, why, and what comes next.',
  },
  {
    number: '04',
    title: 'Automate with intent',
    description:
      'AI belongs where it removes repetitive work, improves decisions, or creates speed without creating chaos. Useful beats flashy every time.',
  },
  {
    number: '05',
    title: 'Stay human with clients',
    description:
      'We ask questions, explain decisions, and keep the conversation honest. Good digital work needs trust as much as technical skill.',
  },
  {
    number: '06',
    title: 'Evolve deliberately',
    description:
      'Tools change quickly. Our job is to test, learn, and bring clients the parts that actually make their business stronger.',
  },
]

export function CoreValuesSection() {
  return (
    <section
      className="relative py-16 md:py-20"
      aria-label="Core Values"
    >
      <div className="container">
        <div className="mb-10 md:mb-14">
          <RevealText>
            <h2 className="text-h2 font-bold text-(--color-text) mb-4">
              Principles That Guide Us
            </h2>
          </RevealText>
          <RevealFade delay={0.2}>
            <p className="text-body-lg text-(--color-text-muted) leading-(--leading-body) max-w-2xl">
              These aren&apos;t wall posters. They&apos;re how we decide what to build,
              how to automate it, and how to tell you the truth when something
              isn&apos;t working.
            </p>
          </RevealFade>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {VALUES.map((value, index) => (
            <RevealFade key={value.number} delay={index * 0.1}>
              <article className="border-l-2 border-(--color-border) pl-6">
                <div className="text-xl sm:text-2xl font-bold uppercase tracking-(--tracking-meta) text-(--color-accent) mb-3">
                  {value.number}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-(--color-text) mb-3">
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
