'use client'

import { useRef } from 'react'
import { ArrowLeft } from 'lucide-react'
import {
  revealLines,
  revealFadeUp,
  useGsapSection,
} from '@/lib/gsap/reveals'

const STEPS = [
  { step: '01', title: 'Registration' },
  { step: '02', title: 'Documents' },
  { step: '03', title: 'Verification' },
  { step: '04', title: 'WhatsApp setup' },
  { step: '05', title: 'Platform config' },
  { step: '06', title: 'Branding' },
  { step: '07', title: 'Automation setup' },
  { step: '08', title: 'Template approval' },
  { step: '09', title: 'Testing' },
  { step: '10', title: 'Client approval' },
  { step: '11', title: 'Go live' },
  { step: '12', title: 'Handover' },
]

const TOP = STEPS.slice(0, 6)
const BOTTOM = STEPS.slice(6).toReversed()

function StepNode({
  item,
  labelAbove,
}: {
  item: (typeof STEPS)[number]
  labelAbove: boolean
}) {
  const title = (
    <h3 className="font-sans text-sm font-medium leading-tight text-(--color-text)">
      <span className="sr-only">{`Step ${item.step}: `}</span>
      {item.title}
    </h3>
  )

  return (
    <li className="flex min-w-0 flex-col items-center px-1">
      <div className="flex min-h-20 w-full items-end justify-center pb-4 text-center">
        {labelAbove ? title : null}
      </div>
      <span
        aria-hidden="true"
        className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--color-accent) font-mono text-sm font-bold leading-none tracking-[-0.05em] text-(--color-text)"
      >
        {item.step}
      </span>
      <div className="flex min-h-20 w-full items-start justify-center pt-4 text-center">
        {labelAbove ? null : title}
      </div>
    </li>
  )
}

export default function OnboardingSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#onboarding-heading', { trigger: scope.current })
    revealFadeUp('.onboarding-copy', { y: 20, trigger: scope.current })
    revealFadeUp('.onboarding-map', { y: 24, trigger: scope.current })
  })

  return (
    <section
      ref={scope}
      id="onboarding"
      className="scroll-mt-32 py-16 md:py-20"
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

        <div className="onboarding-map overflow-x-auto pb-2">
          <div className="relative min-w-[56rem]">
            <div
              aria-hidden="true"
              className="absolute top-[7.375rem] right-[8.333%] left-[8.333%] h-4 -translate-y-1/2 bg-(--color-accent)"
            />
            <div
              aria-hidden="true"
              className="absolute top-[7.375rem] left-[91.667%] h-[17.75rem] w-4 -translate-x-1/2 bg-(--color-accent)"
            />
            <div
              aria-hidden="true"
              className="absolute top-[25.125rem] right-[8.333%] left-[8.333%] h-4 -translate-y-1/2 bg-(--color-accent)"
            />
            <span
              aria-hidden="true"
              className="absolute top-[25.125rem] left-[8.333%] z-10 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-(--color-text)"
            >
              <ArrowLeft size={14} strokeWidth={2} className="text-(--color-bg)" />
            </span>

            <ol className="grid grid-cols-6">
              {TOP.map((item) => (
                <StepNode key={item.step} item={item} labelAbove />
              ))}
            </ol>
            <div className="h-12" aria-hidden="true" />
            <ol className="grid grid-cols-6">
              {BOTTOM.map((item) => (
                <StepNode key={item.step} item={item} labelAbove={false} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
