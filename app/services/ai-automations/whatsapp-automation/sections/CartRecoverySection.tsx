'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { ShieldCheck } from 'lucide-react'
import { revealLines, revealFadeUp, useGsapSection } from '@/lib/gsap/reveals'
import AbandonedCartDemo from '../components/AbandonedCartDemo'
import CheckoutHotspots from '../components/CheckoutHotspots'
import SolutionStep from '../components/SolutionStep'
import { ProofCard } from '../components/ProofCard'

type MessageCard = {
  timing: string
  clockTime: string
  label: string
  purpose: string
  badge: string
  preview: string
  hasOffer?: boolean
  offerText?: string
}

const MESSAGES: MessageCard[] = [
  {
    timing: '+15 min',
    clockTime: '10:15',
    label: 'Bring them back',
    purpose: 'A simple reminder while the cart is still fresh.',
    badge: 'Utility',
    preview: 'Hi Priya, you left something in your cart. Your Block Print Kurta (M) is still available. Tap to complete your order.',
  },
  {
    timing: '+4 hrs',
    clockTime: '14:00',
    label: 'Build confidence',
    purpose: 'Show that other customers are buying too.',
    badge: 'Marketing',
    preview: '12 people bought this kurta in the last 24 hours. Sizes are going fast. Your cart is saved. Complete your order now.',
  },
  {
    timing: '+24 hrs',
    clockTime: '10:00',
    label: 'Give one last reason',
    purpose: 'Make one clear offer before the cart expires.',
    badge: 'Marketing',
    preview: 'Final reminder. Use code SAVE10 for 10% off your order. This offer expires tonight at midnight.',
    hasOffer: true,
    offerText: 'SAVE10 · 10% off · Expires tonight',
  },
]

const AVATARS = ['Fiona_Li', 'Stacey_Bae', 'Ashutosh_Thokare']

export default function CartRecoverySection() {
  const scope = useRef<HTMLElement>(null)
  // Follows the phone: the message currently on screen is the one lit up in the timeline
  const [current, setCurrent] = useState(0)
  // Messages landed so far and whether the story is over: the proof cards around the phone follow it
  const [progress, setProgress] = useState({ messages: 0, done: false })
  const onProgress = useCallback((messages: number, done: boolean) => {
    setProgress((p) => (p.messages === messages && p.done === done ? p : { messages, done }))
  }, [])

  useGsapSection(scope, () => {
    // One reveal for the whole timeline: per-item reveals would pin an inline opacity that fights the highlight
    revealLines('#step-checkout', { trigger: scope.current })
    revealFadeUp('.checkout-intro', { y: 20, trigger: scope.current })
    revealFadeUp('.checkout-list', { y: 20, trigger: scope.current })
    revealFadeUp('.checkout-visual', { y: 30, trigger: scope.current })
    revealLines('#step-recovery', { trigger: scope.current })
    revealFadeUp('.recovery-intro', { y: 20, trigger: scope.current })
    revealFadeUp('.cart-msgs',    { y: 20, trigger: scope.current })
    revealFadeUp('.cart-phone',   { y: 30, trigger: scope.current })
  })

  return (
    <section ref={scope} id="cart-recovery" className="scroll-mt-32 pb-16 md:pb-20" aria-labelledby="step-checkout">
      <div className="container">

        <div className="mb-16 md:mb-20">
          <CheckoutHotspots />
        </div>

        {/* 3-message sequence */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">

          <div className="cart-phone order-2 flex items-center justify-center">
            <div className="relative h-[620px] w-[330px] sm:w-[680px] lg:max-xl:[zoom:0.82]">
              <div className="absolute left-1/2 top-8 hidden h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-(--color-bg-muted)/70 sm:block" />
              <div className="absolute left-1/2 top-0 w-[330px] -translate-x-1/2">
                <AbandonedCartDemo messages={MESSAGES} onMessage={setCurrent} onProgress={onProgress} />
              </div>
              <ProofCard side="right" top={80} show={progress.done} time="10:16">
                Cart recovered. Order placed.
              </ProofCard>
              <ProofCard side="left" top={270} delay={0.6} show={progress.messages >= 1} time="10:15">
                98% of our messages get opened.
              </ProofCard>
              <ProofCard side="right" top={400} delay={1.2} show={progress.messages >= 2} time="14:02">
                12 people bought this in 24 hrs
                <span className="mt-1.5 flex -space-x-2">
                  {AVATARS.map((a) => (
                    <span key={a} className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-(--color-text)">
                      <Image src={`/our-work/testimonials/${a}.webp`} alt="" fill sizes="28px" className="object-cover" />
                    </span>
                  ))}
                </span>
              </ProofCard>
            </div>
          </div>

          <div className="order-1 flex flex-col justify-center">
            <SolutionStep
              id="step-recovery"
              introClassName="recovery-intro"
              title={<>Recover abandoned carts <span className="text-(--color-accent)">that still leave.</span></>}
              intro="WhatsApp abandoned cart recovery sends three messages: a reminder, then social proof, then one offer. A discount in message one teaches buyers to wait for it."
            />

            {/* Timeline: the dot on the line follows the message on the phone */}
            <ol className="cart-msgs relative mt-8 pl-8">
              <span aria-hidden className="absolute bottom-6 left-[6px] top-6 w-px bg-(--color-border-strong)" />
              {MESSAGES.map((msg, i) => {
                const on = current === i
                return (
                  <li key={msg.timing} className={`relative py-4 transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-40'}`}>
                    <span
                      aria-hidden
                      className={`absolute -left-8 top-[1.6rem] h-3.5 w-3.5 rounded-full border-2 border-(--color-surface) transition-colors duration-500 ${on ? 'bg-(--color-accent)' : 'bg-(--color-border-strong)'}`}
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-(--color-bg-muted) px-2.5 py-0.5 font-mono text-xs font-semibold tracking-wider text-(--color-text)">{msg.timing}</span>
                      <span className="rounded-full border border-(--color-border) px-2 py-0.5 text-[11px] font-semibold text-(--color-text-muted)">{msg.badge}</span>
                    </div>
                    <p className="mt-2 text-xl font-bold leading-snug tracking-tight text-(--color-text)">{msg.label}</p>
                    <p className="mt-1 text-base leading-relaxed text-(--color-text-muted)">{msg.purpose}</p>
                  </li>
                )
              })}
            </ol>

            <div className="mt-6 flex items-start gap-3.5 border border-(--color-border) bg-(--color-surface) px-5 py-4">
              <ShieldCheck size={22} strokeWidth={1.75} aria-hidden className="mt-0.5 shrink-0 text-(--color-text)" />
              <p className="text-sm leading-relaxed text-(--color-text-muted)">
                <span className="block text-base font-semibold text-(--color-text)">We only message customers who said yes.</span>
                Every contact agrees to WhatsApp messages first, as India&apos;s data protection law (DPDP Act) and Meta&apos;s rules require.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
