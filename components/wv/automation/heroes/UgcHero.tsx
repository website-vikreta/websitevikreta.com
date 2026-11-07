'use client'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { Branch, Product } from '@/content/ai-automations/types'
import { PERSONAS } from '@/content/ai-automations/personas'
import { TOOL_LOGOS, CLIENTS } from '@/content/ai-automations/logos'
import { HeroCopy } from '../HeroCopy'
import './heroes-c.css'

/** Shared by the C heroes. t counts up to total in `tick` ms steps; SSR + reduced motion = final frame (t = total). Pauses offscreen / hidden tab. */
export function useClock(total: number, tick = 60) {
  const ref = useRef<HTMLElement>(null)
  const [t, setT] = useState(total)
  const [run, setRun] = useState(0)
  const [played, setPlayed] = useState(false)
  const seen = useRef(true)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { seen.current = e.isIntersecting })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restart before first paint so the SSR final frame never flashes
    setT(0); setPlayed(true)
    const id = setInterval(() => {
      if (document.hidden || !seen.current) return
      setT((v) => { if (v + tick >= total) { clearInterval(id); return total } return v + tick })
    }, tick)
    return () => clearInterval(id)
  }, [total, tick, run])
  return { ref, t, done: t >= total, played, replay: () => setRun((r) => r + 1) }
}

export function ToolIcon({ k, size = 16 }: { k: string; size?: number }) {
  const l = TOOL_LOGOS[k]
  // eslint-disable-next-line @next/next/no-img-element -- tiny svg logos
  return l ? <img className="wv-hc-lg" src={l.src} alt={l.name} width={size} height={size} /> : null
}

export const heroCopyProps = (branch: Branch, product: Product | undefined, fallbackSub: string) => {
  const sub = (o: object | undefined) => (o as { heroSub?: string } | undefined)?.heroSub
  const name = product?.name ?? branch.name
  return {
    h1: product?.page?.h1 ?? branch.h1,
    sub: sub(product?.page) ?? sub(product) ?? sub(branch) ?? fallbackSub,
    persona: undefined,
    interest: name,
    waText: `Hi Website Vikreta, I'd like to talk about ${name}.`,
  }
}

type Card = { src: string; hook: string; p: string; views: string; simpli?: boolean; video?: string }
const A = '/our-services/ai-automation/'
const CARDS: Card[] = [
  { src: A + 'why-choose-website-vikreta-ai-automation.webp', hook: 'Stop scrolling if you own a home', p: 'tiktok', views: '1.2M', simpli: true },
  { src: A + 'ai-generated-ugc-content-automation.webp', hook: '3 reasons my kitchen…', p: 'instagram', views: '480K', simpli: true },
  { src: '/wv/personas/arjun-three-quarter.webp', hook: "I tried this so you don't have to", p: 'meta', views: '212K' },
  { src: A + 'whatsapp-ai-agent-automation.webp', hook: 'POV: your leads get a reply in 6 seconds', p: 'tiktok', views: '96K' },
  { src: '/wv/personas/meher-front.webp', hook: 'This took 11 minutes, not 11 days', p: 'instagram', views: '340K', simpli: true },
  { src: A + 'ai-workflow-automation-diagram.webp', hook: 'Your ad budget called. It is tired.', p: 'meta', views: '58K' },
  { src: A + 'ai-business-process-automation-diagram.webp', hook: 'Before you hire an editor, watch this', p: 'tiktok', views: '801K' },
]
// TODO(owner): Simpli Home 9:16 videos -> set `video` on cards (muted loop playsInline preload none)
const COLS = [0, 3, 5, 1].map((o, i) => ({ cards: [...CARDS.slice(o), ...CARDS.slice(0, o)], dur: [46, 62, 54, 70][i], rev: i % 2 === 1 }))

function ReelCard({ c, hot, dup }: { c: Card; hot?: boolean; dup?: boolean }) {
  const client = CLIENTS['simpli-home']
  return (
    <figure className="wv-hc-card" aria-hidden={dup || undefined}>
      {c.video
        ? <video src={c.video} poster={c.src} muted loop playsInline preload="none" autoPlay />
        : <Image src={c.src} alt={dup ? '' : c.hook} fill sizes="(min-width: 960px) 16vw, 30vw" preload={hot} loading={hot ? undefined : 'lazy'} />}
      <span className="wv-hc-card-top">
        <span className="wv-hc-chip"><ToolIcon k={c.p} size={14} /></span>
        <span className="wv-hc-chip">▶ {c.views}</span>
      </span>
      <figcaption className="wv-hc-card-cap">
        <span>{c.hook}</span>
        {c.simpli && client && (
          // eslint-disable-next-line @next/next/no-img-element -- client svg
          <img className="wv-hc-card-client" src={client.src} alt={client.alt} />
        )}
      </figcaption>
    </figure>
  )
}

export default function UgcHero({ branch, product }: { branch: Branch; product?: Product }) {
  const ira = PERSONAS.ira
  const { ref, t } = useClock(4200)
  const n = 12 + Math.min(12, Math.floor(t / 350))
  const wall = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    const el = wall.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setPaused(!e.isIntersecting))
    io.observe(el)
    const vis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', vis)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', vis) }
  }, [])
  return (
    <section ref={ref} className="wv-hc wv-hc-ugc" aria-label={branch.name}>
      <div className="wv-wrap wv-hc-in">
        <HeroCopy {...heroCopyProps(branch, product, 'Ira cuts UGC-style ad variants to test, in your brand voice.')} />
        <div ref={wall} className={`wv-hc-wall${paused ? ' is-paused' : ''}`}>
          <div className="wv-hc-cols" aria-hidden>
            {COLS.map((col, i) => (
              <div key={i} className="wv-hc-colwrap" style={{ marginTop: i % 2 ? -60 : 0 }}>
                <div className="wv-hc-col" style={{ ['--d' as string]: `${col.dur}s`, animationDirection: col.rev ? 'reverse' : 'normal' }}>
                  {[0, 1].flatMap((rep) => col.cards.map((c, j) => <ReelCard key={`${rep}-${j}`} c={c} hot={i === 0 && rep === 0 && j === 0} dup={rep === 1} />))}
                </div>
              </div>
            ))}
          </div>
          <div className="wv-hc-float is-bl">
            <b>{n}</b>
            <span>Variants this week</span>
          </div>
          <div className="wv-hc-float is-tr">
            <Image className="wv-hc-av" src={ira.img.front} alt={ira.img.alt} width={36} height={52} sizes="36px" />
            <span><strong>AI presenter</strong> cutting variant {n + 1}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
