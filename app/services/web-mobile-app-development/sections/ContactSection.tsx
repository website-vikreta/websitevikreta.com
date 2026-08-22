'use client'

import { useRef } from 'react'
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
      id="start-project"
      className="pt-16 pb-24 md:pt-20 md:pb-32"
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
              Let&rsquo;s Build the System You Need
            </h2>
            <p className="cta-sub text-body-lg text-(--color-text-muted) leading-relaxed mb-4 md:mb-10">
              Tell us what your team is duct-taping together right now. We&rsquo;ll give you a straight answer on what it takes to fix it.
            </p>
          </div>

          {/* Right — 60% */}
          <div>
            <div className="cta-form-card bg-(--color-surface) border border-(--color-border) p-5 sm:p-6 md:p-8">
              <AuditForm
                formName="book_project_call_inline"
                heading="Book a Free Project Call"
                subjectPlaceholder="What do you need built?"
                messagePlaceholder="Describe the CRM, portal, or app you need…"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
