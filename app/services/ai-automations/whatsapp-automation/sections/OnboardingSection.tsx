'use client'

import { useRef } from 'react'
import { CheckCircle2, FileCheck, FlaskConical, LifeBuoy, MessageSquare, Rocket, ShieldCheck, ShoppingCart, Store, Users, Workflow, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { revealFadeUp, revealLines, STAGGER, useGsapSection } from '@/lib/gsap/reveals'

const STEPS = [
  {
    step: '01',
    icons: [ShieldCheck, FileCheck] as [LucideIcon, LucideIcon],
    time: '2–4 Days',
    title: 'Connect & Verify',
    detail: 'Get your business connected and verification underway.',
    note: 'We guide you through registration, required documents, and verification.',
  },
  {
    step: '02',
    icons: [Store, ShoppingCart] as [LucideIcon, LucideIcon],
    time: '1–2 Days',
    title: 'Configure Your Store',
    detail: 'Make WhatsApp feel like a natural extension of your store.',
    note: 'We connect your setup, configure your store, and apply your brand.',
  },
  {
    step: '03',
    icons: [Workflow, MessageSquare] as [LucideIcon, LucideIcon],
    time: '2–4 Days',
    title: 'Build & Approve',
    detail: 'Your essential workflows, ready for review.',
    note: 'We build your automations and prepare the required message templates.',
  },
  {
    step: '04',
    icons: [FlaskConical, CheckCircle2] as [LucideIcon, LucideIcon],
    time: '1–2 Days',
    title: 'Test & Launch',
    detail: 'Everything tested before your first message goes out.',
    note: 'We test the flows, get your sign-off, and launch when everything is ready.',
  },
  {
    step: '05',
    icons: [LifeBuoy, Users] as [LucideIcon, LucideIcon],
    time: '1–2 Days',
    title: 'Handover & Support',
    detail: "You're live, and we're still here to help.",
    note: 'We walk you through the system and support you after launch.',
  },
]

/* Timeline geometry (rem): height of one row, and where the line sits inside it */
const ROW_REM = 19
const LINE_REM = 4.5

/* The five stages plus the finish, as one list of stops (first icon of each pair only) */
const STOPS: { step: string; Icon: LucideIcon; time: string; title: string; detail: string; note: string; cta?: boolean }[] = [
  ...STEPS.map(({ icons: [Icon], ...rest }) => ({ ...rest, Icon })),
  { step: '06', Icon: Rocket, time: '', title: "You're live.", detail: 'Cart recovery, COD confirmation and order updates are running on your store.', note: '', cta: true },
]

export default function OnboardingSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#onboarding-heading', { trigger: scope.current })
    revealFadeUp('.onboarding-copy',   { y: 20,   trigger: scope.current })
    revealFadeUp('.onb-deco', { y: 0, trigger: scope.current })
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

        {/* Serpentine timeline. One list for every screen size (so the stages are in the page once, in order).
            Desktop: three rows, the line runs along a row and turns back at the right, then the left, with a
            yellow disc on each turn; two stops per row, icon above the line, node on it, text below.
            Phones: a plain vertical line. The line, turns and discs are decoration only. */}
        <div className="onboarding-map relative mx-auto max-w-4xl md:h-[57rem]" style={{ '--ly': `${LINE_REM}rem` } as React.CSSProperties}>
          <div aria-hidden className="onb-deco hidden md:block">
            <span className="absolute left-0 right-10 border-t-2 border-(--color-text)" style={{ top: `${LINE_REM}rem` }} />
            <span className="absolute left-10 right-10 border-t-2 border-(--color-text)" style={{ top: `${ROW_REM + LINE_REM}rem` }} />
            <span className="absolute left-10 border-t-2 border-(--color-text)" style={{ top: `${2 * ROW_REM + LINE_REM}rem`, right: 'calc(2.5rem + (100% - 5rem) * 0.25)' }} />
            <span className="absolute right-0 w-10 rounded-r-[40px] border-y-2 border-r-2 border-(--color-text)" style={{ top: `${LINE_REM}rem`, height: `${ROW_REM}rem` }} />
            <span className="absolute left-0 w-10 rounded-l-[40px] border-y-2 border-l-2 border-(--color-text)" style={{ top: `${ROW_REM + LINE_REM}rem`, height: `${ROW_REM}rem` }} />
            <span className="absolute right-0 grid h-20 w-20 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-(--color-accent)" style={{ top: `${ROW_REM / 2 + LINE_REM}rem` }}>
              <ShieldCheck size={34} strokeWidth={1.75} />
            </span>
            <span className="absolute left-0 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-(--color-accent)" style={{ top: `${ROW_REM * 1.5 + LINE_REM}rem` }}>
              <CheckCircle2 size={34} strokeWidth={1.75} />
            </span>
            <span className="absolute -left-1.5 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-(--color-text) bg-(--color-bg)" style={{ top: `${LINE_REM}rem` }} />
          </div>

          <ol
            className="relative border-l-2 border-(--color-text) pl-7 md:absolute md:inset-0 md:grid md:grid-cols-2 md:border-l-0 md:px-10 md:pl-10"
            style={{ gridTemplateRows: `repeat(3, ${ROW_REM}rem)` }}
          >
            {STOPS.map(({ step, Icon, time, title, detail, note, cta }) => (
              <li key={step} className="journey-step relative pb-9 last:pb-0 md:pb-0 md:last:pb-0">
                {/* icon: beside the line on phones, above the line on desktop */}
                <span aria-hidden className="absolute -left-[2.45rem] top-0 grid h-9 w-9 place-items-center rounded-full bg-(--color-accent) md:left-1/2 md:top-[calc(var(--ly)-3.75rem)] md:h-11 md:w-11 md:-translate-x-1/2">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                {/* node on the line (desktop) */}
                <span aria-hidden className={`absolute left-1/2 top-(--ly) hidden -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-(--color-text) bg-(--color-bg) md:block ${cta ? 'h-5 w-5 ring-4 ring-(--color-accent)' : 'h-3.5 w-3.5'}`} />
                <div className="md:mx-auto md:max-w-[16rem] md:pt-[calc(var(--ly)+1.25rem)] md:text-center">
                  <p className="text-base font-bold text-(--color-text-muted) md:text-xl md:leading-none md:text-(--color-text)">{Number(step)}.</p>
                  <h3 className="text-xl font-bold leading-snug tracking-tight text-(--color-text) md:mt-2 md:text-lg">{title}</h3>
                  <p className="mt-1.5 text-base font-medium leading-snug text-(--color-text) md:text-[15px]">{detail}</p>
                  {note && <p className="mt-1 text-base leading-snug text-(--color-text-muted) md:text-sm">{note}</p>}
                  {cta ? (
                    <Button href="#whatsapp-demo" variant="primary" size="sm" showArrow className="mt-3">Book a platform demo</Button>
                  ) : (
                    <span className="mt-3 inline-block bg-(--color-accent) px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-(--color-text)">{time}</span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
