'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { Branch } from '@/content/ai-automations/types'
import { PERSONAS } from '@/content/ai-automations/personas'
import { TOOL_LOGOS } from '@/content/ai-automations/logos'
import { KineticTitle } from '../../ui'
import './sig-c.css'

const A = '/our-services/ai-automation/'
type Post = { ch: string; day: number; when: string; kind: 'li' | 'ig' | 'x' | 'blog' | 'mail'; title: string; body: string; img: string; stats: string[] }
const POSTS: Post[] = [
  { ch: 'linkedin', day: 0, when: 'Mon 09:00', kind: 'li', title: 'Why we made the fall line warm', body: 'Three fabric choices, one reason: people kept it for years. Here is what we changed this season.', img: A + 'why-choose-website-vikreta-ai-automation.webp', stats: ['142 likes', '18 comments'] },
  { ch: 'linkedin', day: 1, when: 'Tue 10:00', kind: 'li', title: 'Behind the fabric', body: 'Our mill visit in four photos. What we check before a single stitch goes in.', img: A + 'ai-generated-ugc-content-automation.webp', stats: ['96 likes', '9 comments'] },
  { ch: 'instagram', day: 2, when: 'Wed 12:30', kind: 'ig', title: '3 ways to style it', body: 'Layer up, roll the cuffs, add a scarf. #falledit', img: A + 'whatsapp-ai-agent-automation.webp', stats: ['1,204 likes', '63 comments'] },
  { ch: 'x', day: 3, when: 'Thu 09:00', kind: 'x', title: 'Fall line is here', body: 'Warm, soft, built to last. Early access opens today. Link below.', img: '', stats: ['41 reposts', '212 likes'] },
  { ch: 'wordpress', day: 4, when: 'Fri 08:00', kind: 'blog', title: 'Blancora fall line: what changed this season', body: 'Fabric, fit and the one detail customers asked for most. A 4-minute read.', img: A + 'ai-workflow-automation-diagram.webp', stats: ['4 min read', 'SEO 92'] },
  { ch: 'mailchimp', day: 5, when: 'Sat 09:00', kind: 'mail', title: 'Fall letter #1', body: 'Subject: The warm edit is open early for you.', img: A + 'ai-business-process-automation-diagram.webp', stats: ['Open rate 41%', 'Click 6.8%'] },
]
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function Card({ p }: { p: Post }) {
  const logo = TOOL_LOGOS[p.ch]
  const ira = PERSONAS.ira
  return (
    <article className={`wv-sg-post is-${p.kind}`} data-day={p.day}>
      <header>
        {/* eslint-disable-next-line @next/next/no-img-element -- svg logo */}
        <img src={logo.src} alt={logo.name} width={22} height={22} />
        <span><b>Blancora</b><small>{logo.name}</small></span>
        <em className="wv-sg-pill is-y">Scheduled · {p.when}</em>
      </header>
      {p.kind === 'mail' && <small className="wv-sg-mail">From Blancora · To 4,820 subscribers</small>}
      <h3>{p.title}</h3>
      <p>{p.body}</p>
      {p.img && <div className={`wv-sg-img${p.kind === 'ig' ? ' is-sq' : ''}`}><Image src={p.img} alt="" fill sizes="320px" /></div>}
      <footer>
        <Image className="wv-sg-ira" src={ira.img.front} alt="" width={24} height={24} sizes="24px" />
        {p.stats.map((s) => <span key={s}>{s}</span>)}
        <small>sample</small>
      </footer>
    </article>
  )
}

export default function ContentFeed({ branch }: { branch: Branch }) {
  const rail = useRef<HTMLDivElement>(null)
  const hold = useRef(false)
  const [day, setDay] = useState<number | null>(null)
  useEffect(() => {
    const el = rail.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let seen = true, raf = 0
    const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting })
    io.observe(el)
    const tick = () => {
      if (seen && !hold.current && !document.hidden) {
        el.scrollLeft += 0.5
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) el.scrollLeft = 0
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); io.disconnect() }
  }, [])
  // drag to scroll (mouse); touch uses native scroll
  const drag = useRef<{ x: number; l: number } | null>(null)
  const pick = (i: number) => {
    setDay(i)
    const el = rail.current, card = el?.querySelector<HTMLElement>(`[data-day="${i}"]`)
    if (el && card) el.scrollTo({ left: card.offsetLeft - 16, behavior: 'smooth' })
  }
  return (
    <section className="wv-sec wv-sg wv-sg-feed" aria-label={`${branch.name} feed`}>
      <div className="wv-wrap">
        <div className="wv-sec-head">
          <KineticTitle lines={['A week of posts,', 'already written.']} className="wv-h2" accent={1} />
          <p className="wv-sec-aside">Six channels, one brand voice. Pick a day to jump to that post, or let the rail drift.</p>
        </div>
        <div className="wv-sg-week" role="group" aria-label="This week">
          {DAYS.map((d, i) => {
            const p = POSTS.find((x) => x.day === i)
            return (
              <button type="button" key={d} disabled={!p} aria-pressed={day === i} onClick={() => pick(i)} className={day === i ? 'is-on' : ''}>
                <b>{d}</b>
                {/* eslint-disable-next-line @next/next/no-img-element -- svg logo */}
                {p ? <img src={TOOL_LOGOS[p.ch].src} alt={TOOL_LOGOS[p.ch].name} width={20} height={20} /> : <i aria-hidden />}
                <small>{p ? p.when.split(' ')[1] : 'rest'}</small>
              </button>
            )
          })}
        </div>
        <div
          ref={rail}
          className="wv-sg-rail"
          tabIndex={0}
          aria-label="Scheduled posts, scroll sideways"
          onMouseEnter={() => { hold.current = true }}
          onMouseLeave={() => { hold.current = false; drag.current = null }}
          onFocus={() => { hold.current = true }}
          onBlur={() => { hold.current = false }}
          onPointerDown={(e) => { if (e.pointerType === 'mouse') drag.current = { x: e.clientX, l: rail.current!.scrollLeft } }}
          onPointerMove={(e) => { if (drag.current) rail.current!.scrollLeft = drag.current.l - (e.clientX - drag.current.x) }}
          onPointerUp={() => { drag.current = null }}
        >
          {POSTS.map((p) => <Card key={p.title} p={p} />)}
        </div>
        <p className="wv-sg-note">Sample posts for a sample brand. You approve every one before it is scheduled.</p>
      </div>
    </section>
  )
}
