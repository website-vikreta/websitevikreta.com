'use client'

import { useRef, useEffect, useState } from 'react'
import { useGsapSection, revealLines, revealFadeUp, STAGGER } from '@/lib/gsap/reveals'
import {
  PhoneFrame,
  PhoneStatusBar,
  PHONE_INPUT_H,
  PHONE_BODY_H,
} from '../components/PhoneShell'
import { ChevronLeft, EllipsisVertical, Mic, Paperclip, Smile } from 'lucide-react'

// ─── Telegram chrome ──────────────────────────────────────────────────────────
const HEADER_H = 48

function TelegramHeader() {
  return (
    <div
      className="flex shrink-0 items-center gap-2.5 border-b border-white/[0.08] px-3"
      style={{ height: HEADER_H, background: '#17212b' }}
    >
      <ChevronLeft size={20} className="text-[#5288c1]" />
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[12px] font-bold text-white"
        style={{ background: '#5288c1' }}
      >
        M
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block text-[14px] font-semibold text-white">Meher</span>
        <span className="block text-[10.5px] text-[#708ea4]">bot · @MeherHRBot</span>
      </span>
      <EllipsisVertical size={17} className="text-[#708ea4]" />
    </div>
  )
}

function TelegramInputBar() {
  return (
    <div className="shrink-0 px-2 pt-1.5" style={{ height: PHONE_INPUT_H, background: '#17212b' }}>
      <div className="flex h-[34px] items-center gap-2">
        <span
          className="flex h-full flex-1 items-center gap-2 rounded-full px-3 text-[12px] text-[#708ea4]"
          style={{ background: '#232e3c' }}
        >
          <Smile size={15} className="text-[#708ea4]" />
          <span className="flex-1">Message</span>
          <Paperclip size={14} className="text-[#708ea4]" />
        </span>
        <span
          className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full text-white"
          style={{ background: '#5288c1' }}
        >
          <Mic size={16} />
        </span>
      </div>
    </div>
  )
}

// ─── Conversation ─────────────────────────────────────────────────────────────
type Bubble = { from: 'user' | 'bot'; text: string; time: string; buttons?: string[]; delay: number }

const CONVERSATION: Bubble[] = [
  { from: 'user', text: '@Meher generate offer letter for Neel Joglekar', time: '10:02', delay: 0 },
  { from: 'bot',  text: "Sure! I'll generate the offer letter for Neel Joglekar.", time: '10:02', delay: 700 },
  { from: 'bot',  text: '⏳ Checking the HR records...', time: '10:02', delay: 1600 },
  { from: 'bot',  text: '⏳ Generating the offer letter...', time: '10:02', delay: 2800 },
  { from: 'bot',  text: '✅ Done! Offer letter generated and emailed.', time: '10:03', delay: 4200,
    buttons: ['View Document', 'Generate Another'] },
]

