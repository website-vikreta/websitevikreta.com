'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGsapSection, revealLines, revealFadeUp, revealClipImage, STAGGER } from '@/lib/gsap/reveals'

export default function WhySection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('.why-heading', { trigger: scope.current })
    revealFadeUp('.why-para', { y: 20, stagger: STAGGER.base, trigger: scope.current })
    revealClipImage('.why-image', { trigger: '.why-image' })
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-label="Why Website Vikreta">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="max-w-2xl">
            <h2 className="why-heading text-h3 font-bold tracking-tight text-(--color-text) mb-6">
              Why Website Vikreta
            </h2>

            <p className="why-para text-body-lg text-(--color-text-muted) leading-relaxed mb-5">
              We audit before we build. If a $50 tool solves it, we&apos;ll tell you that instead of inventing a reason to charge you more.
            </p>

            <p className="why-para text-body-lg text-(--color-text-muted) leading-relaxed">
              We&apos;ve done the unglamorous version of this. Spreadsheet chaos, tools that won&apos;t talk to each other, exports that need renaming by hand. That&apos;s most of the real work, and it&apos;s where we&apos;re strongest.
            </p>
          </div>

          <div className="why-image relative w-full aspect-[4/3] overflow-hidden bg-(--color-bg-muted) order-first">
            <Image
              src="/images/careers-banner.png"
              alt="Why Website Vikreta"
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
