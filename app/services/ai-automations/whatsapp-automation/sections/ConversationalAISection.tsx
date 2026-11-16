'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { List } from 'lucide-react'
import { revealLines, revealFadeUp, useGsapSection } from '@/lib/gsap/reveals'
import WhatsAppPhoneShell, { Ticks } from '../components/WhatsAppPhoneShell'
import SolutionStep from '../components/SolutionStep'
import { useInView } from '../components/useInView'

const BENEFITS = [
  { title: 'Replies in seconds, day or night', body: 'Your customers get instant answers, even at 2 AM.' },
  { title: 'Recognises products automatically', body: 'Understands product names, colours and sizes and opens the matching collection.' },
  { title: 'Saves the lead for your team', body: 'Passes complex questions to your team with full context.' },
]

const PRODUCTS = [
  { name: 'Haldi Yellow Kurta', price: '₹1,499', img: 'kurta-yellow' },
  { name: 'Sage Chikankari Kurta', price: '₹1,899', img: 'kurta-sage' },
  { name: 'Blush Pink Kurta', price: '₹1,699', img: 'kurta-pink' },
  { name: 'Teal Jacquard Kurta', price: '₹1,599', img: 'kurta-teal' },
]

/* The stage plays once, one phase each: 0 the customer asks and the bot answers, 1 the keyword opens
   the matching menu, 2 a teammate picks up the lead. Messages and cards stay once they have appeared. */
const PHASE_MS: Record<number, number> = { [-1]: 120, 0: 1100, 1: 1100, 2: 2400 }

const bubble = 'absolute rounded-xl bg-[#f7f7f7] text-[15px] leading-[1.6] text-[#121212] shadow-[0_10px_30px_-12px_rgba(20,18,15,0.28),0_1px_3px_rgba(20,18,15,0.08)]'
/* WhatsApp-style tail on the bubble's bottom-left corner */
const tail = 'before:absolute before:-left-2 before:bottom-3 before:border-y-[7px] before:border-r-[10px] before:border-y-transparent before:border-r-[#f7f7f7]'
/* Tailwind 4 moves with the separate `translate` and `scale` properties, so they have to be listed here too or they snap while only the opacity eases */
const ease = 'transition-[opacity,translate,scale] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none'
const shown = (on: boolean, hidden = 'translate-y-3 scale-95') => (on ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : `opacity-0 ${hidden}`)

const SOFT_SHADOW = 'shadow-[0_10px_30px_-12px_rgba(20,18,15,0.28),0_1px_3px_rgba(20,18,15,0.08)]'

/* The WhatsApp mark hanging on a thread from the top edge, swaying slightly (CSS only, runs on the compositor) */
function HangingLogo() {
  return (
    <div className="wa-sway absolute right-[26px] top-0 z-30 flex flex-col items-center">
      <span className="h-14 w-px bg-[#121212]/25" />
      <Image src="/services/whatsapp-automation/whatsapp.svg" alt="" width={64} height={64} className="h-16 w-16 drop-shadow-[0_6px_10px_rgba(20,18,15,0.18)]" />
    </div>
  )
}

