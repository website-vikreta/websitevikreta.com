'use client'

import { useRef } from 'react'
import { AuditForm } from '@/components/ui/AuditForm'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

export default function ContactSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('.cta-heading', { trigger: scope.current })
    revealFadeUp('.cta-sub', { y: 20, delay: STAGGER.loose, trigger: scope.current })
    revealFadeUp('.cta-form-card', {
      y: 24,
      delay: STAGGER.loose + STAGGER.base,
      trigger: scope.current,
    })
  })

  return (
    <section
      ref={scope}
      id="whatsapp-demo"
      className="pt-16 pb-24 md:pt-20 md:pb-32"
      aria-labelledby="cta-form-heading"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-20">
          <div className="md:py-8">
            <h2
              id="cta-form-heading"
              className="cta-heading mb-6 text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
            >
              See the platform on your store
            </h2>
            <p className="cta-sub text-body-lg leading-relaxed text-(--color-text-muted)">
              Tell us your store URL and monthly order volume. We will show you
              what cart recovery, COD confirmation, and order updates look like
              on your brand — no commitment.
            </p>
          </div>

          <div>
            <div className="cta-form-card border border-(--color-border) bg-(--color-surface) p-5 sm:p-6 md:p-8">
              <AuditForm
                formName="book_whatsapp_demo_inline"
                heading="Book a Platform Demo"
                subjectPlaceholder="Your store URL or platform (Shopify, WooCommerce, custom)"
                messagePlaceholder="Monthly order volume, current cart abandonment challenges…"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
