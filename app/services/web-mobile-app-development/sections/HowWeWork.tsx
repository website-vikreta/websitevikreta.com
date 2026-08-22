'use client'

import { useRef } from 'react'
import HowItWorks, { type HowItWorksStep } from '@/components/ui/how-it-works'
import { useGsapSection, revealLines, revealFadeUp } from '@/lib/gsap/reveals'

const STEPS: HowItWorksStep[] = [
  {
    title:       'Discover',
    description: 'We map how the work actually happens today — the sheets, the tools, the handoffs.',
    action:      'Walk us through a normal week.',
  },
  {
    title:       'Design',
    description: 'We design the data model, the flows, and every screen before writing code.',
    action:      'Approve the plan on screen.',
  },
  {
    title:       'Build',
    description: 'We ship in stages, not one big launch day.',
    action:      'Review working screens each week.',
  },
  {
    title:       'Launch & support',
    description: 'We migrate your data and hand the system to your team.',
    action:      'Go live, then tell us what needs adjusting.',
  },
]

export default function HowWeWork() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#process-heading', { trigger: scope.current })
    revealFadeUp('.how-it-works-block', { y: 24, trigger: '.how-it-works-block' })
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="process-heading">
      <div className="container">
        <div className="mb-10 md:mb-14 max-w-2xl">
          <h2 id="process-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            How We Work
          </h2>
        </div>

        <HowItWorks steps={STEPS} className="how-it-works-block" />
      </div>
    </section>
  )
}
