'use client'
import { motion } from 'motion/react'
import type { Branch } from '@/content/ai/types'
import { KineticTitle } from '../../ui'
import { Logo, useClock } from './kit-b'

const END = 9000
const STEPS = [
  { at: 800, label: 'Cart left', text: 'Barrier Cream, 50 ml, not paid', logo: 'shopify' },
  { at: 2600, label: '1 h later', text: 'WhatsApp reminder sent to an opted-in shopper', logo: 'whatsapp' },
  { at: 4600, label: 'Reply', text: 'Shopper asks: "Does it ship to Canada?"' },
  { at: 6200, label: 'Answer', text: 'AI answers from your shipping rules and sends the cart link' },
  { at: 8000, label: 'Paid', text: 'Order lands in your store as usual', logo: 'stripe' },
]

export default function CommerceCart({ branch }: { branch: Branch }) {
  void branch
  const { ref, t, running, play } = useClock(END)
  const done = STEPS.filter((s) => t >= s.at).length
  return (
    <section ref={ref} className="wv-sec">
      <div className="wv-wrap">
        <div className="wv-sec-head">
          <KineticTitle lines={['One cart.', 'One message.']} className="wv-h2" accent={1} />
          <div className="wv-sec-aside">
            <p>A shopper leaves at checkout. Watch what happens next.</p>
            <button type="button" className="sb-replay" onClick={play} disabled={running}>{running ? 'Playing…' : '↻ Replay'}</button>
          </div>
        </div>
        <div className="sb-cart">
          <div className="sb-cart-track" aria-hidden>
            <motion.i initial={false} animate={{ height: `${(done / STEPS.length) * 100}%` }} transition={{ duration: 0.8 }} />
          </div>
          <ol className="sb-cart-list">
            {STEPS.map((s) => (
              <motion.li key={s.label} initial={false} animate={{ opacity: t >= s.at ? 1 : 0.2 }} className={t >= s.at ? 'is-on' : ''}>
                <b>{s.label}</b>
                <span>{s.logo ? <Logo k={s.logo} s={16} /> : null}{s.text}</span>
              </motion.li>
            ))}
          </ol>
        </div>
        <p className="sb-note">Sample flow. Timing and wording are set by you. Only shoppers who opted in are messaged.</p>
      </div>
    </section>
  )
}
