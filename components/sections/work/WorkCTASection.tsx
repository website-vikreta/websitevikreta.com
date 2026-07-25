'use client'

import { RevealText, RevealFade } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'

export function WorkCTASection() {
  return (
    <section className="relative py-16 md:py-20 bg-(--color-bg-muted)" aria-label="Work CTA">
      <div className="container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <RevealText as="h2" className="text-h2 font-bold text-(--color-text) mb-3">
              Have a problem like these?
            </RevealText>
            <RevealFade delay={0.1}>
              <p className="text-body-lg leading-relaxed text-(--color-text-muted)">
                Free call. No commitment. Tell us what isn&apos;t working and we&apos;ll tell you
                what we&apos;d actually do about it — before any proposal.
              </p>
            </RevealFade>
          </div>

          <RevealFade delay={0.2}>
            <Button href="/contact" variant="accent" size="lg" showArrow>
              Book a Free Call
            </Button>
          </RevealFade>
        </div>
      </div>
    </section>
  )
}
