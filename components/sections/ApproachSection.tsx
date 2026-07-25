'use client'

import { RevealText, RevealFade } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Bot, ClipboardCheck, MousePointerClick, PencilRuler } from 'lucide-react'

const APPROACH_ITEMS = [
  {
    icon: ClipboardCheck,
    title: 'Diagnose',
    description:
      'We map the current workflow, identify where time or leads are being lost, and agree on the result before we define the build.',
  },
  {
    icon: PencilRuler,
    title: 'Design',
    description:
      'We turn the plan into a clear user experience, content structure, data flow, and technical architecture your team can actually maintain.',
  },
  {
    icon: Bot,
    title: 'Automate',
    description:
      'We connect the right tools, add AI only where it helps, and build workflows that reduce repeat work without making operations fragile.',
  },
  {
    icon: MousePointerClick,
    title: 'Improve',
    description:
      'We launch, watch what happens, and refine the system around real user behavior, team feedback, and measurable business signals.',
  },
]

export function ApproachSection() {
  return (
    <section className="relative py-16 md:py-20 bg-(--color-bg)" aria-label="Our Approach">
      <div className="container">
        {/* Section Header */}
        <div className="mb-10 md:mb-14 text-center max-w-3xl mx-auto">
          <RevealText>
            <span className="text-xs font-bold uppercase tracking-widest text-(--color-text-faint) mb-3 block">
              How We Work
            </span>
          </RevealText>
          <RevealText>
            <h2 className="text-h2 font-bold text-(--color-text)">
              Strategy, design, automation, and iteration in one flow
            </h2>
          </RevealText>
          <RevealFade delay={0.2}>
            <p className="text-body-lg text-(--color-text-muted) mt-4 leading-relaxed">
              We are useful when the problem is bigger than &quot;make a
              website&quot;. The work moves from diagnosis to launch without
              losing the reason it started.
            </p>
          </RevealFade>
        </div>

        <div className="grid gap-0 border-y border-(--color-border) md:grid-cols-4">
          {APPROACH_ITEMS.map((item, index) => {
            const Icon = item.icon

            return (
              <RevealFade key={item.title} delay={index * 0.15}>
                <article className="min-h-full border-b border-(--color-border) bg-(--color-bg) p-6 transition-colors duration-300 hover:bg-white md:border-b-0 md:border-r last:md:border-r-0">
                  <div className="mb-8 flex items-center justify-between">
                    <Icon
                      className="h-6 w-6 text-(--color-text)"
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-sm font-bold text-(--color-text-faint)">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-(--color-text) mb-3">
                    {item.title}
                  </h3>
                  <p className="text-body text-(--color-text-muted) leading-relaxed">
                    {item.description}
                  </p>
                </article>
              </RevealFade>
            )
          })}
        </div>

        <RevealFade delay={0.4}>
          <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center gap-6 text-center">
            <p className="text-xl font-medium leading-relaxed text-(--color-text) md:text-2xl">
              The goal is not to ship more features. The goal is to make the
              right work happen with less friction.
            </p>
            <Button href="/contact" variant="primary" size="lg" showArrow>
              Talk to Us, it&apos;s Free
            </Button>
          </div>
        </RevealFade>
      </div>
    </section>
  )
}
