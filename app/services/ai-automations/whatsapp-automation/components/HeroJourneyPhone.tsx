'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import WhatsAppPhoneShell, { Ticks } from './WhatsAppPhoneShell'

const HOLD_MS = 2600

type Node =
  | { t: 'typing'; ms: number }
  | { t: 'in';      ms: number; text: string; time: string }
  | { t: 'out';     ms: number; text: string; time: string }
  | { t: 'divider'; ms: number; text: string }

/* One customer, one order, four moments — cart recovery, COD confirmation,
   order status, and AI support — the exact four things the Hero headline promises. */
const NODES: Node[] = [
  { t: 'typing', ms: 700 },
  { t: 'in',      ms: 1200, time: '09:14', text: 'Hi Ananya, you left a Ribbed Cotton Top in your cart. Still want it?' },
  { t: 'divider', ms: 900,  text: '2 days later' },
  { t: 'typing', ms: 700 },
  { t: 'in',      ms: 1300, time: '11:02', text: 'Ribbed Cotton Top (M) · Order #4127 · ₹1,299 COD. Please confirm so we can ship it.' },
  { t: 'out',     ms: 750,  time: '11:05', text: 'Yes, ship it' },
  { t: 'divider', ms: 900,  text: 'Next day' },
  { t: 'typing', ms: 700 },
  { t: 'in',      ms: 1300, time: '10:20', text: 'Your order is out for delivery. Track it here: wa.link/track4127' },
  { t: 'out',     ms: 750,  time: '10:24', text: 'Can I pay by UPI instead of COD when it arrives?' },
  { t: 'typing', ms: 700 },
  { t: 'in',      ms: 1300, time: '10:24', text: "Yes! Just show UPI to the delivery partner. I've updated your order." },
]

export default function HeroJourneyPhone() {
  const [stage, setStage] = useState(2)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    if (reduced.current) setStage(NODES.length)
  }, [])

  useEffect(() => {
    if (reduced.current) return
    const step = NODES[stage]
    const wait = step ? step.ms : HOLD_MS
    const id = window.setTimeout(() => setStage(s => (s >= NODES.length ? 0 : s + 1)), wait)
    return () => window.clearTimeout(id)
  }, [stage])

  const visible = useMemo(() => NODES.slice(0, stage), [stage])

  return (
    <WhatsAppPhoneShell time="9:14" name="Kaya Wear" subtitle="Business account" avatarLetter="K" topFade>
      {visible.map((node, i) => {
        const isLast = i === visible.length - 1

        if (node.t === 'typing') {
          if (!isLast) return null
          return (
            <div key={i} className="wa-pop" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 4, width: 'fit-content', borderRadius: '16px 16px 16px 4px', background: '#fff', padding: '12px 14px' }}>
              {[0, 1, 2].map(d => (
                <span key={d} className="wa-dot" style={{ display: 'inline-block', height: 6, width: 6, borderRadius: '50%', background: '#b0a89a', animationDelay: `${d * 0.16}s` }} />
              ))}
            </div>
          )
        }

        if (node.t === 'in') {
          return (
            <div key={i} className="wa-pop" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.08)', maxWidth: '85%', borderRadius: '16px 16px 16px 4px', background: '#fff', padding: '10px 12px', fontSize: 13.5, lineHeight: 1.5, color: '#121212' }}>
              {node.text}
              <span style={{ display: 'block', textAlign: 'right', fontFamily: 'ui-monospace,monospace', fontSize: 10, color: '#a09890', marginTop: 4 }}>{node.time}</span>
            </div>
          )
        }

        if (node.t === 'out') {
          return (
            <div key={i} className="wa-pop" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'flex-end', gap: 6, marginLeft: 'auto', maxWidth: '80%', borderRadius: '16px 16px 4px 16px', background: '#d9fdd3', padding: '8px 12px', fontSize: 13.5, color: '#121212' }}>
              <span>{node.text}</span>
              <span style={{ display: 'flex', flexShrink: 0, alignItems: 'center', gap: 2, paddingBottom: 1, fontFamily: 'ui-monospace,monospace', fontSize: 10, color: '#a09890' }}>
                {node.time}<Ticks />
              </span>
            </div>
          )
        }

        if (node.t === 'divider') {
          return (
            <div key={i} className="wa-fade" style={{ margin: '2px auto', borderRadius: 999, background: 'rgba(0,0,0,0.07)', padding: '4px 12px', fontFamily: 'ui-monospace,monospace', fontSize: 10.5, letterSpacing: '0.04em', color: 'rgba(18,18,18,0.5)' }}>
              {node.text}
            </div>
          )
        }

        return null
      })}
    </WhatsAppPhoneShell>
  )
}
