'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Footprints, List, Shirt, ShoppingBag } from 'lucide-react'
import { revealLines, revealFadeUp, useGsapSection } from '@/lib/gsap/reveals'
import WhatsAppPhoneShell, { Ticks } from '../components/WhatsAppPhoneShell'

const BENEFITS = [
  'Answers product questions at any hour',
  'Spots product names and colours and opens the matching collection',
  'Saves the lead and hands hard questions to your team',
]

const MENU = [
  { name: 'Cotton Kurta', price: '₹1,299', Icon: Shirt },
  { name: 'Linen Kurta', price: '₹1,599', Icon: Shirt },
  { name: 'Kolhapuri Chappal', price: '₹899', Icon: Footprints },
  { name: 'Tote Bag', price: '₹749', Icon: ShoppingBag },
]

/* The stage plays the three benefits in order, one phase each: -1 resets, 0 the customer asks and
   the bot answers, 1 the keyword opens the matching menu, 2 a teammate picks up the lead */
const PHASE_MS: Record<number, number> = { [-1]: 450, 0: 2600, 1: 2600, 2: 3400 }

const bubble = 'absolute rounded-xl bg-[#f7f7f7] text-[15px] leading-[1.6] text-[#121212] shadow-[0_18px_40px_-18px_rgba(20,18,15,0.4)]'
/* WhatsApp-style tail on the bubble's bottom-left corner */
const tail = 'before:absolute before:-left-2 before:bottom-3 before:border-y-[7px] before:border-r-[10px] before:border-y-transparent before:border-r-[#f7f7f7]'
const ease = 'transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]'
const shown = (on: boolean, hidden = 'translate-y-3 scale-95') => (on ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : `opacity-0 ${hidden}`)

