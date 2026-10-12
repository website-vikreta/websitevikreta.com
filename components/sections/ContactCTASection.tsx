'use client'

import { useRef, type ReactNode } from 'react'
import { AuditForm } from '@/components/ui/AuditForm'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

interface ContactCTASectionProps {
  /** Anchor id for the section (e.g. for #book-a-call links), and the GA4 formName. */
  id: string
  heading: string
  subheading: ReactNode
  formHeading: string
  subjectPlaceholder?: string
  messagePlaceholder?: string
  /** Override the section's padding/background. Default matches the sitewide `py-16 md:py-20` standard. */
  className?: string
}

/**
 * Thin section wrapper (heading/subheading + card chrome) around the shared
 * `AuditForm` — same form component used by every service page's inline
 * ContactSection and the sitewide popup modal. This used to be its own
 * hand-rolled form (fields, validation, EmailJS send) with no phone field,
 * which had drifted out of sync with AuditForm's fields. Delegating to
 * AuditForm here means every "Book a Free Call" instance (about, work,
 * work/case-studies, work/[slug]) now has the same fields/validation as the
 * rest of the site, fixed once instead of four times.
 */
export function ContactCTASection({
  id,
  heading,
  subheading,
  formHeading,
  subjectPlaceholder = 'What do you need help with?',
  messagePlaceholder = "Describe what isn't working…",
  className = 'py-16 md:py-20',
}: ContactCTASectionProps) {
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
    <section ref={scope} id={id} className={className} aria-labelledby="cta-form-heading">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16 lg:items-start">

          <div>
            <h2
              id="cta-form-heading"
              className="cta-heading text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text) mb-6"
            >
              {heading}
            </h2>
            <p className="cta-sub text-body-lg leading-relaxed text-(--color-text-muted)">{subheading}</p>
          </div>

          <div className="cta-form-card bg-(--color-surface) border border-(--color-border) p-5 sm:p-6 md:p-8">
            <AuditForm
              formName={id}
              heading={formHeading}
              subjectPlaceholder={subjectPlaceholder}
              messagePlaceholder={messagePlaceholder}
            />
          </div>

        </div>
      </div>
    </section>
  )
}
