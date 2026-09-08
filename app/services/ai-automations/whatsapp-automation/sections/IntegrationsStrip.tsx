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
      className="border-y border-(--color-border) py-16 md:py-20"
      aria-label="Platform integrations"
    >
      <div className="container">
        <p className="mb-10 text-center text-sm text-(--color-text-muted) md:mb-14">
          Connects to what you already use
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {INTEGRATIONS.map((name, i) => (
            <li key={name} className="integration-item flex items-center gap-8">
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="hidden h-4 w-px bg-(--color-border) sm:block"
                />
              )}
              <span className="text-sm font-medium text-(--color-text)">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
