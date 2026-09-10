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
import { revealDraw, revealFadeUp, revealLines, STAGGER, useGsapSection } from '@/lib/gsap/reveals'
import SnakePath, { type SnakeStep } from '../components/SnakePath'

const STEPS: SnakeStep[] = [
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

export default function OnboardingSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#onboarding-heading', { trigger: scope.current })
    revealFadeUp('.onboarding-copy',   { y: 20,   trigger: scope.current })
    revealDraw('.onboarding-map .snake-wave',  { trigger: scope.current })
    revealFadeUp('.onboarding-map .snake-node', { y: 16, stagger: STAGGER.tight, trigger: scope.current })
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
            className="flex shrink-0 flex-col items-center justify-center self-start rounded-2xl border border-(--color-border) bg-(--color-surface) px-8 py-6 text-center"
          >
            <span className="text-h2 font-bold tracking-tight text-(--color-accent)" style={{ lineHeight: 1 }}>
              7–14
            </span>
            <span className="mt-1 text-sm text-(--color-text-muted)">days to go live</span>
          </div>
        </div>

        <div className="onboarding-map">
          <SnakePath
            steps={STEPS}
            rows={[5, 5, 2]}
            minWidthClass="min-w-[60rem]"
            ariaLabel="Twelve-step onboarding from registration to handover"
          />
        </div>

        {/* Responsibility split */}
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-border) sm:grid-cols-2 md:mt-14">
          <div className="bg-(--color-surface) p-6 md:p-8">
            <p className="text-meta-label mb-3 font-medium uppercase tracking-widest text-(--color-text-faint)">You provide</p>
            <ul className="space-y-1.5 text-sm text-(--color-text-muted)">
              {['Business registration documents', 'Brand assets (logo, brand colours)', 'Store access (Shopify / WooCommerce)', 'Two approvals — templates and go-live'].map(i => (
                <li key={i} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 h-1 w-1 shrink-0 rounded-full bg-(--color-text-faint)" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-(--color-surface) p-6 md:p-8">
            <p className="text-meta-label mb-3 font-medium uppercase tracking-widest text-(--color-text-faint)">We handle</p>
            <ul className="space-y-1.5 text-sm text-(--color-text-muted)">
              {['Meta verification and WABA setup', 'All template drafting and submission', 'Automation build and store wiring', 'End-to-end testing before go-live', '30-day post-launch support'].map(i => (
                <li key={i} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 h-1 w-1 shrink-0 rounded-full bg-(--color-text-faint)" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
