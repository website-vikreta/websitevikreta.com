'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { CALENDLY_URL } from '@/config/site'
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
  const proofRef = useRef<HTMLUListElement>(null)

  // Load-triggered hero timeline (no ScrollTrigger — above the fold).
  useGsapSection(scope, (reduce) => {
    const content = contentRef.current
    const heading = headingRef.current
    const sub = subRef.current
    const cta = ctaRef.current
    const proof = proofRef.current
    if (!content || !heading || !sub || !cta || !proof) return

    // Reduced motion: reveal instantly, no transforms.
    if (reduce) {
      gsap.set(content, { opacity: 1 })
      return
    }

    const tl = gsap.timeline()
    // Lift the FOUC guard exactly as the choreography begins.
    tl.set(content, { opacity: 1 }, 0)
    tl.add(revealLines(heading, { trigger: null }), 0)
    tl.add(revealFadeUp(sub, { y: 18, trigger: null }), '-=0.5')
    tl.add(revealFadeUp(cta, { y: 18, trigger: null }), '-=0.4')
    tl.add(revealFadeUp(proof, { y: 14, trigger: null }), '-=0.45')
  })

  return (
    <section
      ref={scope}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-x-clip text-center"
      aria-label="AI Automation Services"
    >
      <div
        ref={contentRef}
        className="container relative z-10 pt-28 pb-20 opacity-0 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28"
      >
        <h1
          ref={headingRef}
          className="mx-auto mb-6 max-w-4xl text-balance font-sans text-h1 font-bold text-(--color-text) md:font-semibold"
        >
          Get{' '}
          <span style={{ color: 'var(--color-accent)' }}>20 Hours a Week</span>{' '}
          Back. Cut What It Costs to Run Your Team.
        </h1>

        <p
          ref={subRef}
          className="mx-auto mb-10 max-w-2xl text-body-lg leading-relaxed text-(--color-text-muted)"
        >
          AI automation for the repetitive work eating your team&apos;s time —
          content production, customer replies, lead follow-up, tool-to-tool
          busywork. We find it, automate it, and hand it to you fully
          documented.
        </p>

        {/* Two paths on purpose: the form for people who want to write it down,
            a live call for people who'd rather just talk. Secondary is hidden
            entirely when CALENDLY_URL is unset — never a dead link. */}
        <div ref={ctaRef} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="#book-audit" variant="primary" size="lg" showArrow>
            Book a Free Process Audit
          </Button>
          {CALENDLY_URL && (
            <Button href={CALENDLY_URL} external variant="ghost" size="lg" showArrow>
              Schedule a Free Call
            </Button>
          )}
        </div>

        {/* Above-the-fold proof. Real, already-published figures only — sourced
            from StatsCounters' STATS array so they can't drift into invention. */}
        <ul
          ref={proofRef}
          className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-(--color-border) pt-6 text-sm text-(--color-text-muted)"
        >
          <li>6,360+ hours given back to clients</li>
          <li>68+ projects shipped</li>
          <li>Free audit, no commitment</li>
        </ul>
      </div>
    </section>
  )
}
