'use client'
import { motion } from 'motion/react'
import type { Branch } from '@/content/ai-automations/types'
import { Logo, useClock } from './kit-b'

const END = 9000
const ARJUN = [
  { at: 1400, x: 5, label: '0:06', text: 'Replied: "Hi Sara, what are you looking to get done?"' },
  { at: 3600, x: 14, label: '0:40', text: 'Qualified: kitchen remodel, spring start' },
  { at: 5800, x: 26, label: '2:10', text: 'Booked Thu 10 AM', logo: 'googlecalendar' },
]
const TEAM = [
  { at: 6800, x: 60, label: '2 h later', text: 'Message seen' },
  { at: 8400, x: 90, label: 'Next morning', text: 'First reply sent' },
]

function Lane({ name, tone, items, t, win }: { name: string; tone: 'team' | 'arjun'; items: typeof ARJUN | typeof TEAM; t: number; win?: string }) {
  const last = items[items.length - 1]
  const prog = Math.max(0, ...items.filter((i) => t >= i.at).map((i) => i.x))
  return (
    <div className={`sb-lane is-${tone}`}>
      <div className="sb-lane-h"><strong>{name}</strong>{t >= last.at && win && <em>{win}</em>}</div>
      <div className="sb-track">
        <motion.i className="sb-fill" initial={false} animate={{ width: `${prog}%` }} transition={{ duration: 0.8 }} />
        {items.map((it) => (
          <motion.span key={it.label} className="sb-ev" style={{ left: `${it.x}%` }} initial={false}
            animate={{ opacity: t >= it.at ? 1 : 0, scale: t >= it.at ? 1 : 0.6 }} transition={{ duration: 0.4 }}>
            <i />
            <b>{it.label}</b>
          </motion.span>
        ))}
      </div>
      <ul className="sb-evl">
        {items.map((it) => (
          <motion.li key={it.label} initial={false} animate={{ opacity: t >= it.at ? 1 : 0.18 }}>
            <b>{it.label}</b> {'logo' in it && it.logo ? <Logo k={it.logo} s={16} /> : null}{it.text}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export default function WhatsAppRace({ branch }: { branch: Branch }) {
  void branch
  const { ref, t, running, play } = useClock(END)
  return (
    <section ref={ref} className="sb-sec" aria-labelledby="sb-race-h">
      <div className="wv-wrap">
        <div className="sb-row">
          <div>
            <h2 id="sb-race-h" className="wv-h2 wv-ax-h2">Same lead. Two replies.</h2>
            <p className="sb-lede">A quote request lands at 6:52 pm. See who answers first.</p>
          </div>
          <button type="button" className="sb-replay" onClick={play} disabled={running}>{running ? 'Racing…' : '↻ Replay'}</button>
        </div>
        <div className="sb-race">
          <div className="sb-lead">
            <span className="sb-lead-h"><Logo k="typeform" s={18} /> Quote request · 6:52 pm</span>
            <p><b>Sara</b> · +1 415 ••• 0142<br />Kitchen remodel, spring start</p>
          </div>
          <Lane name="Your team" tone="team" items={TEAM} t={t} win="Lead already cold" />
          <Lane name="AI reply" tone="arjun" items={ARJUN} t={t} win="Booked in 2 min 10 s" />
          <div className="sb-axis" aria-hidden><span>0:00</span><span>1 min</span><span>2 min</span><span className="sb-brk">⋯</span><span>2 hours</span><span>Next morning</span></div>
        </div>
        <p className="sb-note">Sample timeline. Team lane assumes evening, a busy week and no one on the inbox.</p>
      </div>
    </section>
  )
}
