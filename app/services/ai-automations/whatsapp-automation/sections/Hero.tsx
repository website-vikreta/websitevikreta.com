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

// Real figures only — 98% / 15–40% recovery were industry averages, not ours.
// 68+ is from StatsCounters; go-live window is the onboarding commitment on this page.
const PROOF = [
  '68+ projects shipped',
  'Live in 7 to 14 days',
  'Shopify and WooCommerce',
]

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
    tl.add(revealFadeUp(proof, { y: 14, trigger: null }), '-=0.45')
  })

  return (
    <section
      ref={scope}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-x-clip text-center"
      aria-label="WhatsApp Commerce Platform"
    >
      <div
        ref={contentRef}
        className="container relative z-10 pt-28 pb-20 opacity-0 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28"
      >
        <h1
          ref={headingRef}
          className="mx-auto mb-6 max-w-4xl text-balance font-sans text-h1 font-bold text-(--color-text) md:font-semibold"
        >
          Your store. Their WhatsApp.{' '}
          <span style={{ color: 'var(--color-accent)' }}>One system</span>{' '}
          running both.
        </h1>

        <p
          ref={subRef}
          className="mx-auto mb-10 max-w-2xl text-body-lg leading-relaxed text-(--color-text-muted)"
        >
          CRM, cart recovery, COD confirmation, order updates, and AI support.
          Deployed on your brand, connected to your store.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href="#whatsapp-demo" variant="primary" size="lg" showArrow>
            Book a Platform Demo
          </Button>
          {CALENDLY_URL && (
            <Button href={CALENDLY_URL} external variant="ghost" size="lg" showArrow>
              Schedule a Call
            </Button>
          )}
        </div>

        <ul
          ref={proofRef}
          className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-(--color-border) pt-6 text-sm text-(--color-text-muted)"
        >
          {PROOF.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
