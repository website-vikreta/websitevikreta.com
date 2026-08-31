'use client'

import { useRef } from 'react'
import HowItWorks, { type HowItWorksStep } from '@/components/ui/how-it-works'
import { useGsapSection, revealLines, revealFadeUp } from '@/lib/gsap/reveals'

const STEPS: HowItWorksStep[] = [
  {
    title:       'Audit',
    description: 'We pull your current rankings, traffic, and lead numbers, and find out what’s actually costing you conversions.',
    action:      'Share access to Search Console, GA4, and ad accounts.',
  },
  {
    title:       'Plan',
    description: 'One growth plan across SEO, GEO, content, and paid, so the channels reinforce each other instead of competing for the same budget.',
    action:      'Approve the plan and the metrics that define success.',
  },
  {
    title:       'Run',
    description: 'We ship content, fix technical SEO, and launch campaigns in stages, reporting on leads and revenue, not vanity numbers.',
    action:      'Review real numbers with us every month.',
  },
  {
    title:       'Compound',
    description: 'SEO and content keep paying off after launch. We tune what’s working and cut what isn’t.',
    action:      'Tell us when the phone starts ringing more.',
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
