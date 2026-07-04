'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import {
  revealLines,
  revealFadeUp,
  useGsapSection,
} from '@/lib/gsap/reveals'

export default function Hero() {
  const scope = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  // Load-triggered hero timeline (no ScrollTrigger — above the fold).
  useGsapSection(scope, (reduce) => {
    const content = contentRef.current
    const heading = headingRef.current
    const sub = subRef.current
    const cta = ctaRef.current
    if (!content || !heading || !sub || !cta) return

    // Reduced motion: reveal instantly, no transforms.
    if (reduce) {
      gsap.set(content, { opacity: 1 })
      return
    }

    const tl = gsap.timeline()
    // Lift the FOUC guard exactly as the choreography begins.
    tl.set(content, { opacity: 1 }, 0)
    // 1. Headline masks up line-by-line.
    tl.add(revealLines(heading, { trigger: null }), 0)
    // 2. Subhead settles into the tail of the headline.
    tl.add(revealFadeUp(sub, { y: 18, trigger: null }), '-=0.5')
    // 3. CTA follows.
    tl.add(revealFadeUp(cta, { y: 18, trigger: null }), '-=0.4')
  })

  return (
    <section
      ref={scope}
      className="relative flex flex-col items-center justify-center min-h-svh text-center overflow-x-clip"
      aria-label="AI Automation Services"
    >
      <div
        ref={contentRef}
        className="container relative z-10 pt-28 pb-20 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28 opacity-0"
      >
        <h1
          ref={headingRef}
          className="text-h1 font-bold md:font-semibold text-(--color-text) font-sans mb-6 max-w-4xl mx-auto text-balance"
        >
          Your Team Is{' '}
          <span style={{ color: 'var(--color-accent)' }}>Too Expensive</span>{' '}
          to Spend on Copy-Paste
        </h1>

        <p
          ref={subRef}
          className="text-body-lg text-(--color-text-muted) max-w-xl mx-auto leading-relaxed mb-10"
        >
          We find the slow, manual part of your business and build a system
          that runs it in a fraction of the time. Your team keeps the work
          that needs a human. The rest runs itself.
        </p>

        <div ref={ctaRef} className="flex justify-center">
          <Button href="#book-audit" variant="primary" size="lg" showArrow>
            Book a Free Process Audit
          </Button>
        </div>
      </div>
    </section>
  )
}
