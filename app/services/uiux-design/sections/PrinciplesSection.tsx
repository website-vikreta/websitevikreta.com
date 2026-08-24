'use client'

import { useRef } from 'react'
import { useGsapSection, revealLines, revealFadeUp, STAGGER } from '@/lib/gsap/reveals'

interface Principle {
  title:       string
  description: string
}

const PRINCIPLES: Principle[] = [
  {
    title:       'Research isn’t optional',
    description:
      'We don’t open Figma on day one. If we can’t explain why a screen looks the way it does, the research isn’t done yet.',
  },
  {
    title:       'One system, not one screen',
    description:
      'A one-off screen breaks the moment your product grows. We build the components once so every new screen reuses them.',
  },
  {
    title:       'Design ships. It doesn’t sit in a file.',
    description:
      'You get specs your developers can build from directly, not a Figma file that needs someone to translate it first.',
  },
]

export default function PrinciplesSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#principles-heading', { trigger: scope.current })
    revealFadeUp('.principle-row', { y: 20, stagger: STAGGER.loose, trigger: scope.current })
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="principles-heading">
      <div className="container">
        <div className="mb-10 md:mb-14 max-w-2xl">
          <h2 id="principles-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            What We Don&rsquo;t Compromise On
          </h2>
        </div>

        <div className="border-t border-(--color-border)">
          {PRINCIPLES.map((principle, i) => (
            <div
              key={principle.title}
              className="principle-row grid grid-cols-1 gap-3 border-b border-(--color-border) py-10 md:grid-cols-12 md:gap-8 md:py-12"
            >
              <span className="font-mono text-xs tracking-[0.06em] text-(--color-text-faint) md:col-span-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-2xl font-bold leading-[1.1] text-(--color-text) sm:text-3xl md:col-span-5">
                {principle.title}
              </h3>
              <p className="text-body-lg leading-relaxed text-(--color-text-muted) md:col-span-6">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
