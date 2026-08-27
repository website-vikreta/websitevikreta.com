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

// Real figures, sourced from components/sections/StatsCounters.tsx so they
// can't drift — never invented (see .claude/learning.md [Hero] proof band).
const PROOF = ['Pune, India', '68 projects shipped', 'Five years in']

export default function Hero() {
  const scope = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const proofRef = useRef<HTMLUListElement>(null)

  useGsapSection(scope, (reduce) => {
    const content = contentRef.current
    const heading = headingRef.current
    const sub = subRef.current
    const cta = ctaRef.current
    const proof = proofRef.current
    if (!content || !heading || !sub || !cta || !proof) return

    if (reduce) {
      gsap.set(content, { opacity: 1 })
      return
    }

    const tl = gsap.timeline()
    tl.set(content, { opacity: 1 }, 0)
    tl.add(revealLines(heading, { trigger: null }), 0)
    tl.add(revealFadeUp(sub, { y: 18, trigger: null }), '-=0.5')
    tl.add(revealFadeUp(cta, { y: 18, trigger: null }), '-=0.4')
    tl.add(revealFadeUp(proof.children, { y: 12, trigger: null }), '-=0.35')
  })

  return (
    <section
      ref={scope}
      className="relative flex flex-col items-center justify-center min-h-svh text-center overflow-x-clip"
      aria-label="Digital Marketing / SEO & GEO"
    >
      <div
        ref={contentRef}
        className="container relative z-10 pt-28 pb-20 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28 opacity-0"
      >
        <h1
          ref={headingRef}
          className="text-h1 font-bold md:font-semibold text-(--color-text) font-sans mb-6 max-w-4xl mx-auto text-balance"
        >
          You Rank on Google. <span style={{ color: 'var(--color-accent)' }}>AI Still Skips You.</span>
        </h1>

        <p
          ref={subRef}
          className="text-body-lg text-(--color-text-muted) max-w-xl mx-auto leading-relaxed mb-10"
        >
          SEO gets you found on Google. GEO gets you cited by ChatGPT, Perplexity, and AI Overviews. We build campaigns that do both, on real data, not guesswork.
        </p>

        <div ref={ctaRef} className="flex justify-center">
          <Button href={CALENDLY_URL} external variant="primary" size="lg" showArrow>
            Book a Free Project Call
          </Button>
        </div>

        <ul
          ref={proofRef}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-2"
        >
          {PROOF.map((item) => (
            <li key={item} className="text-sm text-(--color-text-muted)">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
