'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { UiDesignToolsMarquee } from '@/components/sections/ui-ux/UiDesignToolsMarquee'
import { revealFadeUp, revealLines, useGsapSection } from '@/lib/gsap/reveals'
import { UI_UX_HERO } from '@/app/services/uiux-design/data'

/** Copy + CTAs only — full-viewport intro, separate from every section below. */
export function UiUxHero() {
  const scope = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const logosRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useGsapSection(scope, (reduce) => {
    const content = contentRef.current
    const heading = headingRef.current
    const sub = subRef.current
    const logos = logosRef.current
    const cta = ctaRef.current
    if (!content || !heading || !sub || !logos || !cta) return

    if (reduce) {
      gsap.set(content, { opacity: 1 })
      return
    }

    const tl = gsap.timeline()
    tl.set(content, { opacity: 1 }, 0)
    tl.add(revealLines(heading, { trigger: null }), 0)
    tl.add(revealFadeUp(sub, { y: 18, trigger: null }), '-=0.5')
    tl.add(revealFadeUp(cta, { y: 18, trigger: null }), '-=0.4')
    tl.add(revealFadeUp(logos, { y: 16, trigger: null }), '-=0.35')
  })

  return (
    <section
      ref={scope}
      className="relative flex min-h-[82vh] lg:min-h-svh flex-col justify-center overflow-x-clip"
      aria-label="UI/UX design services"
    >
      <div
        ref={contentRef}
        className="container relative z-10 pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 opacity-0"
      >
        <h1
          ref={headingRef}
          className="mb-6 max-w-4xl text-balance font-sans text-h1 font-bold text-(--color-text) md:font-semibold"
        >
          {UI_UX_HERO.line1}
          <br />
          {UI_UX_HERO.line2}
          <br />
          <span style={{ color: 'var(--color-accent)' }}>{UI_UX_HERO.line3Accent}</span>
        </h1>

        <p
          ref={subRef}
          className="mb-8 max-w-2xl text-body-lg leading-relaxed text-(--color-text-muted)"
        >
          {UI_UX_HERO.subhead}
        </p>

        <div ref={ctaRef} className="flex flex-col items-start gap-4 sm:flex-row">
          <Button href={UI_UX_HERO.primaryCta.href} variant="primary" size="lg" showArrow>
            {UI_UX_HERO.primaryCta.label}
          </Button>
          <Button href={UI_UX_HERO.secondaryCta.hash} variant="ghost" size="lg" showArrow>
            {UI_UX_HERO.secondaryCta.label}
          </Button>
        </div>

        <div ref={logosRef} className="mt-10 sm:mt-12 md:mt-16 -mx-4 sm:mx-0">
          <UiDesignToolsMarquee className="py-1" />
        </div>
      </div>
    </section>
  )
}
