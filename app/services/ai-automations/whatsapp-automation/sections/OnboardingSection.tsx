'use client'

import { useRef } from 'react'
import {
  revealLines,
  revealFadeUp,
  useGsapSection,
  STAGGER,
} from '@/lib/gsap/reveals'

const STEPS = [
  'Registration',
  'Documents',
  'Verification',
  'WhatsApp setup',
  'Platform config',
  'Branding',
  'Automation setup',
  'Template approval',
  'Testing',
  'Client approval',
  'Go live',
  'Handover',
]

export default function OnboardingSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#onboarding-heading', { trigger: scope.current })
    revealFadeUp('.onboarding-copy', { y: 20, trigger: scope.current })
    revealFadeUp('.onboarding-step', {
      y: 12,
      stagger: STAGGER.tight,
      trigger: scope.current,
    })
  })

  return (
    <section
      ref={scope}
      id="onboarding"
      className="py-16 md:py-20"
      aria-labelledby="onboarding-heading"
    >
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2
            id="onboarding-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            Live in 7 to 14 days. Here is exactly what happens.
          </h2>
          <p className="onboarding-copy mt-6 text-body-lg leading-relaxed text-(--color-text-muted)">
            We handle Meta verification, template approval, and store wiring. You
            provide brand assets and approvals. We do the rest.
          </p>
        </div>

        <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {STEPS.map((step, i) => (
            <li
              key={step}
              className="onboarding-step flex flex-col border border-(--color-border) bg-(--color-surface) p-4"
            >
              <span className="font-mono text-xs text-(--color-text-faint)">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="mt-2 text-sm font-medium leading-snug text-(--color-text)">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
