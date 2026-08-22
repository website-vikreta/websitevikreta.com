'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { CALENDLY_URL } from '@/config/site'
import { useGsapSection, revealFadeUp, STAGGER } from '@/lib/gsap/reveals'

export default function CalendlyCTABanner() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealFadeUp('.calendly-cta-item', { y: 20, stagger: STAGGER.base, trigger: scope.current })
  })

  // The whole banner is one CTA — with no booking URL it would render a dark
  // slab around a dead button, so drop the section instead.
  if (!CALENDLY_URL) return null

  return (
    <section
      ref={scope}
      className="py-16 md:py-20"
      aria-labelledby="calendly-cta-heading"
    >
      <div className="container">
        <div className="flex flex-col items-center gap-6 bg-(--color-text) px-6 py-12 text-center sm:px-10 md:py-16">
          <h2
            id="calendly-cta-heading"
            className="calendly-cta-item text-h2 font-bold leading-[1.05] tracking-tight text-(--color-bg)"
          >
            Book a 30-Minute Free Consultation
          </h2>
          <p className="calendly-cta-item max-w-xl text-body-lg leading-relaxed text-(--color-bg)/70">
            No pitch, no commitment. We&apos;ll look at what you&apos;re doing by hand
            and tell you exactly what we&apos;d automate first.
          </p>
          <div className="calendly-cta-item flex flex-wrap items-center justify-center gap-4">
            <Button href={CALENDLY_URL} external variant="accent" size="lg" showArrow>
              Book a Free Call
            </Button>
            <Button href="#book-audit" variant="light" size="lg">
              Book Your Free Audit
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
