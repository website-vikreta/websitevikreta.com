'use client'

import { useRef } from 'react'
import { AuditForm } from '@/components/ui/AuditForm'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

const WHAT_HAPPENS = [
  'We look at your store — checkout friction, cart abandonment, current recovery rate.',
  'We show you what the platform looks like on your brand, not a generic demo.',
  'We give you a straight read on what is fixable and what WhatsApp will actually move.',
]

export default function ContactSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('.cta-heading',   { trigger: scope.current })
    revealFadeUp('.cta-list',     { y: 16, stagger: STAGGER.tight, delay: STAGGER.base, trigger: scope.current })
    revealFadeUp('.cta-form-card', { y: 24, delay: STAGGER.loose + STAGGER.base, trigger: scope.current })
  })

  return (
    <section
      ref={scope}
      id="whatsapp-demo"
      className="scroll-mt-32 py-20 md:py-28"
      style={{ borderTop: '1px solid var(--color-border)' }}
      aria-labelledby="cta-form-heading"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-20">

          {/* Left — what happens */}
          <div>
            <p className="text-meta-label mb-5 font-medium uppercase tracking-widest text-(--color-text-faint)">
              No commitment
            </p>
            <h2
              id="cta-form-heading"
              className="cta-heading text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
              style={{ marginBottom: '1.5rem' }}
            >
              See the platform on your store
            </h2>

            <ul className="space-y-4">
              {WHAT_HAPPENS.map((item, i) => (
                <li key={i} className="cta-list flex items-start gap-4">
                  <span
                    style={{
                      display: 'grid', placeItems: 'center',
                      height: '24px', width: '24px', flexShrink: 0,
                      borderRadius: '50%', border: '1.5px solid var(--color-border)',
                      fontSize: '11px', fontWeight: 700, color: 'var(--color-text-faint)',
                      marginTop: '1px',
                    }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-[15px] leading-relaxed text-(--color-text-muted)">{item}</p>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-(--color-text-faint)">
              Takes 20 minutes. Goes to a real person, not a sales queue.
            </p>
          </div>

          {/* Right — form */}
          <div>
            <div className="cta-form-card border border-(--color-border) bg-(--color-surface) p-6 md:p-8">
              <AuditForm
                formName="book_whatsapp_demo_inline"
                heading="Book a Platform Demo"
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