/* Fixed 560px stage, zoomed down on phones so the overlaps stay exactly as designed */
function SalesStage({ phase }: { phase: number }) {
  return (
      <div aria-hidden className="relative h-[610px] w-[560px] max-sm:[zoom:0.62]">
        <div className="absolute left-1/2 top-[40px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#10B981]/[0.07]" />

        <div className="absolute left-1/2 top-0 w-[330px] -translate-x-1/2">
          <WhatsAppPhoneShell time="2:04" name="Kaya Wear" subtitle="Always online" avatarLetter="K">
            {null}
          </WhatsAppPhoneShell>
        </div>

        {/* The customer's keyword, 2 AM */}
        <div className={`absolute right-[128px] top-[112px] z-10 flex items-end gap-2 rounded-xl rounded-tr-sm bg-[#d9fdd3] px-3.5 py-2 text-[15px] text-[#121212] shadow-[0_1px_2px_rgba(20,18,15,0.18)] ${ease} ${shown(phase >= 0)}`}>
          kurta
          <span className="flex items-center gap-0.5 text-[10px] text-[#667781]">2:04 AM <Ticks /></span>
        </div>

        {/* Bot reply */}
        <div className={`${bubble} ${tail} left-6 top-[168px] z-10 w-[290px] px-4 pt-3 ${ease} delay-100 ${shown(phase >= 0)}`}>
          Hi! Here&apos;s our kurta collection. Tap below to browse.
          <span className="block text-right text-[10px] text-[#667781]">2:04 AM</span>
          <span className="mt-1 flex items-center gap-2 border-t border-[#e2e2e2] py-2.5 font-medium text-[#027eb5]">
            <List size={16} /> View collection
          </span>
        </div>

        {/* Product list, like WhatsApp's own catalogue sheet */}
        <div className={`absolute right-0 top-[250px] z-20 w-[262px] overflow-hidden rounded-xl bg-white ${SOFT_SHADOW} ${ease} ${shown(phase >= 1, 'translate-x-8')}`}>
          <div className="border-b border-[#e9edef] px-4 py-2.5 text-[#121212]">
            <span className="block text-[14px] font-semibold">Kurta collection</span>
            <span className="block text-[11.5px] text-[#667781]">Kaya Wear · 12 items</span>
          </div>
          <ul>
            {PRODUCTS.map(({ name, price, img }) => (
              <li key={name} className="flex items-center gap-3 border-b border-[#f0f2f5] px-3 py-2 last:border-b-0">
                <span className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-lg bg-[#f0f2f5]">
                  <Image src={`/services/whatsapp-automation/products/${img}.webp`} alt="" fill sizes="52px" loading="eager" className="object-cover" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[13.5px] font-medium text-[#121212]">{name}</span>
                  <span className="mt-0.5 block text-[12px] text-[#667781]">{price}</span>
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

        <HangingLogo />
      </div>
  )
}

export default function ConversationalAISection() {
  const scope = useRef<HTMLElement>(null)
  const [stageRef, inView] = useInView<HTMLDivElement>()
  // Furthest phase reached: messages and cards stay on stage once they have appeared
  const [reveal, setReveal] = useState(-1)
  const reduced = useRef(false)

  useGsapSection(scope, () => {
    revealLines('#solution-heading', { trigger: scope.current })
    revealLines('#ai-heading', { trigger: scope.current })
    revealFadeUp('.solution-intro', { y: 20, trigger: scope.current })
    revealFadeUp('.ai-intro', { y: 20, trigger: scope.current })
    // One reveal for the list: per-item reveals would pin an inline opacity that fights the highlight
    revealFadeUp('.ai-benefits', { y: 16, trigger: scope.current })
    revealFadeUp('.ai-phone', { y: 30, trigger: scope.current })
  })

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.current) {
      const id = window.setTimeout(() => setReveal(2), 0)
      return () => window.clearTimeout(id)
    }
  }, [])

  // Plays the stage once, then stops on the finished conversation
  useEffect(() => {
    if (reduced.current || !inView || reveal >= 2) return
    const id = window.setTimeout(() => setReveal((p) => p + 1), PHASE_MS[reveal])
    return () => window.clearTimeout(id)
  }, [reveal, inView])

  return (
    <section ref={scope} id="conversational-ai" className="scroll-mt-32 py-16 md:py-20" aria-labelledby="solution-heading">
      <div className="container">
        <div className="mb-4 max-w-2xl md:mb-6">
          <h2 id="solution-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            Plug every leak, from first question to delivered order.
          </h2>
          <p className="solution-intro mt-5 text-body-lg leading-relaxed text-(--color-text-muted)">
            One fix for each place a buyer can drop off, on your Shopify or WooCommerce store: the product question,
            the checkout, the abandoned cart and the COD parcel.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          
          {/* Content */}
          <div className="flex flex-col justify-center">
            <SolutionStep
              id="ai-heading"
              title={<>Answer questions <span className="text-(--color-accent)">at 2 AM.</span></>}
              introClassName="ai-intro"
              intro="A buyer with a size question at night buys from whoever replies first. Our AI WhatsApp chatbot answers, opens the right product and hands tricky questions to your team."
            />
            
            <ul className="ai-benefits mt-6">
              {BENEFITS.map(({ title, body }) => (
                <li key={title} className="py-3">
                  <h4 className="text-xl font-bold leading-snug tracking-tight text-(--color-text)">{title}</h4>
                  <p className="mt-2 text-base leading-relaxed text-(--color-text-muted)">{body}</p>
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
          <div ref={stageRef} className="ai-phone flex items-center justify-center">
            <SalesStage phase={reveal} />
          </div>
          
        </div>
      </div>
    </section>
  )
}
