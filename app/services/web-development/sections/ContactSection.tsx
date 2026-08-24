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
      id="get-quote"
      className="py-16 md:py-20"
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
              Let&rsquo;s Build Something That Converts
            </h2>
            <p className="cta-sub text-body-lg text-(--color-text-muted) leading-relaxed mb-6">
              Tell us about your business. We&rsquo;ll tell you honestly what it takes to get a fast, SEO-ready site live: timeline and cost, no pressure.
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
              <AuditForm
                formName="web_development_quote"
                heading="Get a Free Website Quote"
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
