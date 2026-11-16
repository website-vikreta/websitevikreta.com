'use client'

import { memo, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, CreditCard, IndianRupee, ListChecks, Lock, ShieldCheck, User, Zap, type LucideIcon } from 'lucide-react'
import { useInView } from './useInView'
import SolutionStep from './SolutionStep'
import { PHONE_BODY_H, PHONE_HEADER_H, PhoneFrame, PhoneStatusBar } from './WhatsAppPhoneShell'

/* The six reasons carts leave. Each one is a card on the right, a callout chip around the phone and a
   pin on the exact spot of the leaky checkout where it happens. They all light up together: the cycle
   runs on its own, and hovering or tapping a card, chip or pin jumps to it and pauses it. */
type Leak = { title: string; fix: string; Icon: LucideIcon; chip: string }

const LEAKS: Leak[] = [
  { title: 'Unexpected costs', fix: 'Show the full price early and remind them of the exact total.', Icon: IndianRupee, chip: 'Extra charges at the end?' },
  { title: 'Forced account creation', fix: 'Let them check out as guests and send a direct WhatsApp link.', Icon: User, chip: 'Create an account first?' },
  { title: 'Too many checkout steps', fix: 'Ask for fewer details and send them straight to checkout.', Icon: ListChecks, chip: 'Too many steps?' },
  { title: 'Missing payment options', fix: 'Put UPI, wallets and COD first, with a payment link in WhatsApp.', Icon: CreditCard, chip: 'Preferred payment option not available?' },
  { title: 'Slow checkout page', fix: 'Speed up the page so customers can finish their order.', Icon: Zap, chip: 'Page taking forever?' },
  { title: 'Low trust at payment', fix: 'Show trust signals and confirm COD orders on WhatsApp.', Icon: ShieldCheck, chip: 'Does this look safe?' },
]

const CYCLE_MS = 2400

