'use client'
import { motion } from 'motion/react'
import type { ChatMessage } from '@/content/ai/types'
import { ease } from '../../ui'
import { HeroCopy } from '../HeroCopy'
import { Lg, heroCopy, useStage, type HeroProps } from './VoiceHero'
import './heroes-b.css'

const FALLBACK: ChatMessage[] = [
  { from: 'arjun', text: 'You left the Overnight Barrier Cream in your cart. Want me to hold it?' },
  { from: 'user', text: 'Does it ship to Canada?' },
  { from: 'arjun', text: 'Yes, 5 to 8 business days. Here is your cart.', attachment: { kind: 'card', label: 'Checkout link · 1 item', meta: 'Cart held for 24 hours' } },
]

export default function CommerceHero({ branch, product }: HeroProps) {
  const d = product?.page?.demo ?? branch.demo
  const msgs = d.kind === 'chat' ? d.messages : FALLBACK
  const at = (i: number) => 1800 + i * 1500
  const endT = at(msgs.length - 1) + 900
  const { ref, t, reduce } = useStage(endT, at(0))
  const shown = msgs.filter((_, i) => t >= at(i)).length
  const paid = t >= endT - 400 || reduce
  const cp = heroCopy(branch, product)
  return (
    <section ref={ref} className="hb-hero">
      <div className="wv-grid-bg" aria-hidden />
      <div className="wv-wrap hb-in">
        <div className="hb-copy"><HeroCopy {...cp} /></div>
        <div className="hb-stage hb-wa" aria-hidden>
          <motion.div className="hb-card hb-form" initial={false} animate={{ opacity: t >= 200 || reduce ? 1 : 0, x: t >= 200 || reduce ? 0 : -30 }} transition={{ duration: 0.6, ease }}>
            <b><Lg k="shopify" s={16} /> Cart</b>
            <span className="hb-field">Barrier Cream 50 ml</span>
            <span className="hb-field">Left at checkout</span>
            <span className="hb-field is-ta">1 item</span>
            <span className={`hb-send ${paid ? 'is-sent' : ''}`}>{paid ? 'Paid ✓' : 'Open'}</span>
          </motion.div>
          <span className="hb-beam"><i style={{ transform: `scaleX(${t > 1200 || reduce ? 1 : 0})` }} /></span>
          <div className="hb-phone">
            <div className="hb-phone-bar"><Lg k="whatsapp" s={18} /> AI assistant</div>
            <div className="hb-chat">
              {msgs.slice(Math.max(0, shown - 4), shown).map((m, k) => {
                const i = Math.max(0, shown - 4) + k
                return (
                  <motion.p key={i} className={`hb-b ${m.from === 'user' ? 'is-out' : 'is-in'}`} initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={reduce ? { duration: 0 } : { duration: 0.45, ease }}>
                    {m.text}
                    {m.attachment && <span className="hb-att"><Lg k="stripe" s={16} /> {m.attachment.label}</span>}
                  </motion.p>
                )
              })}
            </div>
          </div>
          <div className={`hb-chip hb-watch ${paid ? 'is-done' : ''}`}>{paid ? 'Order paid' : 'Cart left'}</div>
        </div>
      </div>
    </section>
  )
}
