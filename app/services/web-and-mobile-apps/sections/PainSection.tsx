'use client'

import Image from 'next/image'
import { RevealText, RevealFade, RevealImage } from '@/components/ui/Reveal'

export default function PainSection() {
  return (
    <section className="pb-16 md:pb-20" aria-label="The Software Your Team Works Around">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="max-w-2xl">
            <RevealText as="h2" className="text-h3 font-bold tracking-tight text-(--color-text) mb-6">
              The Software Your Team Works Around
            </RevealText>

            <RevealFade delay={0.1}>
              <p className="text-body-lg text-(--color-text-muted) leading-relaxed mb-5">
                Every growing business hits the same wall. A CRM that almost fits, so someone builds a spreadsheet next to it to track what it can&rsquo;t. A booking system that doesn&rsquo;t talk to your inventory. A support inbox with no idea what a customer already bought.
              </p>
            </RevealFade>
            <RevealFade delay={0.18}>
              <p className="text-body-lg text-(--color-text-muted) leading-relaxed mb-5">
                None of it is broken, exactly. It&rsquo;s three systems doing the job of one, and someone on your team is the glue holding them together — re-typing the same customer details for the third time today.
              </p>
            </RevealFade>
            <RevealFade delay={0.26}>
              <p className="text-body-lg text-(--color-text-muted) leading-relaxed mb-5">
                That&rsquo;s not a discipline problem. It&rsquo;s a software-shaped problem.
              </p>
            </RevealFade>
            <RevealFade delay={0.34}>
              <p className="text-body-lg text-(--color-text-muted) leading-relaxed">
                That&rsquo;s where we come in.
              </p>
            </RevealFade>
          </div>

          <RevealImage className="relative w-full aspect-[4/3] overflow-hidden bg-(--color-bg-muted) order-first md:order-last">
            <Image
              src="/our-services/web-mobile-crm.webp"
              alt="Custom CRM and internal tool dashboard built around a business's own workflow"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </RevealImage>
        </div>
      </div>
    </section>
  )
}
