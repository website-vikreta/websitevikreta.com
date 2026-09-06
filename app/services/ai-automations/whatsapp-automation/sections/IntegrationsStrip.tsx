'use client'

import { useRef } from 'react'
import { revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

const INTEGRATIONS = [
  'Shopify',
  'WooCommerce',
  'Meta Ads',
  'IndiaMART',
  'Justdial',
  'Razorpay',
  'PayU',
  'Google Sheets',
]

export default function IntegrationsStrip() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealFadeUp('.integration-item', {
      y: 12,
      stagger: STAGGER.tight,
      trigger: scope.current,
    })
  })

  return (
    <section
      ref={scope}
      className="border-y border-(--color-border) py-12 md:py-16"
      aria-label="Platform integrations"
    >
      <div className="container">
        <p className="mb-8 text-center text-sm text-(--color-text-muted)">
          Connects to what you already use
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-3">
          {INTEGRATIONS.map((name) => (
            <li
              key={name}
              className="integration-item flex h-12 min-w-[7rem] items-center justify-center border border-dashed border-(--color-border) bg-(--color-bg-muted) px-4"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-(--color-text-faint)">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
