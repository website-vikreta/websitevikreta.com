'use client'

import type { ReactNode } from 'react'
import { RevealText, RevealFade } from '@/components/ui/Reveal'
import { AuditForm } from '@/components/ui/AuditForm'

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
  return (
    <section id={id} className={className} aria-label={heading}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16 lg:items-start">

          <div>
            <RevealText as="h2" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text) mb-6">
              {heading}
            </RevealText>
            <RevealFade delay={0.1}>
              <p className="text-body-lg leading-relaxed text-(--color-text-muted)">{subheading}</p>
            </RevealFade>
          </div>

          <RevealFade delay={0.2}>
            <div className="bg-(--color-surface) border border-(--color-border) p-5 sm:p-6 md:p-8">
              <AuditForm
                formName={id}
                heading={formHeading}
                subjectPlaceholder={subjectPlaceholder}
                messagePlaceholder={messagePlaceholder}
              />
            </div>
          </RevealFade>

        </div>
      </div>
    </section>
  )
}
