'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Check } from 'lucide-react'
import {
  revealLines,
  revealFadeUp,
  useGsapSection,
  STAGGER,
} from '@/lib/gsap/reveals'

interface PackageTier {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}

const PACKAGES: PackageTier[] = [
  {
    name: 'WA Starter',
    price: 'From ₹11,250 / quarter',
    description: 'CRM, WhatsApp channel, and lead management for teams getting started.',
    features: [
      'CRM + lead management',
      'WhatsApp channel + templates',
      'Basic automation workflows',
      '2 team members',
      'Customer management',
    ],
  },
  {
    name: 'WA eCommerce',
    price: 'From ₹15,750 / quarter',
    description: 'Full commerce stack with cart recovery, COD, and Shopify sync built in.',
    highlighted: true,
    features: [
      'Everything in WA Starter',
      'Abandoned cart recovery',
      'COD confirmation',
      'Order notifications',
      'Product-view messages',
      'Shopify integration',
    ],
  },
]

export default function PackagesSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#packages-heading', { trigger: scope.current })
    revealFadeUp('.package-card', {
      y: 24,
      stagger: STAGGER.loose,
      trigger: scope.current,
    })
  })

  return (
    <section
      ref={scope}
      id="packages"
      className="py-16 md:py-20"
      aria-labelledby="packages-heading"
    >
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2
            id="packages-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            Two tiers. Pick what matches your store.
          </h2>
          <p className="mt-6 text-body-lg leading-relaxed text-(--color-text-muted)">
            Platform subscription below. Meta per-message charges (Utility and
            Marketing) are billed separately based on usage.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PACKAGES.map(({ name, price, description, features, highlighted }) => (
            <article
              key={name}
              className={`package-card flex flex-col border p-6 md:p-8 ${
                highlighted
                  ? 'border-(--color-text) bg-(--color-surface)'
                  : 'border-(--color-border) bg-(--color-surface)'
              }`}
            >
              <h3 className="font-sans text-2xl font-bold text-(--color-text)">{name}</h3>
              <p className="mt-2 text-lg font-medium text-(--color-accent)">{price}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-(--color-text-muted)">
                {description}
              </p>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-(--color-text-muted)">
                    <Check
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-(--color-text)"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm text-(--color-text-faint)">
          Add-ons available: AI agents, Instagram and Facebook integration, custom
          integrations. One-time setup and onboarding quoted separately.
        </p>

        <div className="mt-8">
          <Button href="#whatsapp-demo" variant="primary" size="md" showArrow>
            Not sure which tier? Book a demo
          </Button>
        </div>
      </div>
    </section>
  )
}