/* Fixed 560px stage, zoomed down on phones so the overlaps stay exactly as designed */
function SalesStage({ phase }: { phase: number }) {
  return (
    <div aria-hidden className="relative h-[580px] w-[560px] max-sm:[zoom:0.62]">
      <div className="absolute left-1/2 top-0 w-[330px] -translate-x-1/2">
        <WhatsAppPhoneShell time="2:04" name="Kaya Wear" subtitle="Always online" avatarLetter="K">
          {null}
        </WhatsAppPhoneShell>
      </div>

      {/* The customer's keyword, 2 AM */}
      <div className={`absolute right-[128px] top-[112px] z-10 flex items-end gap-2 rounded-xl rounded-tr-sm bg-[#d9fdd3] px-3.5 py-2 text-[15px] text-[#121212] shadow-[0_12px_28px_-14px_rgba(20,18,15,0.4)] ${ease} ${shown(phase >= 0)}`}>
        kurta
        <span className="flex items-center gap-0.5 text-[10px] text-[#667781]">2:04 AM <Ticks /></span>
      </div>

      <div className={`${bubble} ${tail} left-6 top-[168px] z-10 w-[290px] px-4 pt-3 ${ease} delay-300 ${shown(phase >= 0)}`}>
        Hi! Here&apos;s our kurta collection. Tap below to browse.
        <span className="mt-2 flex items-center gap-2 border-t border-[#e2e2e2] py-2.5 font-medium text-[#027eb5]">
          <List size={16} /> View collection
        </span>
      </div>

      <div className={`absolute right-0 top-[236px] z-20 w-[250px] overflow-hidden rounded-xl bg-white shadow-[0_24px_48px_-20px_rgba(20,18,15,0.45)] ${ease} ${shown(phase >= 1, 'translate-x-8')}`}>
        <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-[15px] text-white">
          <ArrowLeft size={16} /> Menu
          <span className="ml-auto rounded-full bg-white/15 px-2 py-0.5 text-[11px]">keyword: kurta</span>
        </div>
        <ul className="flex flex-col gap-2 p-2.5">
          {MENU.map(({ name, price, Icon }) => (
            <li key={name} className="flex gap-2.5">
              <span className="grid h-[58px] w-[58px] shrink-0 place-items-center rounded-lg bg-[#f0f2f5] text-[#54656f]">
                <Icon size={24} strokeWidth={1.5} />
              </span>
              <span className="relative flex-1 rounded-lg bg-[#f0f2f5] px-3 py-2">
                <span className="block text-[13.5px] font-medium text-[#121212]">{name}</span>
                <span className="block text-[11px] text-[#54656f]">{price}</span>
                <ArrowRight size={15} className="absolute bottom-2 right-2 text-[#121212]" />
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hand-off: the question needs a person, so the lead goes to the team */}
      <div className={`${bubble} bottom-[44px] left-0 z-10 w-[296px] p-4 ${ease} ${shown(phase >= 2)}`}>
        <span className="flex items-center gap-2 text-[12.5px] text-[#667781]">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#c9a227] text-[11px] font-bold text-white">A</span>
          Aarti joined the chat
        </span>
        <span className="mt-2 block">Bulk order for 40 kurtas? I&apos;ll take it from here.</span>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#e7f6ec] px-2.5 py-1 text-[12px] font-semibold text-[#1a7a3a]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1a8a5a]" /> Lead saved to CRM
        </span>
      </div>
    </div>
  )
}

export default function ConversationalAISection() {
  const scope = useRef<HTMLElement>(null)
  const [phase, setPhase] = useState(-1)
  const [paused, setPaused] = useState(false)
  const reduced = useRef(false)

  useGsapSection(scope, () => {
    revealLines('#ai-heading', { trigger: scope.current })
    revealFadeUp('.ai-intro', { y: 20, trigger: scope.current })
    // One reveal for the list: per-item reveals would pin an inline opacity that fights the highlight
    revealFadeUp('.ai-benefits', { y: 16, trigger: scope.current })
    revealFadeUp('.ai-phone', { y: 30, trigger: scope.current })
  })

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.current) {
      const id = window.setTimeout(() => setPhase(2), 0)
      return () => window.clearTimeout(id)
    }
  }, [])

  useEffect(() => {
    if (paused || reduced.current) return
    const id = window.setTimeout(() => setPhase((p) => (p >= 2 ? -1 : p + 1)), PHASE_MS[phase])
    return () => window.clearTimeout(id)
  }, [phase, paused])

  return (
    <section ref={scope} id="conversational-ai" className="scroll-mt-32 py-16 md:py-20" aria-labelledby="ai-heading">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          
          {/* Content */}
          <div className="flex flex-col justify-center">
            <h2 id="ai-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
              Your store answers at 2 AM.
            </h2>
            <p className="ai-intro mt-5 max-w-xl text-body-lg leading-relaxed text-(--color-text-muted)">
              A buyer with a size question at night buys from whoever replies first. Our AI WhatsApp chatbot replies, opens the right product, and passes anything tricky to your team.
            </p>
            
            <ul className="ai-benefits mt-8">
              {BENEFITS.map((benefit, i) => (
                <li key={benefit}>
                  <button
                    type="button"
                    onMouseEnter={() => { setPhase(i); setPaused(true) }}
                    onMouseLeave={() => setPaused(false)}
                    onFocus={() => setPhase(i)}
                    onClick={() => setPhase(i)}
                    aria-pressed={phase === i}
                    className={`block w-full py-2.5 text-left text-lg font-bold leading-snug tracking-tight text-(--color-text) transition-opacity duration-300 ${
                      phase === i ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                    }`}
                  >
                    {benefit}
                  </button>
                </li>
              ))}
            </ul>

            <p className="ai-intro mt-6 border border-(--color-border) bg-(--color-surface) px-5 py-4 text-base leading-relaxed text-(--color-text-muted)">
              <span className="font-mono text-sm text-(--color-text-faint)">Example: </span>
              Someone types{' '}
              <span className="rounded-md bg-[#d9fdd3] px-1.5 py-0.5 text-[15px] text-[#121212]">kurta</span> or{' '}
              <span className="rounded-md bg-[#d9fdd3] px-1.5 py-0.5 text-[15px] text-[#121212]">black t-shirts</span>.
              The matching collection opens. Nobody types a menu number.
            </p>
          </div>

          {/* Visual */}
          <div className="ai-phone flex items-center justify-center lg:order-first">
            <SalesStage phase={phase} />
          </div>
          
        </div>
      </div>
    </section>
  )
}
