'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Check } from 'lucide-react'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

const PACKAGES = [
  {
    name: 'WA Starter',
    description: 'CRM, WhatsApp Business channel, and lead management for teams getting started on WhatsApp.',
    cta: 'Get a quote',
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
    description: 'For stores that want cart recovery, COD confirmation, and Shopify or WooCommerce connected.',
    cta: 'Get a quote',
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
  },
] as const

export default function PackagesSection() {
  const scope = useRef<HTMLElement>(null)

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
            Two plans. Pick the one your store needs, and we will quote it.
          </h2>
          <p className="packages-intro mt-5 text-body-lg leading-relaxed text-(--color-text-muted)">
            Pricing depends on your order volume and the features you need. Tell our team about your
            store and we will send a quote.
          </p>
        </div>

        {/* Plain tier on the left; the dark recommended card is taller and slides over its edge */}
        <div className="grid grid-cols-1 gap-4 lg:my-6 lg:grid-cols-[5fr_6fr] lg:gap-0">
          {PACKAGES.map(({ name, description, features, cta, highlighted }) => {
            const dark = highlighted
            const muted = 'text-(--color-text-muted)'
            return (
              <article
                key={name}
                className={`package-card flex flex-col p-6 md:p-9 ${dark ? 'relative z-10 border border-(--color-border) bg-(--color-surface) text-(--color-text) lg:-my-6 lg:-ml-12 lg:shadow-2xl' : 'bg-(--color-bg-muted) text-(--color-text) lg:pr-14'}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold md:text-2xl">{name}</h3>
                </div>

                <p className={`mt-3 text-base leading-relaxed ${muted}`}>{description}</p>

                <ul className={`mt-7 grid flex-1 content-start gap-x-8 gap-y-4 ${dark ? 'md:grid-cols-2' : ''}`}>
                  {features.map((f) => {
                    const heading = f.startsWith('Everything in')
                    return (
                      <li
                        key={f}
                        className={`flex items-start gap-3 text-base leading-relaxed ${heading ? 'font-semibold md:col-span-2' : muted}`}
                      >
                        {!heading && (
                          <Check size={16} strokeWidth={2.5} aria-hidden className="mt-1 shrink-0 text-[#25d366]" />
                        )}
                        {f}
                      </li>
                    )
                  })}
                </ul>

                <div className="mt-8">
                  <Button href="#whatsapp-demo" modalSubject={`${name}: quote request`} variant="ghost" size="md" showArrow className="w-full justify-center">
                    {cta}
                  </Button>
                </div>

              </article>
            )
          })}
        </div>

        {/* Contact CTA for anything outside the two plans, in the site's own card style */}
        <div className="packages-footer mt-4 flex flex-col gap-5 border border-(--color-border) bg-(--color-surface) p-6 sm:flex-row sm:items-center sm:justify-between md:p-7 lg:mt-12">
          <div>
            <p className="text-lg font-bold text-(--color-text)">Need something custom?</p>
            <p className="mt-1 text-base leading-relaxed text-(--color-text-muted)">
              Multi-brand stores, AI WhatsApp agents or custom API connections. Tell us what you need and we will quote it.
            </p>
          </div>
          <Button href="#whatsapp-demo" modalSubject="Custom WhatsApp automation" variant="primary" size="md" showArrow className="shrink-0 self-start sm:self-auto">
            Talk to us
          </Button>
        </div>

      </div>
    </section>
  )
}
