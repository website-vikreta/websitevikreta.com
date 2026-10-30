'use client'

import { useRef } from 'react'
import { FOOTER_LINKS } from '@/config/footer-links'
import { Button } from '@/components/ui/Button'
import { AuditForm } from '@/components/ui/AuditForm'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

const WA_HREF = `${FOOTER_LINKS.social.find((l) => l.label === 'WhatsApp')!.href}?text=${encodeURIComponent('Hi, I want a demo of the WhatsApp platform for my store.')}`

const WHAT_HAPPENS = [
  'We look at your store: checkout friction, cart abandonment, and current recovery rate.',
  'We show you the platform set up with your brand on it.',
  'We tell you straight what is fixable and what WhatsApp will change.',
]

export default function ContactSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('.cta-heading',   { trigger: scope.current })
    revealFadeUp('.cta-list',     { y: 16, stagger: STAGGER.tight, delay: STAGGER.base, trigger: scope.current })
    revealFadeUp('.cta-form-card', { y: 30, delay: STAGGER.loose + STAGGER.base, trigger: scope.current })
  })

  return (
    <section
      ref={scope}
      id="whatsapp-demo"
      className="scroll-mt-32 py-16 md:py-20"
      style={{ borderTop: '1px solid var(--color-border)' }}
      aria-labelledby="cta-form-heading"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-20">

          {/* Left — what happens */}
          <div>
            <h2
              id="cta-form-heading"
              className="cta-heading text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
            >
              See the platform <span className="text-(--color-accent)">on your store.</span>
            </h2>
            <p className="cta-list mt-5 max-w-md text-body-lg leading-relaxed text-(--color-text-muted)">
              A 20-minute call with a real person, not a sales queue. Here is what you get:
            </p>

            <ol className="mt-8 space-y-5">
              {WHAT_HAPPENS.map((item, i) => (
                <li key={i} className="cta-list flex items-start gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-(--color-accent) text-sm font-bold text-(--color-text)">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-base leading-relaxed text-(--color-text-muted)">{item}</p>
                </li>
              ))}
            </ol>

            <div className="cta-list mt-9">
              <Button href={WA_HREF} variant="ghost" size="md">
                Or message us on WhatsApp
              </Button>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <div className="cta-form-card border border-(--color-border) bg-(--color-surface) p-6 md:p-10">
              <p className="mb-6 text-2xl font-bold leading-tight text-(--color-text)">Book a platform demo</p>
              <AuditForm
                formName="book_whatsapp_demo_inline"
                heading=""
                subjectPlaceholder="Your store URL or platform (Shopify, WooCommerce, custom)"
                messagePlaceholder="Monthly order volume, cart abandonment rate if you know it…"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
