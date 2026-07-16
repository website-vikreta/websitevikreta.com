'use client'

import { useRef } from 'react'
import AutomationWorkflowCanvas from '@/components/ui/automation-workflow-canvas'
import { useGsapSection, revealLines, revealFadeUp } from '@/lib/gsap/reveals'

export default function HowWeWork() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    // Heading masks up, then the canvas shell settles — both keyed to the
    // section trigger so they land in sync with the canvas self-draw below.
    revealLines('#services-heading', { trigger: scope.current, start: 'top 75%' })
    revealFadeUp('.wf-canvas-shell', { y: 24, trigger: scope.current, start: 'top 75%' })
  })

  return (
    <section ref={scope} id="services" className="py-16 md:py-20" aria-labelledby="services-heading">
      <div className="container">
        <div className="mb-10 md:mb-14 max-w-2xl">
          <h2 id="services-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            How We Work
          </h2>
        </div>

        <div className="wf-canvas-shell">
          <AutomationWorkflowCanvas />
        </div>
      </div>
    </section>
  )
}
