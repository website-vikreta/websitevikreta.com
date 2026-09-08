'use client'

import { useRef } from 'react'
import { TextLink } from '@/components/ui/TextLink'
import { AuditForm } from '@/components/ui/AuditForm'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'
import { WEB_DEV_CONTACT } from '../data'

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
      className="pt-32 pb-24 md:pt-40 md:pb-32"
      aria-labelledby="cta-form-heading"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-20">
          <div className="md:py-8">
            <h2
              id="cta-form-heading"
              className="cta-heading mb-6 text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
            >
              {WEB_DEV_CONTACT.heading}
            </h2>
            <p className="cta-sub mb-6 text-body-lg leading-relaxed text-(--color-text-muted)">
              {WEB_DEV_CONTACT.subhead}
            </p>

            <div className="cta-sub mb-4 md:mb-10">
              <TextLink href="https://wa.me/919970445198" arrow="diagonal" external>
                Or message us directly on WhatsApp
              </TextLink>
            </div>
          </div>

          <div>
            <div className="cta-form-card border border-(--color-border) bg-(--color-surface) p-5 sm:p-6 md:p-8">
              <AuditForm
                formName="web_development_quote"
                heading={WEB_DEV_CONTACT.formHeading}
                subjectPlaceholder="What do you need built?"
                messagePlaceholder="Tell us about your business and what you're trying to build…"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
