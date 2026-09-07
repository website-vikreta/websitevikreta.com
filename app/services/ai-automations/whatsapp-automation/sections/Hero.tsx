'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { CALENDLY_URL } from '@/config/site'
import {
  revealLines,
  revealFadeUp,
  revealClipImage,
  useGsapSection,
} from '@/lib/gsap/reveals'
import { MediaPlaceholder } from '../components/MediaPlaceholder'

const PROOF = [
  '98% message open rate',
  '15 to 40% cart recovery range',
  'Live in 7 to 14 days',
]

export default function Hero() {
  const scope = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const proofRef = useRef<HTMLUListElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useGsapSection(scope, (reduce) => {
    const content = contentRef.current
    const heading = headingRef.current
    const sub = subRef.current
    const cta = ctaRef.current
    const proof = proofRef.current
    const visual = visualRef.current
    if (!content || !heading || !sub || !cta || !proof || !visual) return

    if (reduce) {
      gsap.set(content, { opacity: 1 })
      gsap.set(visual, { opacity: 1 })
      return
    }

    const tl = gsap.timeline()
    tl.set(content, { opacity: 1 }, 0)
    tl.add(revealLines(heading, { trigger: null }), 0)
    tl.add(revealFadeUp(sub, { y: 18, trigger: null }), '-=0.5')
    tl.add(revealFadeUp(cta, { y: 18, trigger: null }), '-=0.4')
    tl.add(revealFadeUp(proof.children, { y: 12, trigger: null }), '-=0.35')
    tl.add(revealClipImage(visual, { scale: true, trigger: null }), '-=0.6')
  })

  return (
    <section
      ref={scope}
      className="relative flex min-h-svh flex-col justify-center overflow-x-clip"
      aria-label="WhatsApp Commerce Platform"
    >
      <div
        ref={contentRef}
        className="container relative z-10 grid grid-cols-1 items-center gap-12 pt-28 pb-20 opacity-0 lg:grid-cols-2 lg:gap-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28"
      >
        <div className="text-center lg:text-left">
          <h1
            ref={headingRef}
            className="mb-6 max-w-xl text-balance font-sans text-h1 font-bold text-(--color-text) md:font-semibold lg:mx-0"
          >
            Your store. Their WhatsApp.{' '}
            <span style={{ color: 'var(--color-accent)' }}>One system</span>{' '}
            running both.
          </h1>

          <p
            ref={subRef}
            className="mb-10 max-w-lg text-body-lg leading-relaxed text-(--color-text-muted) lg:mx-0"
          >
            CRM, cart recovery, COD confirmation, order updates, and AI support.
            Deployed on your brand, connected to your store.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
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
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-(--color-border) pt-6 lg:justify-start"
          >
            {PROOF.map((item) => (
              <li key={item} className="text-sm text-(--color-text-muted)">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div ref={visualRef} className="opacity-0">
          <MediaPlaceholder
            label="Platform dashboard screenshot"
            aspect="video"
          />
        </div>
      </div>
    </section>
  )
}
