'use client'

import { useRef } from 'react'
import { useGsapSection, revealLines, revealFadeUp, STAGGER } from '@/lib/gsap/reveals'

interface System {
  name: string
  tag: 'Live' | 'In Build'
  stack: string
  description: string
}

const SYSTEMS: System[] = [
  {
    name: 'Meher — HR Automation',
    tag: 'In Build',
    stack: 'Make.com · Telegram · Sanity · Excel',
    description:
      'End-to-end HR lifecycle: application intake, shortlisting, offer letters, documents, and payroll — orchestrated by Make.com, controlled from Telegram.',
  },
  {
    name: 'UGC & Content Pipeline',
    tag: 'In Build',
    stack: 'Make.com · AI Models · Social APIs',
    description:
      'Brief to publish-ready ad creative without a studio. Scripts, hooks, AI avatars, and bulk variations — scheduled and posted automatically.',
  },
  {
    name: 'Voice Agent',
    tag: 'In Build',
    stack: 'Make.com · Voice AI · Telephony',
    description:
      'Answers inbound calls, qualifies leads, books appointments, and logs outcomes to the CRM — no human on the line needed.',
  },
  {
    name: 'Proposal Writer',
    tag: 'In Build',
    stack: 'Make.com · GPT-4o · Google Docs',
    description:
      'A brief becomes a scoped, priced proposal in minutes. Generated from a form, reviewed by a human, sent.',
  },
  {
    name: 'WhatsApp Automation',
    tag: 'In Build',
    stack: 'Make.com · WhatsApp Business API',
    description:
      'Lead capture, cart recovery, customer support, and campaigns — running inside WhatsApp. The same product we sell to clients.',
  },
  {
    name: 'Content Engine',
    tag: 'In Build',
    stack: 'Make.com · Sanity · Social APIs',
    description:
      'Content calendar to scheduled post — blog, LinkedIn, newsletter — with one review step and zero manual copying.',
  },
]

const TAG_STYLES: Record<System['tag'], string> = {
  'Live':     'border border-(--color-text) text-(--color-text)',
  'In Build': 'border border-(--color-accent) text-(--color-text)',
}

export default function SystemsGridSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#systems-heading', { trigger: scope.current })
    revealFadeUp('.system-card', { y: 28, stagger: STAGGER.base, trigger: scope.current })
  })

  return (
    <section
      ref={scope}
      id="systems"
      className="py-16 md:py-20 bg-(--color-surface) scroll-mt-20"
      aria-labelledby="systems-heading"
    >
      <div className="container">
        <div className="mb-10 md:mb-14">
          <h2
            id="systems-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            Six systems. All running.
          </h2>
          <p className="mt-4 max-w-2xl text-body-lg text-(--color-text-muted) leading-relaxed">
            None of this is a concept deck. Every system below is actively in build or running.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px border border-(--color-border) bg-(--color-border) sm:grid-cols-2 lg:grid-cols-3">
          {SYSTEMS.map((sys) => (
            <div
              key={sys.name}
              className="system-card flex flex-col gap-4 bg-(--color-surface) p-6 md:p-8"
            >
              {/* Placeholder thumbnail — replace with screenshot/video of each system */}
              <div className="relative aspect-video w-full overflow-hidden bg-(--color-bg-muted) border border-(--color-border)">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-(--color-text-faint)">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
                    <rect x="0.75" y="0.75" width="26.5" height="26.5" rx="2" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2.5"/>
                    <path d="M11 14l3.5-2.5 3.5 2.5M14 11.5v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <p className="text-[10px] uppercase tracking-widest">{sys.name.split('—')[0].trim()} screenshot</p>
                </div>
              </div>

              {/* Header row */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[17px] font-bold leading-snug text-(--color-text)">
                  {sys.name}
                </h3>
                <span
                  className={`shrink-0 rounded-[2px] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${TAG_STYLES[sys.tag]}`}
                >
                  {sys.tag}
                </span>
              </div>

              {/* Stack */}
              <p className="text-[11px] font-medium uppercase tracking-widest text-(--color-text-faint)">
                {sys.stack}
              </p>

              {/* Description */}
              <p className="text-[15px] leading-relaxed text-(--color-text-muted)">
                {sys.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
