'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Check } from 'lucide-react'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

const CYCLES = [
  { key: 'quarterly', label: 'Quarterly' },
  { key: 'halfYearly', label: 'Half-yearly' },
  { key: 'yearly', label: 'Yearly' },
] as const

type CycleKey = (typeof CYCLES)[number]['key']

const PACKAGES = [
  {
    name: 'WA Starter',
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
    pricing: {
      quarterly:  { price: '₹11,250', period: '/ quarter' },
      halfYearly: { price: '₹21,000', period: '/ 6 months', save: 'Save ₹1,500 · 7%' },
      yearly:     { price: '₹39,000', period: '/ year',     save: 'Save ₹6,000 · 13%' },
    },
  },
  {
    name: 'WA eCommerce',
    description: 'Full WhatsApp commerce stack with abandoned cart recovery, COD confirmation, and Shopify integration.',
    cta: 'Book a platform demo',
    eyebrow: 'Most stores start here',
    features: [
      'Everything in WA Starter',
      'Abandoned cart recovery with automated sequence',
      'COD order confirmation with auto-cancel',
      'Order and shipping status notifications',
      'WhatsApp product catalog',
      'Shopify and WooCommerce integration',
    ],
    highlighted: true,
    pricing: {
      quarterly:  { price: '₹15,750', period: '/ quarter' },
      halfYearly: { price: '₹27,000', period: '/ 6 months', save: 'Save ₹4,500 · 14%' },
      yearly:     { price: '₹49,200', period: '/ year',     save: 'Save ₹13,800 · 22%' },
    },
  },
] as const

export default function PackagesSection() {
  const scope = useRef<HTMLElement>(null)
  const [cycle, setCycle] = useState<CycleKey>('quarterly')

  useGsapSection(scope, () => {
    revealLines('#packages-heading',  { trigger: scope.current })
    revealFadeUp('.packages-intro',   { y: 20, trigger: scope.current })
    revealFadeUp('.package-card',     { y: 20, stagger: STAGGER.base, trigger: scope.current })
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
            Platform subscription billed quarterly, half-yearly, or yearly. WhatsApp message
            charges for Utility messages at around 11 paise and Marketing messages are billed
            separately based on actual usage. Setup and onboarding are quoted once.
          </p>
        </div>

        {/* Billing cycle */}
        <div
          role="tablist"
          aria-label="Billing cycle"
          className="packages-intro mb-8 inline-flex border border-(--color-border)"
        >
          {CYCLES.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={cycle === key}
              onClick={() => setCycle(key)}
              className={`px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                cycle === key
                  ? 'bg-(--color-text) text-white'
                  : 'bg-(--color-surface) text-(--color-text-muted) hover:text-(--color-text)'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          {PACKAGES.map(({ name, pricing, description, features, cta, highlighted, ...rest }) => {
            const eyebrow = 'eyebrow' in rest ? rest.eyebrow : undefined
            const { price, period, save } = { save: undefined as string | undefined, ...pricing[cycle] }
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

                <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-3xl font-bold tracking-tight text-(--color-text)">{price}</span>
                  <span className="text-sm text-(--color-text-muted)">{period}</span>
                  {save && (
                    <span
                      key={`${cycle}-${save}`}
                      className="fade-in-on-mount px-2 py-1 text-xs font-bold"
                      style={{
                        background: 'rgba(26,138,90,0.1)',
                        border: '1px solid rgba(26,138,90,0.3)',
                        color: '#1a8a5a',
                      }}
                    >
                      {save}
                    </span>
                  )}
                </div>

                <p className="mt-3 text-base leading-relaxed text-(--color-text-muted)">{description}</p>

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-base leading-relaxed text-(--color-text-muted)">
                      <Check size={16} strokeWidth={2.5} aria-hidden className="mt-0.5 shrink-0 text-(--color-text)" />
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
            <p className="mt-1 text-base leading-relaxed text-(--color-text-muted)">
              AI WhatsApp agents, Instagram and Facebook inbox integration, custom API
              connections, and multi-brand setups. Quoted based on scope.
            </p>
          </div>
          <Button href="#whatsapp-demo" variant="ghost" size="sm" showArrow className="shrink-0">
            Talk to us
          </Button>
        </div>

      </div>
    </section>
  )
}
