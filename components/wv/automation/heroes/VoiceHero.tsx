'use client'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { PERSONAS } from '@/content/ai-automations/personas'
import { TOOL_LOGOS } from '@/content/ai-automations/logos'
import type { Branch, Product } from '@/content/ai-automations/types'
import { ease } from '../../ui'
import { HeroCopy } from '../HeroCopy'
import './heroes-b.css'

export type HeroProps = { branch: Branch; product?: Product }

/** Shared by the three B heroes. t = ms on a loop; SSR/reduced-motion = `end` (final frame). Pauses offscreen and in hidden tabs. */
export function useStage(end: number, start = 0, hold = 3500) {
  const ref = useRef<HTMLElement>(null)
  const reduce = !!useReducedMotion()
  const [t, setT] = useState(end)
  useLayoutEffect(() => {
    if (!reduce) setT(start) // eslint-disable-line react-hooks/set-state-in-effect -- start before first paint; SSR keeps the final frame
  }, [reduce, start])
  useEffect(() => {
    if (reduce || !ref.current) return
    let vis = true
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting })
    io.observe(ref.current)
    const id = setInterval(() => {
      if (vis && !document.hidden) setT((p) => (p + 100 >= end + hold ? start : p + 100))
    }, 100)
    return () => { clearInterval(id); io.disconnect() }
  }, [reduce, end, start, hold])
  return { ref, t, reduce }
}

export function Lg({ k, s = 20 }: { k: string; s?: number }) {
  const l = TOOL_LOGOS[k]
  // eslint-disable-next-line @next/next/no-img-element -- small svg marks
  return l ? <img src={l.src} alt="" width={s} height={s} className="hb-lg" style={{ width: s, height: s }} /> : null
}

export function heroCopy(branch: Branch, product?: Product) {
  const x = (product?.page ?? branch) as { h1: string[]; heroSub?: string }
  const sub = x.heroSub ?? (product as { heroSub?: string } | undefined)?.heroSub ?? (branch as { heroSub?: string }).heroSub ?? branch.lead
  const name = product?.name ?? branch.name
  return {
    h1: x.h1,
    sub,
    persona: PERSONAS[branch.persona],
    interest: product?.slug ?? branch.slug,
    waText: `Hi, I'd like to talk about ${name}.`,
  }
}

const WAVE = Array.from({ length: 26 }, (_, i) => 0.25 + ((i * 37) % 10) / 13)
const mmss = (ms: number) => `0:${String(Math.min(59, Math.floor(ms / 1000))).padStart(2, '0')}`

export default function VoiceHero({ branch, product }: HeroProps) {
  const d = product?.page?.demo ?? branch.demo
  const demo = d.kind === 'call' ? d : (branch.demo as Extract<typeof d, { kind: 'call' }>)
  const L = demo.lines
  const outbound = product?.slug === 'outbound-lead-qualification'
  const biz = /(?:calling|for) ([A-Z][\w&' ]+?)[.,]/.exec(L[0]?.text ?? '')?.[1] ?? 'Bright Smile Dental'
  const who = demo.caller.split('·')[1]?.trim() ?? 'New patient'
  const slot = demo.outcome.split('·').slice(0, 2).join('·').trim()
  const tick = (i: number) => 1000 + i * 1500
  const lastLine = tick(L.length - 1)
  const book = lastLine + 900
  const sms = book + 1100
  const { ref, t, reduce } = useStage(sms + 600, tick(1))
  const shown = L.filter((_, i) => t >= tick(i)).length
  const cur = L[Math.max(0, shown - 1)]
  const live = t < book && !reduce
  const au = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const toggle = () => {
    const a = au.current
    if (!a) return
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {})
    else { a.pause(); setPlaying(false) }
  }
  const persona = PERSONAS.arjun
  const cp = heroCopy(branch, product)
  return (
    <section ref={ref} className="hb-hero">
      <div className="wv-grid-bg" aria-hidden />
      <div className="wv-wrap hb-in">
        <div className="hb-copy"><HeroCopy {...cp} /></div>
        <div className="hb-stage hb-voice">
          <div className="hb-call">
            <div className="hb-call-top" aria-hidden>
              <span className="hb-live"><i /> {outbound ? 'Outgoing call' : 'Incoming call'}</span>
              <span>{outbound ? who : biz}</span>
              <span className="hb-mono">{mmss(Math.min(t, book))}</span>
            </div>
            <div className="hb-av">
              <span className={`hb-ring ${live ? 'is-live' : ''}`} aria-hidden />
              <span className={`hb-ring is-2 ${live ? 'is-live' : ''}`} aria-hidden />
              <div className="hb-av-img">
                <Image src={persona.img.front} alt={persona.img.alt} fill sizes="36px" preload />
              </div>
              <em><strong>AI assistant</strong> · {outbound ? 'Summit Roofing' : biz}</em>
            </div>
            <div className={`hb-wave ${live ? 'is-live' : ''} is-${cur?.who}`} aria-hidden>
              {WAVE.map((h, i) => <span key={i} style={{ ['--i' as string]: i, ['--h' as string]: h }} />)}
            </div>
            <div className="hb-lines" role="log" aria-label="Call transcript">
              <AnimatePresence initial={false}>
                {L.slice(Math.max(0, shown - 3), shown).map((l, k) => {
                  const idx = Math.max(0, shown - 3) + k
                  return (
                    <motion.p key={idx} className={`hb-line is-${l.who}`} initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 0.45 + 0.275 * k, y: 0 }} transition={{ duration: 0.5, ease }}>
                      <b>{l.who === 'agent' ? 'AI' : outbound ? who.split(' ')[0] : 'Caller'}</b> {l.text}
                    </motion.p>
                  )
                })}
              </AnimatePresence>
            </div>
            {demo.audio && <audio ref={au} src={demo.audio} preload="none" onEnded={() => setPlaying(false)} />}
            <button type="button" className="hb-hear" onClick={toggle} disabled={!demo.audio} aria-pressed={playing}
              title={!demo.audio && process.env.NODE_ENV !== 'production' ? 'TODO(owner): record call audio and set demo.audio' : undefined}>
              <span aria-hidden>{playing ? '❚❚' : '▶'}</span> Hear a sample call
            </button>
          </div>
          <div className="hb-side" aria-hidden>
            <motion.div className="hb-card hb-cal" initial={false} animate={{ opacity: t >= book ? 1 : 0, x: t >= book ? 0 : 60, scale: t >= book ? 1 : 0.94 }} transition={{ duration: 0.7, ease }}>
              <Lg k="googlecalendar" s={26} />
              <div><strong>{slot}</strong><small>{outbound ? 'On-site estimate' : biz}</small></div>
              <span className="hb-tick">✓</span>
            </motion.div>
            {outbound ? (
              <motion.div className="hb-card hb-crm" initial={false} animate={{ opacity: t >= sms ? 1 : 0, y: t >= sms ? 0 : 16 }} transition={{ duration: 0.6, ease }}>
                <Lg k="hubspot" s={22} />
                <span>{who} updated</span>
                <b className="hb-score">Lead score 86 · Hot</b>
              </motion.div>
            ) : (
              <motion.div className="hb-bubble" initial={false} animate={{ opacity: t >= sms ? 1 : 0, y: t >= sms ? 0 : 16 }} transition={{ duration: 0.6, ease }}>
                <small>SMS · now</small>
                Hi Dana, you are booked for {slot.replace('Booked · ', '')} at {biz}. Reply C to change.
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
