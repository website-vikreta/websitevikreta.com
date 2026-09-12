'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Check } from 'lucide-react'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'
import IntegrationLogoRail from '../components/IntegrationLogoRail'

const PACKAGES = [
  {
    name: 'WA Starter',
    price: '₹11,250',
    period: '/ quarter',
    description: 'CRM, WhatsApp Business channel, and lead management for teams getting started on WhatsApp.',
    cta: 'Ask about Starter',
    features: [
      'WhatsApp CRM with lead management',
      'Official WhatsApp Business channel',
      'Message templates and approvals',
      'Basic automation workflows',
      '2 team seats with shared inbox',
    ],
    highlighted: false,
  },
  {
    name: 'WA eCommerce',
    price: '₹15,750',
    period: '/ quarter',
    description: 'Full WhatsApp commerce stack with abandoned cart recovery, COD confirmation, and Shopify integration.',
    cta: 'Book a platform demo',
    eyebrow: 'Most stores start here',
    features: [
      'Everything in WA Starter',
      'Abandoned cart recovery with 3-step sequence',
      'COD order confirmation with auto-cancel',
      'Order and shipping status notifications',
      'WhatsApp product catalog',
      'Shopify and WooCommerce integration',
    ],
    highlighted: true,
  },
] as const

export default function PackagesSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#packages-heading',  { trigger: scope.current })
    revealFadeUp('.packages-intro',   { y: 20, trigger: scope.current })
    revealFadeUp('.package-card',     { y: 24, stagger: STAGGER.loose, trigger: scope.current })
    revealFadeUp('.packages-footer',  { y: 16, trigger: scope.current })
  })

  return (
    <section ref={scope} id="packages" className="scroll-mt-32 py-16 md:py-20" aria-labelledby="packages-heading">
      <div className="container">

        <div className="mb-10 max-w-2xl md:mb-14">
          <h2 id="packages-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            Two tiers. Pick what your store actually needs.
          </h2>
          <p className="packages-intro mt-5 text-body-lg leading-relaxed text-(--color-text-muted)">
            Platform subscription billed quarterly. WhatsApp message charges — Utility
            messages at around 11 paise and Marketing messages — are billed separately
            based on actual usage. Setup and onboarding are quoted once.
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
                  highlighted ? 'border-2 border-(--color-text) bg-(--color-surface)' : 'border border-(--color-border) bg-(--color-surface)'
                }`}
              >
                {highlighted && (
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-(--color-accent)" />
                )}

                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-bold text-(--color-text)">{name}</h3>
                  {eyebrow && (
                    <span className="shrink-0 whitespace-nowrap border border-(--color-border) px-2 py-1 text-xs font-semibold text-(--color-text-muted)">
                      {eyebrow}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight text-(--color-text)">{price}</span>
                  <span className="text-sm text-(--color-text-faint)">{period}</span>
                </div>

                <p className="mt-3 text-[15px] leading-relaxed text-(--color-text-muted)">{description}</p>

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
        >
          <div>
            <p className="font-bold text-(--color-text)">Custom and Enterprise</p>
            <p className="mt-1 text-sm leading-relaxed text-(--color-text-muted)">
              AI WhatsApp agents, Instagram and Facebook inbox integration, custom API
              connections, and multi-brand setups. Quoted based on scope.
            </p>
          </div>
          <Button href="#whatsapp-demo" variant="ghost" size="sm" showArrow className="shrink-0">
            Talk to us
          </Button>
        </div>

        {/* Integrations */}
        <IntegrationLogoRail className="packages-footer mt-10 md:mt-12" />
      </div>
    </section>
  )
}
