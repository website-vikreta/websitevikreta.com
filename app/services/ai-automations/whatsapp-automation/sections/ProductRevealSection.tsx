'use client'

import { useRef } from 'react'
import Image from 'next/image'
import {
  revealLines,
  revealFadeUp,
  revealClipImage,
  useGsapSection,
  STAGGER,
} from '@/lib/gsap/reveals'

const MODULES = [
  { title: 'Sales & CRM', line: 'Every lead from every channel in one dashboard.' },
  { title: 'WhatsApp Commerce', line: 'Cart recovery, COD confirm, order updates.' },
  { title: 'Automation & AI', line: 'Chatbots, agents, and workflows. No code.' },
  { title: 'Omni-Channel Inbox', line: 'WhatsApp, Instagram, and Facebook in one place.' },
]

export default function ProductRevealSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#reveal-heading', { trigger: scope.current })
    revealFadeUp('.reveal-copy', { y: 20, trigger: scope.current })
    revealClipImage('.reveal-visual', { scale: false, trigger: scope.current })
    revealFadeUp('.reveal-module', {
      y: 16,
      stagger: STAGGER.base,
      delay: STAGGER.loose,
      trigger: scope.current,
    })
  })

  return (
    <section
      ref={scope}
      id="product"
      className="scroll-mt-32 py-16 md:py-20"
      aria-labelledby="reveal-heading"
    >
      <div className="container">
        <div className="mb-10 grid grid-cols-1 items-center gap-10 md:mb-14 lg:grid-cols-2 lg:gap-16">
          <div className="mx-auto max-w-xl text-center">
            <h2
              id="reveal-heading"
              className="mb-6 text-h3 font-bold tracking-tight text-(--color-text)"
            >
              This is not a chatbot. It is your business on WhatsApp.
            </h2>
            <p className="reveal-copy text-body-lg leading-relaxed text-(--color-text-muted)">
              Leads from every channel land in one CRM. WhatsApp handles sales,
              support, and recovery. Your store stays in sync. Your team manages
              it from one dashboard instead of five tabs.
            </p>
          </div>

          <div className="reveal-visual relative overflow-hidden border border-(--color-border) bg-(--color-surface)">
            <Image
              src="/services/whatsapp-commerce-hub.webp"
              alt="Instagram, Facebook, Google, web, and ads feeding into WhatsApp. The same hub runs catalog, automation, and support, with the team watching one dashboard and the customer chatting on their phone."
              width={1448}
              height={1086}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map(({ title, line }) => (
            <div
              key={title}
              className="reveal-module border border-(--color-border) bg-(--color-surface) p-6 text-center md:p-8"
            >
              <h3 className="font-sans text-base font-bold text-(--color-text)">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">
                {line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
