'use client'

import Link from 'next/link'
import Image from 'next/image'
import { RevealText, RevealFade } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import type { CaseStudy } from '@/lib/work-data'
import { CaseStudyVisual } from '@/components/sections/work/CaseStudyCard'
import { WorkCTASection } from '@/components/sections/work/WorkCTASection'

interface Props {
  study: CaseStudy
}

const SUBHEAD = 'text-h3 font-bold tracking-tight text-(--color-text) mb-6'

export function CaseStudyDetailClient({ study }: Props) {
  return (
    <main>
      <section className="relative overflow-hidden" aria-label="Case Study Hero">
        <div className="container pt-32 pb-8 md:pb-16 md:pt-40">
          <RevealFade delay={0}>
            <Link
              href="/work"
              className="mb-8 inline-flex text-sm text-(--color-text-muted) transition-colors duration-300 hover:text-(--color-text)"
            >
              ← Back to work
            </Link>
          </RevealFade>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div>
              <RevealFade delay={0.05}>
                <Image
                  src={study.logo}
                  alt={study.company}
                  height={32}
                  width={160}
                  className="mb-6 h-8 w-auto"
                  unoptimized
                />
              </RevealFade>

              <RevealText as="h1" className="text-h2 font-bold tracking-tight text-(--color-text) mb-4">
                {study.title}
              </RevealText>

              <RevealFade delay={0.1}>
                <p className="text-body-lg leading-relaxed text-(--color-text-muted) mb-6">
                  {study.subtitle}
                </p>
              </RevealFade>

              <RevealFade delay={0.15}>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-(--color-text-muted)">
                  <span>{study.tags}</span>
                  {study.metric ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>
                        <span className="font-bold text-(--color-text)">{study.metric.value}</span>
                        {' '}
                        {study.metric.label}
                      </span>
                    </>
                  ) : null}
                </div>
              </RevealFade>
            </div>

            <RevealFade delay={0.2}>
              <CaseStudyVisual study={study} />
            </RevealFade>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-(--color-surface)" aria-label="Case Study Details">
        <div className="container">
          <div className="grid gap-12">
            <RevealFade delay={0.1}>
              <article>
                <h2 className={SUBHEAD}>The problem</h2>
                <p className="text-body leading-relaxed text-(--color-text-muted)">
                  {study.challenge}
                </p>
              </article>
            </RevealFade>

            <RevealFade delay={0.2}>
              <article>
                <h2 className={SUBHEAD}>What we did</h2>
                <p className="text-body leading-relaxed text-(--color-text-muted)">
                  {study.approach}
                </p>
              </article>
            </RevealFade>

            <RevealFade delay={0.3}>
              <article>
                <h2 className={SUBHEAD}>What changed</h2>
                <p className="text-body leading-relaxed text-(--color-text-muted)">
                  {study.result}
                </p>
              </article>
            </RevealFade>
          </div>

          {study.testimonial ? (
            <RevealFade className="mt-12 md:mt-16 max-w-3xl border-l-2 border-(--color-accent) pl-6" delay={0.35}>
              <blockquote className="text-xl font-medium leading-relaxed text-(--color-text) md:text-2xl">
                &ldquo;{study.testimonial.quote}&rdquo;
              </blockquote>
              <p className="mt-4 text-sm text-(--color-text-muted)">{study.testimonial.role}</p>
            </RevealFade>
          ) : null}

          {study.externalUrl ? (
            <RevealFade className="mt-10 md:mt-14" delay={0.4}>
              <Button href={study.externalUrl} variant="ghost" size="md" showArrow external>
                Visit live site
              </Button>
            </RevealFade>
          ) : null}
        </div>
      </section>

      <WorkCTASection />
    </main>
  )
}
