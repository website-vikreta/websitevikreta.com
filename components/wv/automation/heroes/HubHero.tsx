'use client'
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { PERSONAS } from '@/content/ai-automations/personas'
import { TOOL_LOGOS } from '@/content/ai-automations/logos'
import type { Hub, PersonaId } from '@/content/ai-automations/types'
import { ease } from '../../ui'
import { HeroCopy } from '../HeroCopy'
import './heroes-a.css'

/** Loop clock for the A heroes. t = ms; `start` skips the empty opening so the first paint is mid-story. SSR / reduced motion = `end` (final frame). Pauses offscreen and in hidden tabs. */
export function useClock(end: number, hold = 4000, start = 0) {
  const ref = useRef<HTMLElement>(null)
  const reduce = !!useReducedMotion()
  const [t, setT] = useState(end)
  const [live, setLive] = useState(false)
  useLayoutEffect(() => {
    if (reduce) return
    setT(start) // eslint-disable-line react-hooks/set-state-in-effect -- reset before first paint; SSR keeps the final frame
    setLive(true)
  }, [reduce, start])
  useEffect(() => {
    if (reduce || !ref.current) return
    let vis = true
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting })
    io.observe(ref.current)
    let last = performance.now()
    let acc = start
    const id = setInterval(() => {
      const n = performance.now()
      const d = Math.min(n - last, 200)
      last = n
      if (!vis || document.hidden) return
      acc += d
      if (acc > end + hold) acc = start
      setT(Math.min(acc, end))
    }, 50)
    return () => { clearInterval(id); io.disconnect() }
  }, [reduce, end, hold, start])
  return { ref, t, live }
}

export const toolLogo = (k: string) => TOOL_LOGOS[k]

export function HeroShell({ secRef, className = '', copy, label, children }: { secRef: RefObject<HTMLElement | null>; className?: string; copy: ReactNode; label: string; children: ReactNode }) {
  return (
    <section ref={secRef} className={`hx-sec ${className}`}>
      <div className="wv-wrap hx-in">
        <div className="hx-copy">{copy}</div>
        <div className="hx-stage" aria-hidden>{children}</div>
        <p className="hx-sr">{label}</p>
      </div>
    </section>
  )
}

export type ChatCard =
  | { kind: 'pdf'; title: string; meta?: string }
  | { kind: 'linkedin'; title: string; meta?: string }
  | { kind: 'invoice'; title: string; meta?: string; paidAt: number }
  | { kind: 'call'; title: string; lines: string[] }
export type ChatItem = { id: string; at: number; from: 'user' | PersonaId; name: string; text: string; card?: ChatCard }

function Card({ c, t }: { c: ChatCard; t: number }) {
  if (c.kind === 'pdf')
    return (
      <div className="hx-card">
        <span className="hx-card-ic">PDF</span>
        <span className="hx-card-t">{c.title}<i>{c.meta}</i></span>
      </div>
    )
  if (c.kind === 'linkedin') {
    const li = toolLogo('linkedin')
    return (
      <div className="hx-card">
        <span className="hx-card-ic is-li">{li && <img src={li.src} alt="" />}</span>
        <span className="hx-card-t">{c.title}<i>{c.meta}</i></span>
      </div>
    )
  }
  if (c.kind === 'invoice')
    return (
      <div className="hx-card">
        <span className="hx-card-ic is-ok">$</span>
        <span className="hx-card-t">{c.title}<i>{c.meta}</i></span>
        <span className={`hx-stamp${t >= c.paidAt ? ' is-on' : ''}`}>PAID</span>
      </div>
    )
  return (
    <div className="hx-card">
      <span className="hx-card-ic is-ok">&#9742;</span>
      <span className="hx-card-t">{c.title}<ul>{c.lines.map((l) => <li key={l}>{l}</li>)}</ul></span>
    </div>
  )
}

