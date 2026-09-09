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
import {
  revealDraw,
  revealFadeUp,
  revealLines,
  STAGGER,
  useGsapSection,
} from '@/lib/gsap/reveals'
import SnakePath, {
  type SnakeStep,
} from '../components/SnakePath'

const STEPS: SnakeStep[] = [
  {
    step: '01',
    title: 'Registration',
    detail: 'Create the account. We take it from there.',
    icon: ClipboardList,
  },
  {
    step: '02',
    title: 'Documents',
    detail: 'You send business papers. We file them.',
    icon: Files,
  },
  {
    step: '03',
    title: 'Verification',
    detail: 'We run Meta verification.',
    icon: ShieldCheck,
  },
  {
    step: '04',
    title: 'WhatsApp setup',
    detail: 'Official WhatsApp Business Account, ready.',
    icon: Smartphone,
  },
  {
    step: '05',
    title: 'Platform config',
    detail: 'Templates, assets, store wiring.',
    icon: SlidersHorizontal,
  },
  {
    step: '06',
    title: 'Branding',
    detail: 'Inbox and flows in your brand.',
    icon: Palette,
  },
  {
    step: '07',
    title: 'Automation setup',
    detail: 'Sales, support, and recovery flows.',
    icon: Waypoints,
  },
  {
    step: '08',
    title: 'Template approval',
    detail: 'We push templates through Meta.',
    icon: BadgeCheck,
  },
  {
    step: '09',
    title: 'Testing',
    detail: 'End-to-end before anyone sees it.',
    icon: ListChecks,
  },
  {
    step: '10',
    title: 'Client approval',
    detail: 'You sign off. Then we go.',
    icon: UserRoundCheck,
  },
  {
    step: '11',
    title: 'Go live',
    detail: 'The channel is on.',
    icon: Rocket,
  },
  {
    step: '12',
    title: 'Handover',
    detail: 'You run it. We stay on call.',
    icon: Handshake,
  },
]

export default function OnboardingSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#onboarding-heading', { trigger: scope.current })
    revealFadeUp('.onboarding-copy', { y: 20, trigger: scope.current })
    revealDraw('.onboarding-map .snake-wave', { trigger: scope.current })
    revealFadeUp('.onboarding-map .snake-node', {
      y: 16,
      stagger: STAGGER.tight,
      trigger: scope.current,
    })
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

        <div className="onboarding-map">
          <SnakePath
            steps={STEPS}
            rows={[5, 5, 2]}
            minWidthClass="min-w-[60rem]"
            ariaLabel="Twelve steps from registration to handover"
          />
        </div>
      </div>
    </section>
  )
}
