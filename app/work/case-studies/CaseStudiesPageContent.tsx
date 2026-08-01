'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { RevealText, RevealFade } from '@/components/ui/Reveal'
import { DotGrid } from '@/components/ui/DotGrid'
import { Button } from '@/components/ui/Button'
import { CASE_STUDIES } from '@/lib/work-data'
import { CaseStudyVisual } from '@/components/sections/work/CaseStudyCard'
import { WorkCTASection } from '@/components/sections/work/WorkCTASection'

export function CaseStudiesPageContent() {
  return (
    <main>
      <DotGrid global />

      <section className="relative overflow-hidden" aria-label="Case Studies Hero">
        <div className="container pt-32 pb-8 md:pb-16 md:pt-40">
          <div className="max-w-3xl">
            <RevealText as="h1" className="text-h2 font-bold tracking-tight text-(--color-text)">
              Case studies
            </RevealText>
            <RevealFade className="mt-5" delay={0.1}>
              <p className="max-w-xl text-body-lg leading-relaxed text-(--color-text-muted)">
                Before-and-after stories from real engagements — what was broken, what we
                built, and what changed for the client.
              </p>
            </RevealFade>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20" aria-label="All Case Studies">
        <div className="container">
          <div className="grid grid-cols-1 border-t border-l border-(--color-border) lg:grid-cols-2">
            {CASE_STUDIES.map((study, index) => (
              <RevealFade
                key={study.slug}
                delay={(index % 2) * 0.08}
                className="border-r border-b border-(--color-border)"
              >
                <Link
                  href={`/work/${study.slug}`}
                  className="group flex h-full flex-col bg-(--color-surface) transition-colors duration-300 ease-out hover:bg-(--color-bg-muted) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text)"
                >
                  <div className="p-6 md:p-8">
                    <CaseStudyVisual study={study} />
                  </div>

                  <div className="flex flex-1 flex-col gap-5 px-6 pb-6 md:px-8 md:pb-8">
                    <Image
                      src={study.logo}
                      alt={study.company}
                      height={28}
                      width={140}
                      className="h-7 w-auto self-start"
                      unoptimized
                    />

                    <span className="text-sm text-(--color-text-muted)">{study.tags}</span>

                    <h2 className="text-2xl font-bold leading-snug tracking-tight text-(--color-text) sm:text-3xl">
                      {study.title}
                    </h2>

                    <p className="text-base leading-relaxed text-(--color-text-muted)">
                      {study.excerpt}
                    </p>

                    {study.metric ? (
                      <p className="text-sm text-(--color-text-muted)">
                        <span className="font-bold text-(--color-text)">{study.metric.value}</span>
                        {' · '}
                        {study.metric.label}
                      </p>
                    ) : null}

                    <div className="mt-auto flex items-center gap-1.5 text-base font-medium text-(--color-text)">
                      <span className="relative">
                        Read full case study
                        <span className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-(--color-text) transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                      </span>
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.75}
                        className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              </RevealFade>
            ))}
          </div>

          <RevealFade className="mt-10 md:mt-14" delay={0.2}>
            <Button href="/work" variant="ghost" size="md" showArrow>
              View all work
            </Button>
          </RevealFade>
        </div>
      </section>

      <WorkCTASection />
    </main>
  )
}