/** Team chat stage: faces at the edges (row on mobile), the replying face lights up. */
export function ChatStage({ items, faces, channel, logo, t, live, solo }: { items: ChatItem[]; faces: PersonaId[]; channel: string; logo?: string; t: number; live: boolean; solo?: boolean }) {
  const shown = items.filter((i) => i.at <= t)
  const last = shown[shown.length - 1]
  let active: PersonaId | undefined
  if (last) active = last.from !== 'user' ? last.from : (items[shown.length]?.from as PersonaId | undefined)
  const lg = logo ? toolLogo(logo) : undefined
  return (
    <div className={`hx-chat${solo ? ' is-solo' : ''}`}>
      <div className="hx-faces">
        {faces.map((id, i) => {
          const p = PERSONAS[id]
          return (
            <div key={id} className={`hx-face${live ? (active === id ? ' is-on' : ' is-dim') : ''}`}>
              <div className="hx-face-img">
                <Image src={p.img.front} alt="" fill sizes="150px" preload={i < 3} />
              </div>
              <b>{p.name}</b>
            </div>
          )
        })}
      </div>
      <div className="hx-stage-in">
        <div className="hx-win">
          <div className="hx-win-bar">
            {lg && <img src={lg.src} alt="" />}
            <span>{channel}</span>
            <i><span className="hx-live" /> {faces.length} teammate{faces.length > 1 ? 's' : ''} online</i>
          </div>
          <div className="hx-thread">
            {shown.map((m) => {
              const p = m.from !== 'user' ? PERSONAS[m.from] : undefined
              return (
                <motion.div
                  key={m.id}
                  layout="position"
                  className="hx-msg"
                  initial={live ? { opacity: 0, y: 18, scale: 0.97 } : false}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.55, ease }}
                >
                  <span className={`hx-av${p ? ' is-bot' : ''}`}>
                    {p ? <Image src={p.img.front} alt="" fill sizes="30px" /> : m.name[0]}
                  </span>
                  <span className="hx-col">
                    <span className="hx-who">{m.name}{p && <em>AI teammate</em>}</span>
                    <p className="hx-txt">{m.text}</p>
                    {m.card && <Card c={m.card} t={t} />}
                  </span>
                </motion.div>
              )
            })}
          </div>
          <div className="hx-compose">Message {channel}</div>
        </div>
      </div>
    </div>
  )
}

const ITEMS: ChatItem[] = [
  { id: '1', at: 600, from: 'user', name: 'Shubham', text: 'Meher, offer letter for Neel. Frontend dev, starts Dec 1.' },
  { id: '2', at: 2400, from: 'meher', name: 'Meher', text: 'Done. Drafted from our template and checked the start date.', card: { kind: 'pdf', title: 'Offer letter · Neel Shah.pdf', meta: 'Sent for e-sign' } },
  { id: '3', at: 4800, from: 'user', name: 'Priya', text: 'Ira, LinkedIn post for tomorrow 10am about the Blancora launch.' },
  { id: '4', at: 6600, from: 'ira', name: 'Ira', text: 'Written and queued.', card: { kind: 'linkedin', title: 'Scheduled · Tue 10:00 AM', meta: 'LinkedIn · Blancora launch' } },
  { id: '5', at: 9000, from: 'user', name: 'Shubham', text: 'Arjun, invoice for SBP phase 1.' },
  { id: '6', at: 10600, from: 'arjun', name: 'Arjun', text: 'Sent. And it just got paid.', card: { kind: 'invoice', title: 'Invoice · SBP phase 1', meta: 'Paid by bank transfer', paidAt: 11500 } },
  { id: '7', at: 13000, from: 'user', name: 'Priya', text: 'Arjun, how did the 3pm call go?' },
  { id: '8', at: 14600, from: 'arjun', name: 'Arjun', text: 'Summary is in the CRM.', card: { kind: 'call', title: 'Call summary · 3pm', lines: ['Revised scope by Friday', 'Budget confirmed', 'Saved to CRM'] } },
]
const END = 16200

export default function HubHero({ hub }: { hub: Hub }) {
  const { ref, t, live } = useClock(END, 4500, 4800)
  return (
    <HeroShell
      secRef={ref}
      className="hx-hub"
      label="Team chat: Meher writes an offer letter, Ira schedules a LinkedIn post, Arjun sends an invoice that gets paid and summarises a sales call."
      copy={<HeroCopy h1={hub.h1} sub={hub.heroSub ?? hub.lead} interest="AI teammates" waText="Hi, I'd like AI teammates for my business." />}
    >
      <ChatStage items={ITEMS} faces={['meher', 'ira', 'arjun']} channel="# ops" t={t} live={live} />
    </HeroShell>
  )
}
