'use client'

import { RevealText, RevealFade } from '@/components/ui/Reveal'

export function VisionSection() {
  return (
    <section className="relative py-16 md:py-20 bg-(--color-bg)" aria-label="Our Vision">
      <div className="container">
        <div className="mb-10 md:mb-14">
          <RevealText>
            <span className="text-meta-label font-bold uppercase tracking-(--tracking-meta) text-(--color-text-faint) block mb-4">
              Our Vision
            </span>
          </RevealText>
          <RevealText>
            <h2 className="text-h2 font-bold text-(--color-text)">
              Outcomes over deliverables
            </h2>
          </RevealText>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <RevealFade delay={0.2}>
            <p className="text-body-lg text-(--color-text-muted) leading-(--leading-body)">
              Every project starts with a business problem — leads slipping through,
              hours lost to manual work, a site that doesn&apos;t convert. We design and
              automate around that problem until something measurable changes: response
              time, conversion, team capacity, or cost.
            </p>
          </RevealFade>
          <RevealFade delay={0.3}>
            <p className="text-body-lg text-(--color-text-muted) leading-(--leading-body)">
              We&apos;re not here to hand you a deck and disappear. Strategy, design,
              development, and AI automation live under one roof in Pune — working with
              clients in India and worldwide. If the work doesn&apos;t make your business
              run better, we haven&apos;t done our job.
            </p>
          </RevealFade>
        </div>
      </div>
    </section>
  )
}
