'use client'

import { useRef } from 'react'
import { ArrowDown, Gauge, Receipt, ShieldAlert, Timer, UserPlus, Wallet } from 'lucide-react'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'
import WhatsAppPhoneShell from '../components/WhatsAppPhoneShell'

const CAUSES = [
  { cause: 'The final price feels higher than expected', fix: 'Show the full price early and remind them of the exact total', icon: Receipt },
  { cause: 'Customers have to create an account',        fix: 'Let them check out as guests and send a direct WhatsApp link', icon: UserPlus },
  { cause: 'Checkout takes too long',                    fix: 'Ask for fewer details and send them straight to checkout', icon: Timer },
  { cause: 'Their preferred payment option is missing',  fix: 'Put UPI, wallets, and COD first, with a payment link in WhatsApp', icon: Wallet },
  { cause: 'The checkout page loads too slowly',         fix: 'Speed up the page so customers can finish their order', icon: Gauge },
  { cause: 'Customers do not feel ready to pay',         fix: 'Show trust signals and confirm COD orders on WhatsApp', icon: ShieldAlert },
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
    badge: 'Marketing',
    badgeColor: '#b45309',
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

function RecoveryPhone({ messages }: { messages: MessageCard[] }) {
  return (
    <WhatsAppPhoneShell time="10:15" name="Kaya Wear" subtitle="Business account" avatarLetter="K">
      {messages.map((msg, i) => (
        <div key={i}>
          {/* Date/Time divider for context */}
          {i > 0 && (
            <div style={{ textAlign: 'center', margin: '8px 0', fontSize: '10px', color: '#666', background: 'rgba(255,255,255,0.6)', borderRadius: '4px', padding: '2px 8px', display: 'inline-block', position: 'relative', left: '50%', transform: 'translateX(-50%)' }}>
              {msg.timing} later
            </div>
          )}
          {/* Inbound bubble */}
          <div style={{
            maxWidth: '92%',
            borderRadius: '12px 12px 12px 3px',
            background: '#fff',
            padding: '10px 12px',
            fontSize: '12.5px',
            lineHeight: 1.55,
            color: '#121212',
            boxShadow: '0 1px 2px rgba(0,0,0,0.07)',
            marginBottom: i === messages.length - 1 ? '4px' : '0'
          }}>
            {msg.preview}

            {msg.hasOffer && (
              <div style={{
                marginTop: '8px', borderRadius: '6px',
                background: 'rgba(180,83,9,0.08)',
                border: '1px solid rgba(180,83,9,0.22)',
                padding: '6px 10px',
                fontSize: '11.5px', fontWeight: 600, color: '#92400e',
              }}>
                🏷 {msg.offerText}
              </div>
            )}

            <span style={{
              display: 'block', textAlign: 'right',
              fontFamily: 'ui-monospace, monospace',
              fontSize: '9.5px', color: '#a09890', marginTop: '5px',
            }}>
              {msg.clockTime}
            </span>
          </div>
        </div>
      ))}

      {/* CTA quick-reply button on the last message */}
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
    </WhatsAppPhoneShell>
  )
}

export default function CartRecoverySection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#cart-heading',  { trigger: scope.current })
    revealFadeUp('.cart-intro',   { y: 20, trigger: scope.current })
    revealFadeUp('.cart-cause',   { y: 16, stagger: STAGGER.tight, trigger: scope.current })
    revealFadeUp('.cart-msg',     { y: 20, stagger: STAGGER.base,  trigger: scope.current })
    revealFadeUp('.cart-phone',   { y: 30, trigger: scope.current })
  })

  return (
    <section ref={scope} id="cart-recovery" className="scroll-mt-32 bg-(--color-surface) py-16 md:py-20" aria-labelledby="cart-heading">
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
        <div className="mb-10 grid grid-cols-1 gap-px overflow-hidden border border-(--color-border) bg-(--color-border) md:mb-14 md:grid-cols-2 lg:grid-cols-3">
          {CAUSES.map(({ cause, fix, icon: Icon }) => (
            <div key={cause} className="cart-cause bg-(--color-surface) p-6 md:p-7">
              <span className="flex h-9 w-9 items-center justify-center border border-(--color-border-strong) text-(--color-accent)">
                <Icon size={16} strokeWidth={1.75} aria-hidden />
              </span>
              <p className="mt-4 text-base font-bold leading-snug text-(--color-text)">{cause}</p>
              <div className="mt-3 flex items-start gap-2">
                <ArrowDown size={14} strokeWidth={1.5} aria-hidden className="mt-0.5 shrink-0 text-(--color-text-faint)" />
                <p className="text-sm leading-relaxed text-(--color-text-muted)">{fix}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3-message sequence */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">

          <div className="cart-phone order-2 flex items-center justify-center lg:order-1">
            <RecoveryPhone messages={MESSAGES} />
          </div>

          <div className="order-1 flex flex-col justify-center lg:order-2">
            <h3 className="text-2xl font-bold tracking-tight text-(--color-text) md:text-3xl">
              Three messages. Three reasons to return.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-(--color-text-muted)">
              We start with a reminder, build confidence, and only then make one offer. No discount on message one.
            </p>
            
            <div className="mt-10 flex flex-col gap-6">
              {MESSAGES.map((msg) => (
                <div key={msg.timing} className="cart-msg flex items-start gap-4 border border-(--color-border) bg-(--color-bg-muted) p-5 md:p-6">
                  <div className="flex-1">
                    <p className="font-mono text-xs font-semibold tracking-widest text-(--color-text-faint)" style={{ marginBottom: '4px' }}>
                      {msg.timing}
                    </p>
                    <p className="text-base font-bold tracking-tight text-(--color-text)">{msg.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-(--color-text-muted)">{msg.purpose}</p>
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
              ))}
            </div>

            <p className="mt-8 text-sm text-(--color-text-muted)">
              Explicit WhatsApp opt-in required before any message is sent.
              Compliant with India&apos;s DPDP Act and Meta&apos;s WhatsApp Business policy.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}
