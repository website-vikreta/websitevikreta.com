'use client'

import { useRef } from 'react'
import {
  BadgeCheck,
  ClipboardList,
  Files,
  Handshake,
  ListChecks,
  Palette,
  Rocket,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  UserRoundCheck,
  Waypoints,
} from 'lucide-react'
import { revealFadeUp, revealLines, STAGGER, useGsapSection } from '@/lib/gsap/reveals'

type JourneyStep = {
  step: string
  title: string
  detail: string
  icon: typeof ClipboardList
}

const STEPS: JourneyStep[] = [
  {
    step: '01',
    title: 'Registration',
    detail: 'You create the account. We take it from there.',
    icon: ClipboardList,
  },
  {
    step: '02',
    title: 'Documents',
    detail: 'Send your business registration papers. We file them.',
    icon: Files,
  },
  {
    step: '03',
    title: 'Meta Verification',
    detail: 'We run the WhatsApp BSP verification. Usually 2 to 3 days.',
    icon: ShieldCheck,
  },
  {
    step: '04',
    title: 'WhatsApp Setup',
    detail: 'Your official WhatsApp Business Account is live.',
    icon: Smartphone,
  },
  {
    step: '05',
    title: 'Platform Config',
    detail: 'Templates drafted, brand assets uploaded, store connected.',
    icon: SlidersHorizontal,
  },
  {
    step: '06',
    title: 'Branding',
    detail: 'Your inbox and flows in your brand colours and copy.',
    icon: Palette,
  },
  {
    step: '07',
    title: 'Automation Build',
    detail: 'Cart recovery, COD confirmation, and order updates all wired up.',
    icon: Waypoints,
  },
  {
    step: '08',
    title: 'Template Approval',
    detail: 'We submit templates to Meta. Most clear in 24 to 48 hours.',
    icon: BadgeCheck,
  },
  {
    step: '09',
    title: 'Testing',
    detail: 'Full end-to-end test of every flow before anyone sees it.',
    icon: ListChecks,
  },
  {
    step: '10',
    title: 'Your Sign-Off',
    detail: 'You review, request changes if needed, then approve.',
    icon: UserRoundCheck,
  },
  {
    step: '11',
    title: 'Go Live',
    detail: 'First WhatsApp messages go out to real customers.',
    icon: Rocket,
  },
  {
    step: '12',
    title: 'Handover',
    detail: 'You run it. We stay on call for the first 30 days.',
    icon: Handshake,
  },
]

const PHASES = [
  { number: '01', title: 'Connect', detail: 'Get the account and verification moving.', steps: STEPS.slice(0, 3) },
  { number: '02', title: 'Set up', detail: 'Make the platform yours and connect your store.', steps: STEPS.slice(3, 6) },
  { number: '03', title: 'Build', detail: 'Wire the flows and get every message approved.', steps: STEPS.slice(6, 9) },
  { number: '04', title: 'Launch', detail: 'Review, approve, and start sending.', steps: STEPS.slice(9, 12) },
]

const YOUR_PART = [
  'Business registration documents',
  'Your logo, colours, and message preferences',
  'Access to your Shopify or WooCommerce store',
  'Two quick approvals before launch',
]

const OUR_PART = [
  'Set up and verify your WhatsApp account',
  'Write and submit your message templates',
  'Connect your store and build the automations',
  'Test everything and support you for 30 days',
]

