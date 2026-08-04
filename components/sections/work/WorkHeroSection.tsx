'use client'

import { RevealText, RevealFade } from '@/components/ui/Reveal'

export function WorkHeroSection() {
  return (
    <section className="relative overflow-hidden" aria-label="Work Hero">
      <div className="container pt-32 pb-8 md:pb-16 md:pt-40">
        <div className="max-w-3xl">
          <RevealText
            as="h1"
            className="text-h1 font-bold tracking-tight text-(--color-text)"
            immediate
          >
            Proof over <span className="text-(--color-accent)">promises.</span>
          </RevealText>

          <RevealFade className="mt-5" delay={0.1} immediate>
            <p className="max-w-xl text-body-lg leading-relaxed text-(--color-text-muted)">
              We don&apos;t pitch what we might do. Here&apos;s what we&apos;ve already shipped:
              websites, automation systems, product design. And what it changed for the clients
              we built for.
            </p>
          </RevealFade>
        </div>
      </div>
    </section>
  )
}
