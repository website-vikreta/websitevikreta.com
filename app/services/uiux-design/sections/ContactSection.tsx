'use client'

import { useRef } from 'react'
import { AuditForm } from '@/components/ui/AuditForm'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'
import { UI_UX_CONTACT } from '../data'

export default function ContactSection() {
  const scope = useRef<HTMLElement>(null)

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
      id="get-quote"
      className="pt-16 pb-16 sm:pt-20 sm:pb-20 md:pt-28 md:pb-24 lg:pt-32 lg:pb-28"
      aria-labelledby="cta-form-heading"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-20">
          <div className="md:py-8">
            <h2
              id="cta-form-heading"
              className="cta-heading mb-6 text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
            >
              {UI_UX_CONTACT.heading}
            </h2>
            <p className="cta-sub text-body-lg leading-relaxed text-(--color-text-muted)">
              {UI_UX_CONTACT.subhead}
            </p>
          </div>

          <div>
            <div className="cta-form-card border border-(--color-border) bg-(--color-surface) p-5 sm:p-6 md:p-8">
              <AuditForm
                formName="book_uiux_call_inline"
                heading={UI_UX_CONTACT.formHeading}
                subjectPlaceholder="What flow or product needs UX work?"
                messagePlaceholder="Share a URL, analytics snippet, or where users drop off…"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
