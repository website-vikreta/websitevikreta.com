'use client'

import { useRef } from 'react'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

const CAUSES = [
  { cause: 'Unexpected costs at checkout',    fix: 'All-in pricing shown early + recovery message with final total' },
  { cause: 'Forced account creation',          fix: 'Guest checkout default + one-tap recovery link in WhatsApp' },
  { cause: 'Long or complicated form',         fix: 'Field reduction + PIN autofill + checkout deep link in chat' },
  { cause: 'Limited payment options',          fix: 'UPI, wallets, COD first on mobile + payment link in message' },
  { cause: 'Slow page speed',                  fix: 'LCP audit. Target under 2.5 seconds.' },
  { cause: 'Trust hesitation at payment step', fix: 'Trust badges at checkout + COD double-confirm on WhatsApp' },
]

type MessageCard = {
  timing: string
  label: string
  badge: string
  badgeColor: string
  preview: string
  hasOffer?: boolean
  offerText?: string
}

const MESSAGES: MessageCard[] = [
  {
    timing: '+15 min',
    label: 'Plain reminder',
    badge: 'Utility',
    badgeColor: '#1a8a5a',
    preview: 'Hi Priya, you left something in your cart. Your Block Print Kurta (M) is still available. Tap to complete your order.',
  },
  {
    timing: '+4 hrs',
    label: 'Social proof',
    badge: 'Utility',
    badgeColor: '#1a8a5a',
    preview: '12 people bought this kurta in the last 24 hours. Sizes are going fast. Your cart is saved — complete your order now.',
  },
  {
    timing: '+24 hrs',
    label: 'Last chance offer',
    badge: 'Marketing',
    badgeColor: '#b45309',
    preview: 'Final reminder. Use code SAVE10 for 10% off your order. This offer expires tonight at midnight.',
    hasOffer: true,
    offerText: 'SAVE10 · 10% off · Expires tonight',
  },
]

export default function CartRecoverySection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#cart-heading', { trigger: scope.current })
    revealFadeUp('.cart-intro', { y: 20, trigger: scope.current })
    revealFadeUp('.cart-pair',  { y: 16, stagger: STAGGER.tight, trigger: scope.current })
    revealFadeUp('.cart-msg',   { y: 24, stagger: STAGGER.base,  trigger: scope.current })
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
            Six reasons carts die — all fixable. We tackle checkout friction before sending a single
            message. Then we run a three-step WhatsApp sequence on what still abandons. No discount
            on message one — that trains buyers to leave on purpose.
          </p>
        </div>

        {/* Cause/fix grid */}
        <div className="mb-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-border) md:mb-16 md:grid-cols-2">
          {CAUSES.map(({ cause, fix }) => (
            <div key={cause} className="cart-pair grid grid-cols-1 gap-3 bg-(--color-surface) p-6 sm:grid-cols-2 sm:gap-5 md:p-7">
              <div>
                <p className="text-meta-label mb-1.5 font-medium uppercase tracking-widest text-(--color-text-faint)">Root cause</p>
                <p className="text-sm font-medium leading-snug text-(--color-text)">{cause}</p>
              </div>
              <div>
                <p className="text-meta-label mb-1.5 font-medium uppercase tracking-widest text-(--color-text-faint)">Fix</p>
                <p className="text-sm leading-snug text-(--color-text-muted)">{fix}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3-message sequence */}
        <h3 className="mb-8 text-xl font-bold tracking-tight text-(--color-text) md:text-2xl">
          The 3-message recovery sequence
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {MESSAGES.map(({ timing, label, badge, badgeColor, preview, hasOffer, offerText }) => (
            <div key={timing} className="cart-msg flex flex-col">
              {/* Phone mockup */}
              <div
                style={{
                  borderRadius: '20px',
                  background: '#1a1a1a',
                  padding: '8px',
                  boxShadow: '0 20px 40px -15px rgba(0,0,0,0.35)',
                }}
              >
                <div style={{ borderRadius: '14px', background: '#efe7de', overflow: 'hidden' }}>
                  {/* Chat header */}
                  <div style={{ background: '#008069', padding: '10px 12px 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ display: 'grid', height: '28px', width: '28px', placeItems: 'center', borderRadius: '50%', background: '#c9a227', fontSize: '11px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>K</span>
                    <span>
                      <span style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>Kaya Wear</span>
                      <span style={{ display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.2 }}>Business account</span>
                    </span>
                  </div>
                  {/* Message bubble */}
                  <div style={{ padding: '12px 10px 14px' }}>
                    <div style={{ borderRadius: '12px 12px 12px 3px', background: '#fff', padding: '10px 12px', fontSize: '12.5px', lineHeight: 1.55, color: '#121212', boxShadow: '0 1px 2px rgba(0,0,0,0.07)' }}>
                      {preview}
                      {hasOffer && (
                        <div style={{ marginTop: '8px', borderRadius: '6px', background: 'rgba(180,83,9,0.08)', border: '1px solid rgba(180,83,9,0.2)', padding: '6px 10px', fontSize: '11.5px', fontWeight: 600, color: '#92400e' }}>
                          🏷 {offerText}
                        </div>
                      )}
                      <span style={{ display: 'block', textAlign: 'right', fontFamily: 'ui-monospace,monospace', fontSize: '9.5px', color: '#a09890', marginTop: '6px' }}>
                        {timing === '+15 min' ? '10:15' : timing === '+4 hrs' ? '14:00' : '10:00'}
                      </span>
                    </div>
                    {/* CTA button */}
                    <div style={{ marginTop: '4px', borderRadius: '8px', background: '#fff', textAlign: 'center', padding: '9px 12px', fontSize: '12.5px', fontWeight: 500, color: '#027eb5', boxShadow: '0 1px 2px rgba(0,0,0,0.07)' }}>
                      Complete my order →
                    </div>
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-(--color-text)">{label}</p>
                  <p className="mt-0.5 text-xs text-(--color-text-faint)">Sent {timing} after abandonment</p>
                </div>
                <span style={{ flexShrink: 0, borderRadius: '4px', padding: '3px 8px', fontSize: '11px', fontWeight: 600, background: `${badgeColor}18`, color: badgeColor, border: `1px solid ${badgeColor}30` }}>
                  {badge}
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
