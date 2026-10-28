'use client'

import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { AUDIT_MODAL_CONFIGS, useAuditModal } from '@/components/ui/AuditModalProvider'
import { revealFadeUp, revealLines, STAGGER, useGsapSection } from '@/lib/gsap/reveals'

const STEPS = [
  {
    step: '01',
    time: '2–4 Days',
    title: 'Connect & Verify',
    detail: 'Get your business connected and verification underway.',
    note: 'We guide you through registration, required documents, and verification.',
  },
  {
    step: '02',
    time: '1–2 Days',
    title: 'Configure Your Store',
    detail: 'Make WhatsApp feel like a natural extension of your store.',
    note: 'We connect your setup, configure your store, and apply your brand.',
  },
  {
    step: '03',
    time: '2–4 Days',
    title: 'Build & Approve',
    detail: 'Your essential workflows, ready for review.',
    note: 'We build your automations and prepare the required message templates.',
  },
  {
    step: '04',
    time: '1–2 Days',
    title: 'Test & Launch',
    detail: 'Everything tested before your first message goes out.',
    note: 'We test the flows, get your sign-off, and launch when everything is ready.',
  },
  {
    step: '05',
    time: '1–2 Days',
    title: 'Handover & Support',
    detail: "You're live, and we're still here to help.",
    note: 'We walk you through the system and support you after launch.',
  },
]

export default function OnboardingSection() {
  const { openAuditModal } = useAuditModal()
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#onboarding-heading', { trigger: scope.current })
    revealFadeUp('.onboarding-copy',   { y: 20,   trigger: scope.current })
    revealFadeUp('.journey-step', { y: 20, stagger: STAGGER.tight, trigger: scope.current })
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
            Live in <span className="text-(--color-accent)">7 to 14 days</span>. Here&apos;s the whole path.
          </h2>
          <p className="onboarding-copy mt-5 text-body-lg leading-relaxed text-(--color-text-muted)">
            We handle verification, templates, automation, and testing. You bring store access, your brand assets, and two sign-offs.
          </p>
        </div>

        {/* Label column on the left, a 3-up grid of ruled cells on the right. The sixth cell is the dark one and closes the path. */}
        <div className="onboarding-map grid grid-cols-1 gap-10 lg:grid-cols-[12rem_1fr] lg:gap-14">
          <div>
            <p className="text-base font-bold text-(--color-text)">The journey</p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-(--color-text-muted)">You bring</p>
            <ul className="mt-2 space-y-1.5 text-base text-(--color-text-muted)">
              {['Store access', 'Brand assets', 'Two sign-offs'].map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <ol className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-14">
            {STEPS.map(({ step, time, title, detail, note }) => (
              <li key={step} className="journey-step flex lg:min-h-[17rem] flex-col border-t border-(--color-text) px-1 pb-2 pt-6 sm:px-0 lg:px-6">
                <h3 className="text-2xl font-bold leading-snug tracking-tight text-(--color-text)">{title}</h3>
                <p className="mt-3 text-base font-medium leading-relaxed text-(--color-text)">{detail}</p>
                <p className="mt-2 text-base leading-relaxed text-(--color-text-muted)">{note}</p>
                <span className="mt-auto self-start bg-(--color-accent) px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-(--color-text)">
                  {time}
                </span>
              </li>
            ))}

            <li className="journey-step flex lg:min-h-[17rem] flex-col bg-(--color-text) p-6 text-(--color-bg) lg:p-7">
              <h3 className="text-2xl font-bold leading-snug tracking-tight">You&apos;re live.</h3>
              <p className="mt-3 text-base leading-relaxed text-(--color-bg)/75">
                Cart recovery, COD confirmation and order updates are running on your store.
              </p>
              <a
                href="#whatsapp-demo"
                onClick={(e) => {
                  e.preventDefault()
                  openAuditModal(AUDIT_MODAL_CONFIGS['#whatsapp-demo'])
                }}
                aria-label="Book a platform demo"
                className="mt-auto grid h-10 w-10 place-items-center self-start bg-[#25d366] text-white transition-transform duration-300 hover:translate-x-1"
              >
                <ArrowRight size={18} strokeWidth={2.25} aria-hidden />
              </a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  )
}
