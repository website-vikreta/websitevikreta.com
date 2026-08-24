'use client'

import { useRef } from 'react'
import HowItWorks, { type HowItWorksStep } from '@/components/ui/how-it-works'
import { useGsapSection, revealLines, revealFadeUp } from '@/lib/gsap/reveals'

const STEPS: HowItWorksStep[] = [
  {
    title:       'Discover',
    description: 'We interview your users, look at what your competitors ship, and map where people actually get stuck today.',
    action:      'Introduce us to a few real users.',
  },
  {
    title:       'Design',
    description: 'Wireframes and user flows first, so the structure is right before any visual decisions get made.',
    action:      'Sign off on the flows.',
  },
  {
    title:       'Prototype',
    description: 'High-fidelity Figma screens, built into a clickable prototype your team (and real users) can react to.',
    action:      'Click through it, tell us where it breaks.',
  },
  {
    title:       'Handoff & support',
    description: 'Dev-ready specs and a reusable component library, so build doesn’t reinterpret the design.',
    action:      'Ship it, then flag what needs adjusting.',
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
