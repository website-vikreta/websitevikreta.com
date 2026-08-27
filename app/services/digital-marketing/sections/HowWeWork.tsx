'use client'

import { useRef } from 'react'
import HowItWorks, { type HowItWorksStep } from '@/components/ui/how-it-works'
import { useGsapSection, revealLines, revealFadeUp } from '@/lib/gsap/reveals'

const STEPS: HowItWorksStep[] = [
  {
    title:       'Audit',
    description: 'We check your rankings, your traffic, your content, and where AI answer engines currently place you.',
    action:      'Share access to your site and analytics.',
  },
  {
    title:       'Strategy',
    description: 'A prioritized plan — the fixes and content that move the metrics that actually matter to your business.',
    action:      'Sign off on the priorities.',
  },
  {
    title:       'Build & publish',
    description: 'Technical fixes shipped, content written and published, campaigns launched — on a schedule you can see.',
    action:      'Review drafts before they go live.',
  },
  {
    title:       'Report & iterate',
    description: 'Monthly reporting tied to leads, not just traffic, with the next round of changes already queued up.',
    action:      'Tell us what’s converting on your end.',
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
