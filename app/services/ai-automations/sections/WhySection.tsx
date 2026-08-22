'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Search, Wrench, FileCheck2 } from 'lucide-react'
import { useGsapSection, revealLines, revealFadeUp, revealClipImage, STAGGER } from '@/lib/gsap/reveals'

const DIFFERENTIATORS = [
  {
    icon:  Search,
    title: 'We audit before we build',
    body:  'If a $50 tool solves it, that\'s what we\'ll tell you, instead of inventing a reason to charge you more.',
  },
  {
    icon:  Wrench,
    title: 'We\'ve done the messy version of this',
    body:  'Spreadsheet chaos, tools that won\'t talk to each other, exports that need renaming by hand. That\'s most of the real work.',
  },
  {
    icon:  FileCheck2,
    title: 'You own what we build',
    body:  'Documentation and a proper handover, not a dependency on us to keep it alive.',
  },
]

export default function WhySection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('.why-heading', { trigger: scope.current })
    revealFadeUp('.why-item', { y: 20, stagger: STAGGER.base, trigger: scope.current })
    revealClipImage('.why-image', { trigger: '.why-image' })
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-label="Why Website Vikreta">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="max-w-2xl">
            <h2 className="why-heading mb-8 text-h3 font-bold tracking-tight text-(--color-text)">
              Why Website Vikreta
            </h2>

            <ul className="flex flex-col gap-6">
              {DIFFERENTIATORS.map(({ icon: Icon, title, body }) => (
                <li key={title} className="why-item flex gap-4">
                  <Icon
                    size={22}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-(--color-accent)"
                  />
                  <div>
                    <h3 className="font-sans text-lg font-bold tracking-tight text-(--color-text)">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-body-lg leading-relaxed text-(--color-text-muted)">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="why-image relative order-first aspect-square w-full self-center overflow-hidden border border-(--color-border) bg-(--color-bg-muted)">
            <Image
              src="/our-services/ai-automation/why-choose-website-vikreta-ai-automation.webp"
              alt="Illustration: on the left a person holds their head over a desk buried in paperwork and crossed-out calendars; on the right the same person works calmly at one laptop while a dashboard, a piggy bank, a stopwatch, two joined puzzle pieces and a handover manual are each ticked off."
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