export default function OnboardingSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#onboarding-heading', { trigger: scope.current })
    revealFadeUp('.onboarding-copy',   { y: 20,   trigger: scope.current })
    revealFadeUp('.journey-phase', { y: 20, stagger: STAGGER.tight, trigger: scope.current })
  })

  return (
    <section
      ref={scope}
      id="onboarding"
      className="scroll-mt-32 py-16 md:py-20"
      aria-labelledby="onboarding-heading"
    >
      <div className="container">
        <div className="mb-10 grid grid-cols-1 gap-6 md:mb-14 md:grid-cols-[1fr_auto]">
          <div className="max-w-xl">
            <h2
              id="onboarding-heading"
              className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
            >
              Live in 7 to 14 days. Here is exactly what happens.
            </h2>
            <p className="onboarding-copy mt-5 text-body-lg leading-relaxed text-(--color-text-muted)">
              We handle Meta verification, template drafting, store wiring, and
              testing. You provide brand assets and two sign-offs. That is the
              full ask on your side.
            </p>
          </div>

          {/* Time callout */}
          <div
            className="flex shrink-0 flex-col items-center justify-center self-start border border-(--color-border) bg-(--color-surface) px-8 py-6 text-center"
          >
            <span className="text-h2 font-bold tracking-tight text-(--color-accent)" style={{ lineHeight: 1 }}>
              7 to 14
            </span>
            <span className="mt-1 text-sm text-(--color-text-muted)">days to go live</span>
          </div>
        </div>

        <div className="onboarding-map">
          <p className="mb-5 text-meta-label font-medium uppercase tracking-widest text-(--color-text-faint)">
            The journey
          </p>
          <div className="grid grid-cols-1 border-y border-(--color-border) sm:grid-cols-2 lg:grid-cols-4">
            {PHASES.map((phase) => (
              <div
                key={phase.number}
                className="journey-phase border-b border-(--color-border) p-6 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0 lg:p-7"
              >
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-meta-label font-medium uppercase tracking-widest text-(--color-text-faint)">
                      Phase {phase.number}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-(--color-text)">{phase.title}</h3>
                  </div>
                  <span className="text-4xl font-bold leading-none tracking-tight text-(--color-accent)">{phase.number}</span>
                </div>
                <p className="mb-7 max-w-60 text-sm leading-relaxed text-(--color-text-muted)">{phase.detail}</p>
                <ol className="space-y-5">
                  {phase.steps.map((item) => {
                    const Icon = item.icon
                    return (
                      <li key={item.step} className="flex gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-(--color-border-strong) text-(--color-text-faint)">
                          <Icon size={14} strokeWidth={1.5} />
                        </span>
                        <div>
                          <p className="text-sm font-bold leading-tight text-(--color-text)">
                            <span className="mr-1.5 font-mono text-xs font-normal text-(--color-text-faint)">{item.step}</span>
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-(--color-text-muted)">{item.detail}</p>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* Responsibility split */}
        <div className="onboarding-responsibilities mt-14 md:mt-20">
          <div className="mb-8 max-w-xl">
            <p className="text-meta-label mb-3 font-medium uppercase tracking-widest text-(--color-text-faint)">
              Your part is small
            </p>
            <p className="text-xl font-bold leading-tight tracking-tight text-(--color-text) md:text-2xl">
              You give us the access and approvals. We do the heavy lifting.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-(--color-border) pb-4">
                <h3 className="text-2xl font-bold tracking-tight text-(--color-text)">You provide</h3>
                <span className="text-meta-label font-medium uppercase tracking-widest text-(--color-text-faint)">4 things</span>
              </div>
              <ol className="divide-y divide-(--color-border)">
                {YOUR_PART.map((item, index) => (
                  <li key={item} className="flex gap-5 py-4 first:pt-0 last:pb-0">
                    <span className="font-mono text-xs font-semibold text-(--color-accent)">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-sm leading-relaxed text-(--color-text-muted)">{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative lg:border-l lg:border-(--color-border) lg:pl-16">
              <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-(--color-border) pb-4">
                <h3 className="text-2xl font-bold tracking-tight text-(--color-text)">We handle</h3>
                <span className="text-meta-label font-medium uppercase tracking-widest text-(--color-text-faint)">End to end</span>
              </div>
              <ol className="divide-y divide-(--color-border)">
                {OUR_PART.map((item, index) => (
                  <li key={item} className="flex gap-5 py-4 first:pt-0 last:pb-0">
                    <span className="font-mono text-xs font-semibold text-(--color-text-faint)">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-sm leading-relaxed text-(--color-text-muted)">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
