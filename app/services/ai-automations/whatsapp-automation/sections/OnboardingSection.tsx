'use client'

import { useRef } from 'react'
import {
  FlaskConical,
  Handshake,
  Link2,
  Workflow,
  Store,
} from 'lucide-react'
import { revealFadeUp, revealLines, STAGGER, useGsapSection } from '@/lib/gsap/reveals'

const STEPS = [
  {
    step: '01',
    time: '2–4 Days',
    title: 'Connect & Verify',
    detail: 'Get your business connected and verification underway.',
    note: 'We guide you through registration, required documents, and verification.',
    icon: Link2,
  },
  {
    step: '02',
    time: '1–2 Days',
    title: 'Configure Your Store',
    detail: 'Make WhatsApp feel like a natural extension of your store.',
    note: 'We connect your setup, configure your store, and apply your brand.',
    icon: Store,
  },
  {
    step: '03',
    time: '2–4 Days',
    title: 'Build & Approve',
    detail: 'Your essential workflows, ready for review.',
    note: 'We build your automations and prepare the required message templates.',
    icon: Workflow,
  },
  {
    step: '04',
    time: '1–2 Days',
    title: 'Test & Launch',
    detail: 'Everything tested before your first message goes out.',
    note: 'We test the flows, get your sign-off, and launch when everything is ready.',
    icon: FlaskConical,
  },
  {
    step: '05',
    time: '1–2 Days',
    title: 'Handover & Support',
    detail: "You're live, and we're still here to help.",
    note: 'We walk you through the system and support you after launch.',
    icon: Handshake,
  },
]

export default function OnboardingSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#onboarding-heading', { trigger: scope.current })
    revealFadeUp('.onboarding-copy',   { y: 20,   trigger: scope.current })
    revealFadeUp('.journey-step', { y: 20, stagger: STAGGER.base, trigger: scope.current })
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

        <div className="onboarding-map">
          <p className="mb-8 text-sm text-(--color-text-muted)">The journey</p>
          {/* Mobile: dashed spine on the left. md+: cards zigzag and each links to the next with a dashed elbow arrow */}
          <ol className="relative pl-10 md:pl-0">
            <span aria-hidden className="absolute bottom-0 left-3 top-0 border-l border-dashed border-(--color-border-strong) md:hidden" />
            {STEPS.map(({ step, title, time, detail, note, icon: Icon }, i) => {
              const right = i % 2 === 1
              return (
                <li key={step} className="journey-step group relative mb-6 last:mb-0 md:mb-12">
                  <span aria-hidden className="absolute top-8 -left-[34px] h-3 w-3 border border-(--color-text) bg-(--color-accent) md:hidden" />
                  <div className={`flex border border-(--color-border) bg-(--color-surface) p-4 transition-colors duration-300 group-hover:border-(--color-border-strong) md:w-3/5 md:p-5 ${right ? 'md:ml-auto' : ''}`}>
                    <span className={`flex w-9 shrink-0 items-center justify-center text-xs font-semibold uppercase tracking-wider [writing-mode:vertical-rl] rotate-180 ${i % 2 ? 'bg-(--color-text) text-(--color-bg)' : 'bg-(--color-accent) text-(--color-bg)'}`}>
                      {time}
                    </span>
                    <div className="flex-1 pl-5">
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-9 w-9 items-center justify-center border border-(--color-border-strong) text-(--color-text-muted) transition-colors group-hover:text-(--color-text)">
                          <Icon size={18} strokeWidth={1.5} aria-hidden />
                        </span>
                        <span className="text-4xl font-bold leading-none tracking-tight text-(--color-accent)">{step}</span>
                      </div>
                      <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight text-(--color-text)">{title}</h3>
                      <p className="mt-2 text-base font-medium leading-relaxed text-(--color-text)">{detail}</p>
                      <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">{note}</p>
                    </div>
                  </div>
                  {i < STEPS.length - 1 && (
                    <span
                      aria-hidden
                      className={`absolute top-12 hidden h-[calc(100%-3rem+3rem)] w-[10%] border-t border-dashed border-(--color-border-strong) md:block ${
                        right
                          ? 'right-[60%] rounded-tl-3xl border-l'
                          : 'left-[60%] rounded-tr-3xl border-r'
                      }`}
                    >
                      <span className={`absolute -bottom-px h-2 w-2 rotate-45 border-b border-(--color-border-strong) ${right ? '-left-[5px] border-l' : '-right-[5px] border-r'}`} />
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
