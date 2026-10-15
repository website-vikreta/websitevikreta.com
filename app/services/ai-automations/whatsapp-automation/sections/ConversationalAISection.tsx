'use client'

import { useRef } from 'react'
import { ArrowLeft, ArrowRight, Check, ExternalLink, Footprints, List, Shirt, ShoppingBag } from 'lucide-react'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'
import WhatsAppPhoneShell from '../components/WhatsAppPhoneShell'

const BENEFITS = [
  'Answers product questions instantly, 24/7',
  'Recognizes hot keywords like product names and colours to start the right conversation',
  'Captures leads and hands off complex queries to your team',
]

const MENU = [
  { name: 'Cotton Kurta', price: '₹1,299', Icon: Shirt },
  { name: 'Linen Kurta', price: '₹1,599', Icon: Shirt },
  { name: 'Kolhapuri Chappal', price: '₹899', Icon: Footprints },
  { name: 'Tote Bag', price: '₹749', Icon: ShoppingBag },
]

const bubble = 'absolute rounded-xl bg-[#f7f7f7] text-[15px] leading-[1.6] text-[#121212] shadow-[0_18px_40px_-18px_rgba(20,18,15,0.4)]'
/* WhatsApp-style tail on the bubble's bottom-left corner */
const tail = 'before:absolute before:-left-2 before:bottom-3 before:border-y-[7px] before:border-r-[10px] before:border-y-transparent before:border-r-[#f7f7f7]'

/* Fixed 560px stage, zoomed down on phones so the overlaps stay exactly as designed */
function SalesStage() {
  return (
    <div aria-hidden className="relative h-[580px] w-[560px] max-sm:[zoom:0.62]">
      <div className="absolute left-1/2 top-0 w-[300px] -translate-x-1/2">
        <WhatsAppPhoneShell time="14:30" name="Kaya Wear" subtitle="Always online" avatarLetter="K" height={430}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderRadius: 999, background: '#fff', padding: '8px 14px', fontSize: 12, color: '#8696a0' }}>
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Message
          </div>
        </WhatsAppPhoneShell>
      </div>

      <div className={`${bubble} ${tail} left-6 top-[120px] z-10 w-[290px] px-4 pt-3`}>
        Hi! Here&apos;s our kurta collection. Tap below to browse.
        <span className="mt-2 flex items-center gap-2 border-t border-[#e2e2e2] py-2.5 font-medium text-[#027eb5]">
          <List size={16} /> View collection
        </span>
      </div>

      <div className={`${bubble} ${tail} bottom-[70px] left-0 z-10 w-[300px] px-4 pt-3`}>
        Dear Ananya,<br />
        Your order #4127 for 2 kurtas, amounting to ₹2,598, has been shipped!
        <span className="mt-2 block">You can track your order with the button below.</span>
        <span className="mt-2 flex items-center justify-center gap-2 border-t border-[#e2e2e2] py-2.5 font-medium text-[#027eb5]">
          <ExternalLink size={16} /> Track Shipment
        </span>
      </div>

      <div className="absolute right-0 top-[80px] z-20 w-[250px] overflow-hidden rounded-xl bg-white shadow-[0_24px_48px_-20px_rgba(20,18,15,0.45)]">
        <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-[15px] text-white">
          <ArrowLeft size={16} /> Menu
        </div>
        <ul className="flex flex-col gap-2.5 p-2.5">
          {MENU.map(({ name, price, Icon }) => (
            <li key={name} className="flex gap-2.5">
              <span className="grid h-[68px] w-[68px] shrink-0 place-items-center rounded-lg bg-[#f0f2f5] text-[#54656f]">
                <Icon size={28} strokeWidth={1.5} />
              </span>
              <span className="relative flex-1 rounded-lg bg-[#f0f2f5] px-3 py-2">
                <span className="block text-[13.5px] font-medium text-[#121212]">{name}</span>
                <span className="block text-[11px] text-[#54656f]">{price}</span>
                <ArrowRight size={16} className="absolute bottom-2 right-2 text-[#121212]" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function ConversationalAISection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#ai-heading', { trigger: scope.current })
    revealFadeUp('.ai-intro', { y: 20, trigger: scope.current })
    revealFadeUp('.ai-benefit', { y: 16, stagger: STAGGER.tight, trigger: scope.current })
    revealFadeUp('.ai-phone', { y: 30, trigger: scope.current })
  })

  return (
    <section ref={scope} id="conversational-ai" className="scroll-mt-32 border-y border-(--color-border) py-16 md:py-20" aria-labelledby="ai-heading">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
          
          {/* Content */}
          <div className="flex flex-col justify-center">
            <h2 id="ai-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
              A salesperson that never sleeps.
            </h2>
            <p className="ai-intro mt-5 max-w-xl text-body-lg leading-relaxed text-(--color-text-muted)">
              Stop losing customers because they had a quick question at 2 AM. Our AI handles inquiries, guides them to the right product, and acts as a concierge for your brand on autopilot.
            </p>
            
            <ul className="mt-10 flex flex-col gap-5">
              {BENEFITS.map((benefit, i) => (
                <li key={i} className="ai-benefit flex items-start gap-3">
                  <Check size={16} strokeWidth={2.5} aria-hidden className="mt-0.5 shrink-0 text-(--color-text)" />
                  <span className="text-base text-(--color-text)">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            <p className="ai-benefit mt-6 text-base leading-relaxed text-(--color-text-muted)">
              <span className="font-mono text-sm text-(--color-text-faint)">Example: </span>
              Someone types &quot;kurta&quot; or &quot;black t-shirts&quot;. The keyword is recognized and the right product conversation starts automatically, no typing a menu number.
            </p>
          </div>

          {/* Visual */}
          <div className="ai-phone flex items-center justify-center">
            <SalesStage />
          </div>
          
        </div>
      </div>
    </section>
  )
}
