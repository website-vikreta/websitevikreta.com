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
  cta: string
  highlighted?: boolean
}

const PACKAGES: PackageTier[] = [
  {
    name: 'WA Starter',
    price: 'From ₹11,250 / quarter',
    description: 'CRM, WhatsApp channel, and lead management for teams getting started.',
    cta: 'Ask about Starter',
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
    cta: 'Book a platform demo',
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
    revealFadeUp('.packages-intro', { y: 20, trigger: scope.current })
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
      className="scroll-mt-32 py-16 md:py-20"
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
          <p className="packages-intro mt-6 text-body-lg leading-relaxed text-(--color-text-muted)">
            Platform subscription below. Meta per-message charges (Utility and
            Marketing) are billed separately based on usage.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          {PACKAGES.map(({ name, price, description, features, cta, highlighted }) => (
            <article
              key={name}
              className={`package-card relative flex flex-col border bg-(--color-surface) p-6 md:p-8 ${
                highlighted
                  ? 'border-(--color-text)'
                  : 'border-(--color-border)'
              }`}
            >
              {highlighted && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1.5 bg-(--color-accent)"
                />
              )}
              {highlighted && (
                <p className="mb-4 text-sm text-(--color-text-muted)">
                  Most stores pick this
                </p>
              )}
              <h3 className="font-sans text-2xl font-bold text-(--color-text) sm:text-3xl">
                {name}
              </h3>
              <p className="mt-3 text-2xl font-bold tracking-tight text-(--color-text)">
                {price}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-(--color-text-muted)">
                {description}
              </p>
              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm leading-relaxed text-(--color-text-muted)"
                  >
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
              <div className="mt-8">
                <Button
                  href="#whatsapp-demo"
                  variant={highlighted ? 'primary' : 'ghost'}
                  size="md"
                  showArrow
                >
                  {cta}
                </Button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm text-(--color-text-faint) md:mt-14">
          Add-ons available: AI agents, Instagram and Facebook integration, custom
          integrations. One-time setup and onboarding quoted separately.
        </p>
      </div>
    </section>
  )
}
