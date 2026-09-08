'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { CALENDLY_URL } from '@/config/site'
import { revealLines, revealFadeUp, useGsapSection } from '@/lib/gsap/reveals'
import { WEB_DEV_HERO } from '../data'

export default function Hero() {
  const scope = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useGsapSection(scope, (reduce) => {
    const content = contentRef.current
    const heading = headingRef.current
    const sub = subRef.current
    const cta = ctaRef.current
    if (!content || !heading || !sub || !cta) return

    if (reduce) {
      gsap.set(content, { opacity: 1 })
      return
    }

    const tl = gsap.timeline()
    tl.set(content, { opacity: 1 }, 0)
    tl.add(revealLines(heading, { trigger: null }), 0)
    tl.add(revealFadeUp(sub, { y: 18, trigger: null }), '-=0.5')
    tl.add(revealFadeUp(cta, { y: 18, trigger: null }), '-=0.4')
  })

  return (
    <section
      ref={scope}
      className="relative flex min-h-svh flex-col justify-center overflow-x-clip"
      aria-label="Web Development Services"
    >
      <div
        ref={contentRef}
        className="container relative z-10 pt-28 pb-20 opacity-0 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28"
      >
        <h1
          ref={headingRef}
          className="mb-6 max-w-4xl text-balance font-sans text-h1 font-bold text-(--color-text) md:font-semibold"
        >
          {WEB_DEV_HERO.line1}
          <br />
          {WEB_DEV_HERO.line2}
          <br />
          {WEB_DEV_HERO.line3Before}
          <span style={{ color: 'var(--color-accent)' }}>{WEB_DEV_HERO.line3Accent}</span>
        </h1>

        <p
          ref={subRef}
          className="mb-10 max-w-2xl text-body-lg leading-relaxed text-(--color-text-muted)"
        >
          {WEB_DEV_HERO.subhead}
        </p>

        <div ref={ctaRef} className="flex flex-col items-start gap-4 sm:flex-row">
          <Button href={WEB_DEV_HERO.primaryCta.href} variant="primary" size="lg" showArrow>
            {WEB_DEV_HERO.primaryCta.label}
          </Button>
          {CALENDLY_URL ? (
            <Button href={CALENDLY_URL} external variant="ghost" size="lg" showArrow>
              {WEB_DEV_HERO.secondaryCta.label}
            </Button>
          ) : (
            <Button href="#get-quote" variant="ghost" size="lg" showArrow>
              {WEB_DEV_HERO.secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
