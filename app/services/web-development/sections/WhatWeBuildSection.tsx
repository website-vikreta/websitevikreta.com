'use client'

import { useRef } from 'react'
import { Zap, Smartphone, FileCode2 } from 'lucide-react'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

const BUILD_ITEMS = [
  {
    icon:  Zap,
    title: 'Fast, SEO-ready builds',
    line:  'Clean semantic HTML, proper metadata, and load times that don’t lose visitors before the page even paints.',
  },
  {
    icon:  Smartphone,
    title: 'Mobile-first, always',
    line:  'Designed for the phone in your customer’s hand first, then scaled up, never squeezed to fit after.',
  },
  {
    icon:  FileCode2,
    title: 'Custom-coded, not templated',
    line:  'Every site is built from scratch in Next.js and Tailwind, built around your brand, not a theme with your logo swapped in.',
  },
]

export default function WhatWeBuildSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#build-heading', { trigger: scope.current })
    revealFadeUp('.build-item', { y: 24, stagger: STAGGER.base, trigger: scope.current })
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="build-heading">
      <div className="container">
        <div className="mb-10 md:mb-14 max-w-2xl">
          <h2 id="build-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            What We Build
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3 lg:gap-x-8">
          {BUILD_ITEMS.map(({ icon: Icon, title, line }) => (
            <div key={title} className="build-item">
              <Icon size={40} strokeWidth={1.5} aria-hidden="true" className="text-(--color-accent)" />
              <h3 className="mt-5 font-sans text-2xl font-bold leading-[1.15] text-(--color-text)">
                {title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-(--color-text-muted)">
                {line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