function TelegramBubble({ bubble, visible }: { bubble: Bubble; visible: boolean }) {
  const isUser = bubble.from === 'user'
  return (
    <div
      className={`flex flex-col transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} ${isUser ? 'items-end' : 'items-start'}`}
    >
      <div
        className="max-w-[82%] rounded-[12px] px-3 py-2 text-[12px] leading-[1.5] text-white"
        style={{
          background: isUser ? '#5288c1' : '#182533',
          borderTopRightRadius: isUser ? 4 : 12,
          borderTopLeftRadius: isUser ? 12 : 4,
        }}
      >
        <p>{bubble.text}</p>
        <span className="mt-0.5 block text-right text-[9px] text-white/50">{bubble.time}</span>
      </div>
      {bubble.buttons && (
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {bubble.buttons.map((btn) => (
            <span
              key={btn}
              className="rounded-full border border-[#5288c1] px-2.5 py-1 text-[10px] font-medium text-[#5288c1]"
            >
              {btn}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

const CHAT_BODY_H = PHONE_BODY_H - PHONE_INPUT_H

function TelegramChatDemo() {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    let cancelled = false
    function run() {
      setVisibleCount(0)
      CONVERSATION.forEach((b, i) => {
        setTimeout(() => { if (!cancelled) setVisibleCount(i + 1) }, b.delay)
      })
      setTimeout(() => { if (!cancelled) run() }, CONVERSATION[CONVERSATION.length - 1].delay + 3500)
    }
    run()
    return () => { cancelled = true }
  }, [])

  return (
    <PhoneFrame>
      <PhoneStatusBar time="10:03" background="#17212b" color="#fff" bars="255,255,255" />
      <TelegramHeader />
      <div
        className="flex flex-col justify-end gap-2 overflow-hidden px-2.5 pb-3.5 pt-3"
        style={{ height: CHAT_BODY_H, background: '#0e1621' }}
      >
        {CONVERSATION.map((b, i) => (
          <TelegramBubble key={i} bubble={b} visible={i < visibleCount} />
        ))}
      </div>
      <TelegramInputBar />
    </PhoneFrame>
  )
}

// ─── Pipeline flow ────────────────────────────────────────────────────────────
const FLOW_STEPS = [
  { label: 'Application', sub: 'Sanity form' },
  { label: 'Central DB', sub: 'All types · Excel' },
  { label: 'Shortlisted', sub: 'HR updates status' },
  { label: 'Type Routing', sub: 'Make.com triggers' },
  { label: 'HR Round', sub: 'Type-specific sheet' },
  { label: 'Hired ✓', sub: 'Status transition', accent: true },
  { label: 'Employee File', sub: 'Docs · Bank · Payroll' },
]

// ─── Section ──────────────────────────────────────────────────────────────────
export default function MeherSpotlightSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#meher-heading', { trigger: scope.current })
    revealFadeUp('.meher-intro', { y: 20, trigger: scope.current })
    revealFadeUp('.flow-step', { y: 16, stagger: STAGGER.tight, trigger: scope.current })
    revealFadeUp('.meher-col', { y: 24, stagger: STAGGER.base, trigger: scope.current })
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="meher-heading">
      <div className="container">

        {/* Header */}
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2
            id="meher-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            Meher — HR on autopilot
          </h2>
          <p className="meher-intro mt-4 text-body-lg leading-relaxed text-(--color-text-muted)">
            From the moment an application lands in Sanity to the day an intern receives their
            completion certificate — Make.com handles the data movement, Meher handles the
            conversation.
          </p>
        </div>

        {/* Pipeline flow */}
        <div className="mb-12 overflow-x-auto">
          <div className="flex min-w-max items-start gap-0">
            {FLOW_STEPS.map((step, i) => (
              <div key={step.label} className="flow-step flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`px-3 py-1.5 text-center text-[12px] font-bold leading-tight ${
                      step.accent
                        ? 'bg-(--color-accent) text-(--color-text)'
                        : 'border border-(--color-border) bg-(--color-bg) text-(--color-text)'
                    }`}
                  >
                    {step.label}
                  </div>
                  <p className="max-w-[90px] text-center text-[10px] text-(--color-text-faint)">
                    {step.sub}
                  </p>
                </div>
                {i < FLOW_STEPS.length - 1 && (
                  <span aria-hidden className="mx-1.5 mb-5 text-(--color-text-faint)">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Two columns: Make.com video placeholder + Telegram phone demo */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">

          {/* Left — Make.com scenario video/screenshot */}
          <div className="meher-col flex flex-col gap-4">
            <div className="relative aspect-video w-full overflow-hidden border border-(--color-border) bg-(--color-bg-muted)">
              {/* ↓ Replace with a screen recording or screenshot of the Make.com Meher scenario */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-(--color-text-faint)">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
                  <rect x="1" y="1" width="42" height="42" rx="3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3"/>
                  {/* play triangle */}
                  <path d="M18 16l12 6-12 6V16z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
                <p className="text-xs font-medium uppercase tracking-widest">Video placeholder</p>
                <p className="max-w-[200px] text-center text-[11px]">
                  Screen recording: Make.com Meher HR scenario walkthrough
                </p>
              </div>
            </div>
            <p className="text-sm text-(--color-text-faint)">
              The Make.com scenario that powers Meher — application routing, status-triggered
              data movement, document generation, and email dispatch.
            </p>
          </div>

          {/* Right — Telegram phone demo */}
          <div className="meher-col flex flex-col gap-4">
            <div className="flex justify-center">
              <div className="w-full max-w-[280px]">
                <TelegramChatDemo />
              </div>
            </div>
            <p className="text-center text-sm text-(--color-text-faint) lg:text-left">
              HR team generates an offer letter by name — no intern IDs, no forms. Meher
              resolves the name, runs the workflow, emails the document.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
