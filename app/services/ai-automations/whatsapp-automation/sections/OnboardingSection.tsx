'use client'

import { useRef } from 'react'
import {
  ArrowRight,
  Check,
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
    detail: 'We run the WhatsApp BSP verification, which usually takes 2 to 3 days.',
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
    detail: 'We draft your templates, upload your brand assets, and connect your store.',
    icon: SlidersHorizontal,
  },
  {
    step: '06',
    title: 'Branding',
    detail: 'Your inbox and flows start speaking in your brand colours and voice.',
    icon: Palette,
  },
  {
    step: '07',
    title: 'Automation Build',
    detail: 'We wire up cart recovery, COD confirmation, and order updates.',
    icon: Waypoints,
  },
  {
    step: '08',
    title: 'Template Approval',
    detail: 'We submit your templates to Meta. Most clear within 24 to 48 hours.',
    icon: BadgeCheck,
  },
  {
    step: '09',
    title: 'Testing',
    detail: 'We test every flow end to end before anyone else sees it.',
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
    revealFadeUp('.journey-phase', { y: 16, stagger: STAGGER.tight, trigger: scope.current })
    revealFadeUp('.onboarding-responsibilities', { y: 20, trigger: scope.current })
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
            Live in <span className="text-(--color-accent)">7 to 14 days</span>. Here is exactly what happens.
          </h2>
          <p className="onboarding-copy mt-5 text-body-lg leading-relaxed text-(--color-text-muted)">
            We handle Meta verification, template drafting, store wiring, and
            testing. You provide brand assets and two sign-offs. That is the
            full ask on your side.
          </p>
        </div>

        <div className="onboarding-map">
          <p className="mb-5 text-sm text-(--color-text-muted)">
            The journey
          </p>
          <div className="grid grid-cols-1 border-y border-(--color-border) sm:grid-cols-2 lg:grid-cols-4">
            {PHASES.map((phase) => (
              <div
                key={phase.number}
                className="journey-phase border-b border-(--color-border) p-6 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0 lg:p-7"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-bold tracking-tight text-(--color-text)">{phase.title}</h3>
                  <span className="text-4xl font-bold leading-none tracking-tight text-(--color-accent)">{phase.number}</span>
                </div>
                <p className="mb-7 min-h-14 max-w-60 text-base leading-relaxed text-(--color-text-muted)">{phase.detail}</p>
                <ol className="space-y-5">
                  {phase.steps.map((item) => {
                    const Icon = item.icon
                    return (
                      <li key={item.step} className="flex gap-3">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-(--color-border-strong) text-(--color-text-muted)">
                          <Icon size={16} strokeWidth={1.5} />
                        </span>
                        <div>
                          <p className="text-base font-bold leading-tight text-(--color-text)">{item.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-(--color-text-muted)">{item.detail}</p>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>
            ))}
          </div>
        </div>

        {/* Responsibility split: a light card for the little you do, a black one for the rest */}
        <div className="onboarding-responsibilities mt-10 md:mt-14">
          <p className="mb-6 max-w-xl text-xl font-bold leading-tight tracking-tight text-(--color-text) md:text-2xl">
            You give us the access and approvals. We do the heavy lifting.
          </p>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
            <div className="border border-(--color-border) bg-(--color-surface) p-7 md:p-9">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-2xl font-bold tracking-tight text-(--color-text)">You provide</h3>
                <span className="text-sm text-(--color-text-muted)">4 things</span>
              </div>
              <ul className="mt-6 flex flex-col gap-4">
                {YOUR_PART.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-(--color-text)">
                    <ArrowRight size={16} strokeWidth={2} aria-hidden className="mt-1 shrink-0 text-(--color-text-faint)" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-(--color-text) p-7 text-white md:p-9">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-2xl font-bold tracking-tight">We handle</h3>
                <span className="text-sm text-white/55">End to end</span>
              </div>
              <ul className="mt-6 flex flex-col gap-4">
                {OUR_PART.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-white/90">
                    <Check size={16} strokeWidth={2.5} aria-hidden className="mt-1 shrink-0 text-[#25d366]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
