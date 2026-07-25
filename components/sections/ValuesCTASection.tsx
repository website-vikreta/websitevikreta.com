'use client'

import { RevealText, RevealFade } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'

export function ValuesCTASection() {
  return (
    <section
      className="relative py-16 md:py-20 bg-(--color-bg-muted)"
      aria-label="Values CTA"
    >
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <RevealText>
              <h2 className="text-h2 font-bold text-(--color-text) mb-3">
                Values you can verify on a call
              </h2>
            </RevealText>
            <RevealFade delay={0.1}>
              <p className="text-body-lg text-(--color-text-muted) leading-(--leading-body)">
                We talk straight, show our work, and measure what we ship. If that
                doesn&apos;t match how we show up, tell us.
              </p>
            </RevealFade>
          </div>
          <RevealFade delay={0.2}>
            <Button href="/contact" variant="accent" size="lg" showArrow>
              Connect With Us Today
            </Button>
          </RevealFade>
        </div>
      </div>
    </section>
  )
}
