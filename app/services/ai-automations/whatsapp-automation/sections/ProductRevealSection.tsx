'use client'

import { useRef } from 'react'
import {
  revealLines,
  revealFadeUp,
  revealClipImage,
  useGsapSection,
  STAGGER,
} from '@/lib/gsap/reveals'
import { MediaPlaceholder } from '../components/MediaPlaceholder'

const MODULES = [
  { title: 'Sales & CRM', line: 'Every lead from every channel — one dashboard.' },
  { title: 'WhatsApp Commerce', line: 'Cart recovery, COD confirm, order updates.' },
  { title: 'Automation & AI', line: 'Chatbots, agents, and workflows — no code.' },
  { title: 'Omni-Channel Inbox', line: 'WhatsApp, Instagram, and Facebook in one place.' },
]

export default function ProductRevealSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#reveal-heading', { trigger: scope.current })
    revealFadeUp('.reveal-copy', { y: 20, trigger: scope.current })
    revealClipImage('.reveal-visual', { scale: true, trigger: scope.current })
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
      className="py-16 md:py-20"
      aria-labelledby="reveal-heading"
    >
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2
            id="reveal-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            This is not a chatbot. It is your business on WhatsApp.
          </h2>
          <p className="reveal-copy mt-6 text-body-lg leading-relaxed text-(--color-text-muted)">
            Leads from every channel land in one CRM. WhatsApp handles sales,
            support, and recovery. Your store stays in sync. Your team manages
            it from one dashboard — not five tabs.
          </p>
        </div>

        <div className="reveal-visual mb-10">
          <MediaPlaceholder
            label="Hub architecture diagram — CRM at center, four product modules"
            aspect="wide"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map(({ title, line }) => (
            <div
              key={title}
              className="reveal-module border border-(--color-border) bg-(--color-surface) p-5"
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
