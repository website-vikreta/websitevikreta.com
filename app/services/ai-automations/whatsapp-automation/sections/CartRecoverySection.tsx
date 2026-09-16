'use client'

import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

const CAUSES = [
  { cause: 'The final price feels higher than expected', fix: 'Show the full price early and remind them of the exact total' },
  { cause: 'Customers have to create an account',        fix: 'Let them check out as guests and send a direct WhatsApp link' },
  { cause: 'Checkout takes too long',                    fix: 'Ask for fewer details and send them straight to checkout' },
  { cause: 'Their preferred payment option is missing',  fix: 'Put UPI, wallets, and COD first, with a payment link in WhatsApp' },
  { cause: 'The checkout page loads too slowly',          fix: 'Speed up the page so customers can finish their order' },
  { cause: 'Customers do not feel ready to pay',          fix: 'Show trust signals and confirm COD orders on WhatsApp' },
]

type MessageCard = {
  timing: string
  clockTime: string
  label: string
  purpose: string
  badge: string
  badgeColor: string
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
    badgeColor: '#1a8a5a',
    preview: 'Hi Priya, you left something in your cart. Your Block Print Kurta (M) is still available. Tap to complete your order.',
  },
  {
    timing: '+4 hrs',
    clockTime: '14:00',
    label: 'Build confidence',
    purpose: 'Show that other customers are buying too.',
    badge: 'Utility',
    badgeColor: '#1a8a5a',
    preview: '12 people bought this kurta in the last 24 hours. Sizes are going fast. Your cart is saved. Complete your order now.',
  },
  {
    timing: '+24 hrs',
    clockTime: '10:00',
    label: 'Give one last reason',
    purpose: 'Make one clear offer before the cart expires.',
    badge: 'Marketing',
    badgeColor: '#b45309',
    preview: 'Final reminder. Use code SAVE10 for 10% off your order. This offer expires tonight at midnight.',
    hasOffer: true,
    offerText: 'SAVE10 · 10% off · Expires tonight',
  },
]