function Pin({ n, active, onSelect, onHold }: { n: number; active: boolean; onSelect: () => void; onHold: (on: boolean) => void }) {
  return (
    <button
      type="button"
      onMouseEnter={() => { onSelect(); onHold(true) }}
      onMouseLeave={() => onHold(false)}
      onFocus={onSelect}
      onClick={onSelect}
      aria-label={LEAKS[n].title}
      className="absolute -right-1.5 -top-1.5 z-10 grid h-5 w-5 place-items-center"
    >
      {active && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#121212]/30" />}
      <span
        className={`relative block h-3.5 w-3.5 rounded-full border-2 transition-colors duration-200 ${
          active ? 'border-[#121212] bg-[#121212]' : 'border-[#a1a1aa] bg-white'
        }`}
      />
    </button>
  )
}

/* A block of the checkout screen; the active leak's block gets an outline so the eye lands on it */
function Spot({ n, active, onSelect, onHold, className = '', children }: { n: number; active: number; onSelect: (i: number) => void; onHold: (on: boolean) => void; className?: string; children: ReactNode }) {
  const on = active === n
  return (
    <div
      className={`relative rounded-lg transition-opacity duration-200 ${className} ${on ? 'opacity-100' : 'opacity-75'}`}
    >
      <span aria-hidden className={`pointer-events-none absolute inset-0 rounded-lg shadow-[0_0_0_2px_#121212] transition-opacity duration-200 ${on ? 'opacity-100' : 'opacity-0'}`} />
      <Pin n={n} active={on} onSelect={() => onSelect(n)} onHold={onHold} />
      {children}
    </div>
  )
}

const field = 'rounded-md border border-[#e4e4e7] bg-white px-2 py-1 text-[10px] text-[#a1a1aa]'

function CheckoutScreen({ active, onSelect, onHold }: { active: number; onSelect: (i: number) => void; onHold: (on: boolean) => void }) {
  return (
    <>
      <PhoneStatusBar time="10:02" background="#fff" />
      <div className="flex shrink-0 items-center gap-2 border-b border-[#efefef] bg-white px-3" style={{ height: PHONE_HEADER_H }}>
        <ChevronLeft size={18} className="text-[#111]" />
        <span className="flex-1 text-[13px] font-semibold text-[#111]">Checkout</span>
        <span className="text-[10px] tracking-[0.18em] text-[#71717a]">KAYA WEAR</span>
      </div>

      <div className="relative flex flex-col gap-2 overflow-hidden bg-[#fafafa] px-3 pb-7 pt-3" style={{ height: PHONE_BODY_H }}>
        {/* 5: still loading */}
        <Spot n={4} active={active} onSelect={onSelect} onHold={onHold} className="bg-white px-2.5 py-1.5">
          <span className="flex items-center justify-between text-[10px] text-[#71717a]">
            Loading payment options…
            <span className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-[#d4d4d8] border-t-[#52525b]" />
          </span>
          <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-[#efefef]">
            <span className="block h-full w-1/3 rounded-full bg-[#a1a1aa]" />
          </span>
        </Spot>

        {/* 2: forced account */}
        <Spot n={1} active={active} onSelect={onSelect} onHold={onHold} className="bg-white px-2.5 py-2">
          <span className="block text-[11px] font-semibold text-[#111]">Sign in to continue</span>
          <div className="mt-1.5 flex flex-col gap-1">
            <span className={field}>Email address</span>
            <span className={field}>Create a password</span>
          </div>
        </Spot>

        {/* 3: too many fields */}
        <Spot n={2} active={active} onSelect={onSelect} onHold={onHold} className="bg-white px-2.5 py-2">
          <span className="block text-[11px] font-semibold text-[#111]">Delivery details</span>
          <div className="mt-1.5 grid grid-cols-2 gap-1">
            {['Full name', 'Phone', 'Address', 'PIN code, city, state'].map((f) => (
              <span key={f} className={field}>{f}</span>
            ))}
          </div>
        </Spot>

        {/* 1: surprise costs */}
        <Spot n={0} active={active} onSelect={onSelect} onHold={onHold} className="bg-white px-2.5 py-2">
          {[['Block Print Kurta (M)', '₹1,299'], ['Shipping', '₹99'], ['COD charges', '₹49']].map(([k, v]) => (
            <span key={k} className="flex justify-between text-[10px] leading-[1.5] text-[#52525b]"><span>{k}</span><span>{v}</span></span>
          ))}
          <span className="mt-1 flex justify-between border-t border-[#efefef] pt-1 text-[11px] font-semibold text-[#111]"><span>Total</span><span>₹1,447</span></span>
        </Spot>

        {/* 4: missing payment options */}
        <Spot n={3} active={active} onSelect={onSelect} onHold={onHold} className="bg-white px-2.5 py-2">
          <span className="flex items-center gap-2 text-[10.5px] text-[#111]">
            <span className="grid h-3 w-3 place-items-center rounded-full border border-[#111]"><span className="h-1.5 w-1.5 rounded-full bg-[#111]" /></span>
            <CreditCard size={12} /> Credit / debit card only
          </span>
        </Spot>

        {/* 6: no trust */}
        <Spot n={5} active={active} onSelect={onSelect} onHold={onHold} className="mt-auto">
          <span className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#121212] text-[11.5px] font-semibold text-white">
            <Lock size={11} /> Place order · ₹1,447
          </span>
        </Spot>
      </div>
    </>
  )
}

/* Warning callouts beside the phone. They flag problems, so they are plain flat cards (not chat bubbles):
   white, thin border, square yellow icon tile; the active one gets a black border. Never over the phone.
   [leak index, side, top]. Each sits level with the spot on the checkout it is about. */
const CHIPS: [number, 'left' | 'right', number][] = [
  [1, 'left', 132],
  [0, 'left', 316],
  [3, 'left', 400],
  [4, 'right', 90],
  [2, 'right', 224],
  [5, 'right', 442],
]

function Chip({ i, side, top, active, onSelect, onHold }: { i: number; side: 'left' | 'right'; top: number; active: boolean; onSelect: (i: number) => void; onHold: (on: boolean) => void }) {
  const { chip, Icon } = LEAKS[i]
  return (
    <button
      type="button"
      onMouseEnter={() => { onSelect(i); onHold(true) }}
      onMouseLeave={() => onHold(false)}
      onFocus={() => onSelect(i)}
      onClick={() => onSelect(i)}
      aria-label={LEAKS[i].title}
      style={{ top }}
      className={`absolute z-20 flex w-[158px] items-center gap-2.5 rounded-[3px] border bg-(--color-surface) px-3 py-2.5 text-left text-[13px] font-medium leading-tight text-(--color-text) shadow-[0_1px_3px_rgba(20,18,15,0.06)] transition-colors duration-300 ${
        side === 'left' ? 'right-[calc(50%+170px)]' : 'left-[calc(50%+170px)]'
      } ${active ? 'border-(--color-text)' : 'border-(--color-border)'}`}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[2px] bg-(--color-accent) text-(--color-text)">
        <Icon size={16} strokeWidth={2} aria-hidden />
      </span>
      {chip}
    </button>
  )
}

function CheckoutHotspots() {
  const [wrapRef, inView] = useInView<HTMLDivElement>()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (paused || reduced.current || !inView) return
    const id = window.setTimeout(() => setActive((a) => (a + 1) % LEAKS.length), CYCLE_MS)
    return () => window.clearTimeout(id)
  }, [active, paused, inView])

  return (
    <div ref={wrapRef} className="grid grid-cols-1 gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-12">
      {/* Phone, callout chips and the product it is about to lose */}
      <div className="checkout-visual order-2 flex justify-center lg:order-1">
        <div className="relative h-[620px] w-[640px] lg:max-xl:[zoom:0.82] max-sm:[zoom:0.55]">
          <div className="absolute left-1/2 top-4 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-(--color-accent)/[0.08]" />
          <div className="absolute left-1/2 top-0 w-[300px] -translate-x-1/2">
            <PhoneFrame>
              <CheckoutScreen active={active} onSelect={setActive} onHold={setPaused} />
            </PhoneFrame>
          </div>

          {CHIPS.map(([i, side, top]) => (
            <Chip key={i} i={i} side={side} top={top} active={active === i} onSelect={setActive} onHold={setPaused} />
          ))}

        </div>
      </div>

      <div className="order-1 lg:order-2">
        <SolutionStep
          id="step-checkout"
          introClassName="checkout-intro"
          title={<>Fix the <span className="text-(--color-accent)">checkout.</span></>}
          intro="Most buyers leave for one of six reasons. Each one can be fixed before you send a single message."
        />

        <ol className="checkout-list mt-6">
          {LEAKS.map(({ title, fix }, i) => {
            const on = active === i
            return (
              <li key={title}>
                <button
                  type="button"
                  onMouseEnter={() => { setActive(i); setPaused(true) }}
                  onMouseLeave={() => setPaused(false)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={`block w-full py-2.5 text-left text-base leading-relaxed transition-opacity duration-300 ${
                    on ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <span className="font-bold text-(--color-text)">{title}.</span>{' '}
                  <span className="text-(--color-text-muted)">{fix}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

export default memo(CheckoutHotspots)
