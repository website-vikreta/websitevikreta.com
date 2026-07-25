'use client'

import { RevealText, RevealFade } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

export function AboutCTASection() {
  return (
    <section
      className="relative py-16 md:py-20 bg-(--color-bg)"
      aria-label="Get In Touch"
    >
      <div className="container">
        <div className="mb-10 md:mb-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-12">
            <RevealText>
              <h2 className="text-h2 font-bold text-(--color-text)">
                Tell us what&apos;s broken
              </h2>
            </RevealText>
            <RevealFade delay={0.2} className="lg:pb-2">
              <Button href="/contact" variant="accent" size="lg" showArrow>
                Book a Free Call
              </Button>
            </RevealFade>
          </div>
        </div>

        <RevealFade delay={0.1}>
          <p className="text-body-lg text-(--color-text-muted) leading-(--leading-body) mb-8 max-w-3xl">
            Free call. No commitment. Describe what isn&apos;t working — the manual
            process, the site that doesn&apos;t convert, the leads going cold — and
            we&apos;ll tell you what we&apos;d actually do about it. Not a pitch. Just
            a conversation.
          </p>
        </RevealFade>

        <RevealFade delay={0.3}>
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-(--color-bg-muted) border border-(--color-border) rounded-sm overflow-hidden">
            <Image
              src="/images/peoples_wv.png"
              alt="Website Vikreta team"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </RevealFade>
      </div>
    </section>
  )
}
