'use client'
import { useEffect, useRef, useState } from 'react'
import type { Branch } from '@/content/ai-automations/types'
import { Logo } from './kit-b'

type Call = { biz: string; icon: string; time: string; dur: number; lines: { who: 'A' | 'C'; text: string; hot?: boolean }[]; outcome: string; logo: string }
const CALLS: Call[] = [
  { biz: 'Dental clinic', icon: '🦷', time: '7:42 pm', dur: 94, logo: 'googlecalendar', outcome: 'Booked Thu 3:30 · Google Calendar', lines: [
    { who: 'C', text: 'My tooth hurts, can I come in this week?' },
    { who: 'A', text: 'Thursday 3:30 pm is open. Shall I hold it?', hot: true },
    { who: 'C', text: 'Yes please, name is Dana.' }] },
  { biz: 'Roofing contractor', icon: '🏠', time: '11:15 am', dur: 128, logo: 'hubspot', outcome: 'Qualified · HubSpot', lines: [
    { who: 'C', text: 'Storm took some shingles off, need a quote.' },
    { who: 'A', text: 'Is it a home or a rental? Any leaks inside?', hot: true },
    { who: 'C', text: 'Home. Small leak in the hallway.' }] },
  { biz: 'Law office', icon: '⚖️', time: '9:03 pm', dur: 71, logo: 'slack', outcome: 'Routed to owner · Slack', lines: [
    { who: 'C', text: 'I need to speak to someone about a lease dispute.' },
    { who: 'A', text: 'I will pass this to the attorney tonight.', hot: true },
    { who: 'C', text: 'Thank you, it is urgent.' }] },
]
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
const BARS = Array.from({ length: 44 }, (_, i) => 0.2 + (((i * 53) % 17) / 17) * 0.8)

function CallCard({ c, audio }: { c: Call; audio?: string }) {
  const [p, setP] = useState(1) // 0..1 progress; 1 = finished (rest state shows everything)
  const [on, setOn] = useState(false)
  const au = useRef<HTMLAudioElement>(null)
  useEffect(() => {
    if (!on || audio) return
    const id = setInterval(() => setP((x) => { if (x >= 1) { setOn(false); return 1 } return x + 0.02 }), 120)
    return () => clearInterval(id)
  }, [on, audio])
  const toggle = () => {
    if (audio && au.current) {
      const a = au.current
      if (a.paused) { setOn(true); a.play().catch(() => setOn(false)) } else { a.pause(); setOn(false) }
      return
    }
    if (on) { setOn(false); return }
    setP(0); setOn(true)
  }
  const shown = on || p < 1 ? Math.min(c.lines.length, Math.floor(p * c.lines.length) + 1) : c.lines.length
  return (
    <article className="sb-call">
      <header>
        <span className="sb-ico" aria-hidden>{c.icon}</span>
        <div><strong>{c.biz}</strong><small>{c.time} · {mmss(c.dur)}</small></div>
      </header>
      <div className="sb-wavebar">
        <button type="button" className="sb-play" onClick={toggle} aria-label={`${on ? 'Pause' : 'Play'} call from ${c.biz}`} aria-pressed={on}>{on ? '❚❚' : '▶'}</button>
        <div className={`sb-wv ${on ? 'is-on' : ''}`} aria-hidden>
          {BARS.map((h, i) => <i key={i} className={i / BARS.length <= p ? 'is-done' : ''} style={{ ['--h' as string]: h, ['--i' as string]: i }} />)}
        </div>
        <span className="sb-mono">{mmss(c.dur * p)}</span>
      </div>
      {audio && <audio ref={au} src={audio} preload="none" onEnded={() => setOn(false)} onTimeUpdate={(e) => setP(e.currentTarget.currentTime / (e.currentTarget.duration || 1))} />}
      {/* TODO(owner): record real call audio, set demo.audio on the branch */}
      <div className="sb-tr" role="log" aria-label="Transcript">
        {c.lines.slice(0, shown).map((l, i) => (
          <p key={i} className={l.who === 'A' ? 'is-a' : 'is-c'}><b>{l.who === 'A' ? 'AI' : 'Caller'}</b>{l.hot ? <mark>{l.text}</mark> : l.text}</p>
        ))}
      </div>
      <footer className="sb-out"><Logo k={c.logo} s={22} />{c.outcome}</footer>
    </article>
  )
}

export default function VoiceCallLog({ branch }: { branch: Branch }) {
  const audio = branch.demo.kind === 'call' ? branch.demo.audio : undefined
  const [missed, setMissed] = useState(24)
  const [rate, setRate] = useState(30)
  const lost = Math.round(missed * (rate / 100) * 4.3)
  return (
    <section className="sb-sec" aria-labelledby="sb-call-h">
      <div className="wv-wrap">
        <h2 id="sb-call-h" className="wv-h2 wv-ax-h2">Today&apos;s call log</h2>
        <p className="sb-lede">Three calls the AI voice agent took after hours. Press play to hear how each one went.</p>
        <div className="sb-calls">{CALLS.map((c, i) => <CallCard key={c.biz} c={c} audio={i === 0 ? audio : undefined} />)}</div>
        <div className="sb-slide">
          <div className="sb-slide-in">
            <h3>Missed calls, missed bookings</h3>
            <label>Missed calls a week <b>{missed}</b>
              <input type="range" min={0} max={60} value={missed} onChange={(e) => setMissed(+e.target.value)} />
            </label>
            <label>Share that would have booked <b>{rate}%</b>
              <input type="range" min={10} max={60} step={5} value={rate} onChange={(e) => setRate(+e.target.value)} />
            </label>
          </div>
          <div className="sb-slide-out" aria-live="polite">
            <b>{lost}</b>
            <span>bookings lost every month</span>
            <small>Sample math: calls × booking share × 4.3 weeks. Your numbers will differ.</small>
          </div>
        </div>
      </div>
    </section>
  )
}
