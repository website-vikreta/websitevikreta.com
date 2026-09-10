'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Check } from 'lucide-react'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

const PACKAGES = [
  {
    name: 'WA Starter',
    price: '₹11,250',
    period: '/ quarter',
    description: 'CRM, WhatsApp channel, and lead management for teams getting started.',
    cta: 'Ask about Starter',
    features: [
      'CRM + lead management',
      'WhatsApp channel + templates',
      'Basic automation workflows',
      '2 team seats',
      'Omni-channel inbox',
    ],
    highlighted: false,
  },
  {
    name: 'WA eCommerce',
    price: '₹15,750',
    period: '/ quarter',
    description: 'Full commerce stack with cart recovery, COD confirmation, and Shopify sync.',
    cta: 'Book a platform demo',
    eyebrow: 'Most stores start here',
    features: [
      'Everything in WA Starter',
      'Abandoned cart recovery (3-step)',
      'COD order confirmation',
      'Order + shipping notifications',
      'Product catalog in WhatsApp',
      'Shopify / WooCommerce sync',
    ],
    highlighted: true,
  },
] as const

const INTEGRATIONS = [
  'Shopify', 'WooCommerce', 'Razorpay', 'PayU', 'Meta Ads', 'IndiaMART', 'Justdial', 'Google Sheets',
]

export default function PackagesSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#packages-heading', { trigger: scope.current })
    revealFadeUp('.packages-intro', { y: 20, trigger: scope.current })
    revealFadeUp('.package-card',   { y: 24, stagger: STAGGER.loose, trigger: scope.current })
    revealFadeUp('.packages-footer', { y: 16, trigger: scope.current })
  })

  return (
    <section ref={scope} id="packages" className="scroll-mt-32 py-16 md:py-20" aria-labelledby="packages-heading">
      <div className="container">

        <div className="mb-10 max-w-2xl md:mb-14">
          <h2 id="packages-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            Two tiers. Pick what matches your store.
          </h2>
          <p className="packages-intro mt-5 text-body-lg leading-relaxed text-(--color-text-muted)">
            Platform subscription. Meta per-message charges — Utility (~11p) and Marketing — are billed
            separately on usage. Setup and onboarding quoted once.
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          {PACKAGES.map(({ name, price, period, description, features, cta, highlighted, ...rest }) => {
            const eyebrow = 'eyebrow' in rest ? rest.eyebrow : undefined
            return (
              <article
                key={name}
                className={`package-card relative flex h-full flex-col p-7 md:p-9 ${
                  highlighted
                    ? 'border-2 border-(--color-text) bg-(--color-surface)'
                    : 'border border-(--color-border) bg-(--color-surface)'
                }`}
                style={{ borderRadius: '16px' }}
              >
                {highlighted && (
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-(--color-accent)" />
                )}

                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-bold text-(--color-text)">{name}</h3>
                  {eyebrow && (
                    <span
                      style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--color-text-muted)', border: '1px solid var(--color-border)', borderRadius: '4px', padding: '3px 8px', whiteSpace: 'nowrap', flexShrink: 0 }}
                    >
                      {eyebrow}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight text-(--color-text)">{price}</span>
                  <span className="text-sm text-(--color-text-faint)">{period}</span>
                </div>

                <p className="mt-3 text-[15px] leading-relaxed text-(--color-text-muted)">{description}</p>

                {/* Features */}
                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm leading-relaxed text-(--color-text-muted)">
                      <Check size={15} strokeWidth={2.5} aria-hidden className="mt-0.5 shrink-0 text-(--color-text)" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <Button href="#whatsapp-demo" variant={highlighted ? 'primary' : 'ghost'} size="md" showArrow>
                    {cta}
                  </Button>
                </div>
              </article>
            )
          })}
        </div>

        {/* Custom tier row */}
        <div
          className="packages-footer mt-4 flex flex-col items-start justify-between gap-4 border border-(--color-border) bg-(--color-bg-muted) p-6 sm:flex-row sm:items-center md:p-7"
          style={{ borderRadius: '12px' }}
        >
          <div>
            <p className="font-bold text-(--color-text)">Custom / Enterprise</p>
            <p className="mt-1 text-sm leading-relaxed text-(--color-text-muted)">
              AI agents, Instagram + Facebook inbox, custom integrations, multi-brand setups.
              Quoted on scope.
            </p>
          </div>
          <Button href="#whatsapp-demo" variant="ghost" size="sm" showArrow className="shrink-0">
            Talk to us
          </Button>
        </div>

        {/* Integrations strip */}
        <div className="packages-footer mt-10 md:mt-12">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-(--color-text-faint)">
            Connects to what you already use
          </p>
          <div className="flex flex-wrap gap-2">
            {INTEGRATIONS.map(name => (
              <span
                key={name}
                className="rounded border border-(--color-border) bg-(--color-surface) px-3 py-1.5 text-xs font-medium text-(--color-text-muted)"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
