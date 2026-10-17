'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { UiDesignToolsMarquee, type DesignToolLogo } from '@/components/sections/ui-ux/UiDesignToolsMarquee'
import {
  revealLines,
  revealFadeUp,
  useGsapSection,
} from '@/lib/gsap/reveals'

// Real figures, sourced from components/sections/StatsCounters.tsx so they
// can't drift — never invented (see .ai/learning.md [Hero] proof band).
const PROOF = ['Pune, India', '68 projects shipped', 'Five years in']

// Where we get our clients found: search + ad platforms, and the AI assistants GEO targets.
const MARKETING_TOOL_LOGOS: readonly DesignToolLogo[] = [
  { src: '/tools-logos/27-GoogleLabs(GoogleLogo).svg', alt: 'Google' },
  { src: '/tools-logos/26-Meta.svg', alt: 'Meta' },
  { src: '/tools-logos/25-LinkedIn.svg', alt: 'LinkedIn' },
  { src: '/tools-logos/34-HubSpot.svg', alt: 'HubSpot' },
  { src: '/tools-logos/01-OpenAI.svg', alt: 'ChatGPT' },
  { src: '/tools-logos/17-Gemini.svg', alt: 'Gemini' },
  { src: '/tools-logos/02-Claude.svg', alt: 'Claude' },
  { src: '/tools-logos/19-WordPress.svg', alt: 'WordPress' },
  { src: '/tools-logos/20-Shopify.svg', alt: 'Shopify' },
  { src: '/tools-logos/22-Canva.svg', alt: 'Canva' },
]

export default function Hero() {
  const scope = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const proofRef = useRef<HTMLUListElement>(null)
  const logosRef = useRef<HTMLDivElement>(null)

  useGsapSection(scope, (reduce) => {
    const content = contentRef.current
    const heading = headingRef.current
    const sub = subRef.current
    const cta = ctaRef.current
    const proof = proofRef.current
    const logos = logosRef.current
    if (!content || !heading || !sub || !cta || !proof || !logos) return

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
    tl.add(revealFadeUp(logos, { y: 16, trigger: null }), '-=0.35')
  })

  return (
    <section
      ref={scope}
      className="relative flex min-h-[82vh] lg:min-h-svh flex-col justify-center overflow-x-clip"
      aria-label="Digital Marketing, SEO & GEO"
    >
      <div
        ref={contentRef}
        className="container relative z-10 pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 opacity-0"
      >
        <h1
          ref={headingRef}
          className="mb-6 max-w-4xl text-balance font-sans text-h1 font-bold text-(--color-text) md:font-semibold"
        >
          Your Marketing{' '}
          <span style={{ color: 'var(--color-accent)' }}>Stopped</span>{' '}
          Paying For Itself
        </h1>

        <p
          ref={subRef}
          className="mb-8 max-w-2xl text-body-lg leading-relaxed text-(--color-text-muted)"
        >
          SEO, content, and paid campaigns tracked by leads and revenue, not
          impressions and rankings and built to show up in Google and in
          the answers AI gives.
        </p>

        <div ref={ctaRef} className="flex flex-col items-start gap-4 sm:flex-row">
          <Button href="#marketing-audit" variant="primary" size="lg" showArrow>
            Book a Free Marketing Audit
          </Button>
          <Button href="#proof" variant="ghost" size="lg" showArrow>
            See the results
          </Button>
        </div>

        <ul
          ref={proofRef}
          className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-2"
        >
          {PROOF.map((item) => (
            <li key={item} className="text-sm text-(--color-text-muted)">
              {item}
            </li>
          ))}
        </ul>

        <div ref={logosRef} className="mt-10 sm:mt-12 md:mt-16 -mx-4 sm:mx-0">
          <UiDesignToolsMarquee
            className="py-1"
            tools={MARKETING_TOOL_LOGOS}
            ariaLabel="Platforms we market on"
          />
        </div>
      </div>
    </section>
  )
}