function RecoveryPhone({ clockTime, preview, hasOffer, offerText }: MessageCard) {
  return (
    /* Outer shell — dark, rounded like a real phone */
    <div style={{
      borderRadius: '2.2rem',
      background: '#1a1a1a',
      padding: '10px',
      boxShadow: '0 32px 64px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06) inset',
    }}>
      {/* Screen */}
      <div style={{ borderRadius: '1.65rem', background: '#efe7de', overflow: 'hidden' }}>

        {/* Status bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: '#008069', padding: '8px 14px 4px',
          fontFamily: 'ui-monospace, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.9)',
        }}>
          <span>{clockTime}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            {[8, 10, 12].map((h, i) => (
              <span key={i} style={{ display: 'inline-block', height: h, width: 3, borderRadius: 2, background: i < 2 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)' }} />
            ))}
            <span style={{ marginLeft: 4, display: 'inline-block', height: 9, width: 18, borderRadius: 3, border: '1px solid rgba(255,255,255,0.55)' }} />
          </span>
        </div>

        {/* Chat header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: '#008069', padding: '4px 12px 10px',
        }}>
          {/* Back arrow */}
          <svg viewBox="0 0 24 24" width={15} height={15} style={{ flexShrink: 0, color: '#fff', opacity: 0.85 }}>
            <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" />
          </svg>
          {/* Avatar */}
          <span style={{
            display: 'grid', height: 30, width: 30, flexShrink: 0,
            placeItems: 'center', borderRadius: '50%',
            background: '#c9a227', fontSize: '11px', fontWeight: 700, color: '#fff',
          }}>K</span>
          {/* Name */}
          <span>
            <span style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>
              Kaya Wear
            </span>
            <span style={{ display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.2 }}>
              Business account
            </span>
          </span>
        </div>

        {/* Messages area — fixed height, bottom-anchored */}
        <div style={{
          position: 'relative',
          minHeight: '220px',
          padding: '12px 10px 14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: '4px',
          background: 'radial-gradient(circle at 1px 1px, rgba(20,18,15,0.045) 1px, transparent 0) 0 0 / 4px 4px',
        }}>
          {/* Inbound bubble */}
          <div style={{
            maxWidth: '88%',
            borderRadius: '12px 12px 12px 3px',
            background: '#fff',
            padding: '10px 12px',
            fontSize: '12.5px',
            lineHeight: 1.55,
            color: '#121212',
            boxShadow: '0 1px 2px rgba(0,0,0,0.07)',
          }}>
            {preview}

            {hasOffer && (
              <div style={{
                marginTop: '8px', borderRadius: '6px',
                background: 'rgba(180,83,9,0.08)',
                border: '1px solid rgba(180,83,9,0.22)',
                padding: '6px 10px',
                fontSize: '11.5px', fontWeight: 600, color: '#92400e',
              }}>
                🏷 {offerText}
              </div>
            )}

            <span style={{
              display: 'block', textAlign: 'right',
              fontFamily: 'ui-monospace, monospace',
              fontSize: '9.5px', color: '#a09890', marginTop: '5px',
            }}>
              {clockTime}
            </span>
          </div>

          {/* CTA quick-reply button */}
          <div style={{
            borderRadius: '8px',
            background: '#fff',
            textAlign: 'center',
            padding: '9px 12px',
            fontSize: '12.5px',
            fontWeight: 500,
            color: '#027eb5',
            boxShadow: '0 1px 2px rgba(0,0,0,0.07)',
          }}>
            Complete my order →
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CartRecoverySection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#cart-heading',  { trigger: scope.current })
    revealFadeUp('.cart-intro',   { y: 20, trigger: scope.current })
    revealFadeUp('.cart-pair',    { y: 16, stagger: STAGGER.tight, trigger: scope.current })
    revealFadeUp('.cart-msg',     { y: 28, stagger: STAGGER.base,  trigger: scope.current })
  })

  return (
    <section ref={scope} id="cart-recovery" className="scroll-mt-32 py-16 md:py-20" aria-labelledby="cart-heading">
      <div className="container">

        {/* Heading */}
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2 id="cart-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            Fix checkout first. Recover the carts that still leave.
          </h2>
          <p className="cart-intro mt-5 text-body-lg leading-relaxed text-(--color-text-muted)">
            Six reasons customers leave their carts, and all of them are fixable. We improve checkout before sending a single
            message. Then we send three WhatsApp messages to the people who still leave. No discount
            on the first message. That teaches buyers to wait for one.
          </p>
        </div>

        {/* Cause / fix audit */}
        <div className="cart-pair mb-12 border-y border-(--color-border) md:mb-16">
          <div className="hidden grid-cols-[3rem_minmax(0,1fr)_2rem_minmax(0,1.15fr)] items-center gap-6 border-b border-(--color-border) py-3 text-meta-label font-medium uppercase tracking-widest text-(--color-text-faint) sm:grid md:gap-8">
            <span>Step</span>
            <span>What loses the sale</span>
            <span aria-hidden="true" />
            <span>What we change</span>
          </div>

          {CAUSES.map(({ cause, fix }, index) => (
            <div
              key={cause}
              className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 gap-y-4 border-b border-(--color-border) py-6 last:border-b-0 sm:grid-cols-[3rem_minmax(0,1fr)_2rem_minmax(0,1.15fr)] sm:items-center sm:gap-6 md:gap-8 md:py-7"
            >
              <span className="font-mono text-xs font-semibold text-(--color-accent)">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="mb-1 text-meta-label font-medium uppercase tracking-widest text-(--color-text-faint) sm:hidden">
                  Root cause
                </p>
                <p className="text-base font-bold leading-snug text-(--color-text)">{cause}</p>
              </div>
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden className="col-start-2 row-start-3 hidden text-(--color-text-faint) sm:col-start-3 sm:row-start-1 sm:block" />
              <div className="col-start-2 sm:col-start-4">
                <p className="mb-1 text-meta-label font-medium uppercase tracking-widest text-(--color-text-faint) sm:hidden">
                  Fix
                </p>
                <p className="text-sm leading-relaxed text-(--color-text-muted)">{fix}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3-message sequence */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-(--color-text) md:text-2xl">
              Three messages. Three reasons to return.
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-(--color-text-muted)">
              We start with a reminder, build confidence, and only then make one offer.
            </p>
          </div>
          <p className="hidden shrink-0 text-sm text-(--color-text-faint) sm:block">
            No discount on message one
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {MESSAGES.map((msg) => (
            <div key={msg.timing} className="cart-msg flex flex-col">
              {/* Phone — constrained on mobile so it doesn't stretch full-width */}
              <div className="mx-auto w-full max-w-[320px] sm:max-w-none">
                <RecoveryPhone {...msg} />
              </div>

              {/* Timing marker */}
              <div className="mt-5 flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs font-semibold tracking-widest" style={{ color: 'var(--color-accent)', marginBottom: '4px' }}>
                    {msg.timing}
                  </p>
                  <p className="text-sm font-bold tracking-tight text-(--color-text)">{msg.label}</p>
                  <p className="mt-1 max-w-[15rem] text-xs leading-relaxed text-(--color-text-muted)">{msg.purpose}</p>
                </div>
                <span style={{
                  flexShrink: 0,
                  borderRadius: '4px',
                  padding: '3px 9px',
                  fontSize: '11px',
                  fontWeight: 600,
                  background: `${msg.badgeColor}15`,
                  color: msg.badgeColor,
                  border: `1px solid ${msg.badgeColor}35`,
                }}>
                  {msg.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-(--color-text-faint) md:mt-12">
          Explicit WhatsApp opt-in required before any message is sent.
          Compliant with India&apos;s DPDP Act and Meta&apos;s WhatsApp Business policy.
        </p>
      </div>
    </section>
  )
}
