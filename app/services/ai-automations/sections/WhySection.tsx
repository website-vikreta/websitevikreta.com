'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGsapSection, revealLines, revealFadeUp, revealClipImage, STAGGER } from '@/lib/gsap/reveals'

const DIFFERENTIATORS = [
  {
    title: 'We audit before we build',
    body:  'If a $50 tool solves it, that’s what we’ll tell you — instead of inventing a reason to charge you more.',
  },
  {
    title: 'We’ve done the messy version of this',
    body:  'Spreadsheet chaos, tools that won’t talk to each other, exports that need renaming by hand. That’s most of the real work.',
  },
  {
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
              {DIFFERENTIATORS.map(({ title, body }) => (
                <li key={title} className="why-item">
                  <h3 className="font-sans text-lg font-bold tracking-tight text-(--color-text)">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-body-lg leading-relaxed text-(--color-text-muted)">
                    {body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="why-image relative order-first aspect-[4/3] w-full overflow-hidden bg-(--color-bg-muted)">
            <Image
              src="/our-services/ai-automation/why-choose-website-vikreta-ai-automation.webp"
              alt="Why choose Website Vikreta for AI automation"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
