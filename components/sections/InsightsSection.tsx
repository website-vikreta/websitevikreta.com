'use client'

import { RevealText, RevealFade } from '@/components/ui/Reveal'
import { ClipboardList, FlaskConical, Hammer } from 'lucide-react'

const INSIGHTS = [
  {
    id: 'walkthrough',
    icon: ClipboardList,
    title: 'Client walkthroughs',
    description:
      'Before we propose anything, we map how your team actually works — where leads drop, where hours disappear, where tools fight each other.',
    number: '01',
  },
  {
    id: 'toolbench',
    icon: FlaskConical,
    title: 'Tool bench',
    description:
      'We test AI and automation tools on real tasks, not demo videos. Only what survives the bench gets recommended to clients.',
    number: '02',
  },
  {
    id: 'sprints',
    icon: Hammer,
    title: 'Build sprints',
    description:
      'Focused weeks on one problem. Ship something usable, measure it against the goal, then decide what to fix or extend next.',
    number: '03',
  },
]

export function InsightsSection() {
  return (
    <section className="relative py-16 md:py-20 bg-(--color-bg)" aria-label="How We Work">
      <div className="container">
        <div className="mb-10 md:mb-14">
          <RevealText>
            <span className="text-meta-label font-bold uppercase tracking-(--tracking-meta) text-(--color-text-faint) block mb-4">
              How we stay sharp
            </span>
          </RevealText>
          <RevealText>
            <h2 className="text-h2 font-bold text-(--color-text) mb-4">
              Rituals that keep the work honest
            </h2>
          </RevealText>
          <RevealFade delay={0.1}>
            <p className="text-body-lg text-(--color-text-muted) leading-(--leading-body) max-w-3xl">
              Tools change every month. These habits don&apos;t — they&apos;re how we
              stay useful when the stack keeps shifting.
            </p>
          </RevealFade>
        </div>

        {/* Desktop: Horizontal timeline */}
        <div className="hidden md:block relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-0 right-0 h-px bg-(--color-border)" aria-hidden="true" />
          
          <div className="grid grid-cols-3 gap-8">
            {INSIGHTS.map((insight, index) => (
              <RevealFade key={insight.id} delay={0.15 + index * 0.1}>
                <div className="relative flex flex-col items-center text-center">
                  {/* Numbered circle */}
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 mb-6 rounded-full border-2 border-(--color-accent) bg-(--color-bg)">
                    <span className="text-xl font-bold text-(--color-accent)">
                      {insight.number}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-(--color-text) mb-3">
                    {insight.title}
                  </h3>
                  <p className="text-body text-(--color-text-muted) leading-(--leading-body)">
                    {insight.description}
                  </p>
                </div>
              </RevealFade>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical stack */}
        <div className="md:hidden flex flex-col gap-10">
          {INSIGHTS.map((insight, index) => (
            <RevealFade key={insight.id} delay={0.15 + index * 0.1}>
              <div className="flex flex-col items-center text-center">
                {/* Numbered circle */}
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full border-2 border-(--color-accent) bg-(--color-bg)">
                  <span className="text-xl font-bold text-(--color-accent)">
                    {insight.number}
                  </span>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-(--color-text) mb-3">
                  {insight.title}
                </h3>
                <p className="text-body text-(--color-text-muted) leading-(--leading-body)">
                  {insight.description}
                </p>
              </div>
            </RevealFade>
          ))}
        </div>
      </div>
    </section>
  )
}
