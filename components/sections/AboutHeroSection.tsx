'use client'

import { RevealText, RevealFade } from '@/components/ui/Reveal'
import Image from 'next/image'

export function AboutHeroSection() {
  return (
    <section
      className="relative pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24"
      aria-label="About Hero"
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <RevealFade delay={0}>
              <span className="inline-flex items-center gap-2 border border-(--color-border) bg-(--color-surface) px-3 py-1.5 rounded-sm mb-6">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-(--color-accent)" />
                <span className="font-mono text-meta-label tracking-(--tracking-meta) text-(--color-text) uppercase">
                  Our Story
                </span>
              </span>
            </RevealFade>

            <RevealText>
              <h1 className="text-h1 font-bold text-(--color-text) mb-6">
                We used to build pages. Now we build systems.
              </h1>
            </RevealText>

            <RevealFade delay={0.2}>
              <p className="text-body-lg text-(--color-text-muted) leading-(--leading-body)">
                Five years in, we&apos;ve shipped websites for clients across the globe.
                A year ago we stopped treating AI as an add-on and rebuilt the agency
                around it. Today we map where your team loses time, build the automation
                and digital systems that fix it, and measure whether the numbers actually
                move.
              </p>
            </RevealFade>
          </div>

          <RevealFade delay={0.3}>
            <div className="relative w-full h-[450px] md:h-[550px] lg:h-[650px] rounded-sm overflow-hidden bg-(--color-bg-muted) border border-(--color-border)">
              <Image
                src="/about/team-strategy-meeting.webp"
                alt="Website Vikreta team in a strategy meeting"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </RevealFade>
        </div>
      </div>
    </section>
  )
}
