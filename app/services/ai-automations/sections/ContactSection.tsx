'use client'

import { useRef } from 'react'
import { TextLink } from '@/components/ui/TextLink'
import { AuditForm } from '@/components/ui/AuditForm'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

export default function ContactSection() {
  const scope = useRef<HTMLElement>(null)

  // Entrance: left column (heading masked lines + sub fade-up) → form card → field rows, tight cascade.
  useGsapSection(scope, () => {
    revealLines('.cta-heading', { trigger: scope.current })
    revealFadeUp('.cta-sub', { y: 20, delay: STAGGER.loose, trigger: scope.current })
    revealFadeUp('.cta-form-card', { y: 24, delay: STAGGER.loose + STAGGER.base, trigger: scope.current })
    revealFadeUp('.cta-field-row', {
      y: 16,
      stagger: STAGGER.tight,
      delay: STAGGER.loose + STAGGER.base * 2,
      trigger: scope.current,
    })
  })

  return (
    <section
      ref={scope}
      id="book-audit"
      className="pt-32 pb-24 md:pt-40 md:pb-32"
      aria-labelledby="cta-form-heading"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 lg:items-start">

          {/* Left — 40% */}
          <div className='md:py-8'>
            <h2
              id="cta-form-heading"
              className="cta-heading text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text) mb-6"
            >
              Find the hours you&apos;re losing every week
            </h2>
            <p className="cta-sub text-body-lg text-(--color-text-muted) leading-relaxed mb-6">
              Book a free audit. We&apos;ll tell you honestly whether automation is worth it for your process, before you spend a dollar.
            </p>

            {/* Lower-friction second path for visitors who won't fill a form. */}
            <div className="cta-sub mb-4 md:mb-10">
              <TextLink href="https://wa.me/919970445198" arrow="diagonal" external>
                Or message us directly on WhatsApp
              </TextLink>
            </div>
          </div>

          {/* Right — 60% */}
          <div>
            <div className="cta-form-card bg-(--color-surface) border border-(--color-border) p-5 sm:p-6 md:p-8">
              <AuditForm formName="book_audit_inline" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
