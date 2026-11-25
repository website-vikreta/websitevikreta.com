'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Arrow } from '@/components/wv/ui'

export type ExplorerRow = {
  id: string
  label: string
  fix: string
  href: string
  name: string
  products: { name: string; href: string }[]
  photo: string
  alt: string
  line: string
  logos: { src: string; alt: string }[]
}

type Logo = ExplorerRow['logos'][number]
const PHOTO = new Set(['missed-calls', 'hiring-paperwork', 'ad-creatives'])
const THEME: Record<string, string> = { 'content-backlog': 'ink', 'slow-proposals': 'yellow' }
const SIZES: Record<string, string> = {
  'missed-calls': '(min-width:960px) 58vw, 100vw',
  'hiring-paperwork': '(min-width:960px) 33vw, (min-width:720px) 50vw, 100vw',
  'ad-creatives': '(min-width:960px) 42vw, (min-width:720px) 50vw, 100vw',
}

const Tick = () => (
  <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6.5l2.5 2.5L10 3" /></svg>
)

function Chat({ logos }: { logos: Logo[] }) {
  const wa = logos.find((l) => /whatsapp/i.test(l.src + l.alt))
  return (
    <div className="axb-chat">
      <div className="axb-chat-h">
        {wa && (
          // eslint-disable-next-line @next/next/no-img-element -- svg logo
          <img src={wa.src} alt="" width={20} height={20} />
        )}
        <span>{wa?.alt || 'Chat'}</span>
      </div>
      <p className="axb-b in axb-s1">Hi, is the 2BHK on Baner Road still available?</p>
      <div className="axb-slot">
        <span className="axb-typ" aria-hidden><i /><i /><i /></span>
        <p className="axb-b out axb-s3">Yes. Want to see it Saturday 11am or Sunday 4pm?</p>
      </div>
      <span className="axb-pill axb-s4">replied in 8s</span>
    </div>
  )
}

function Invoice() {
  return (
    <div className="axb-inv">
      <span className="axb-inv-t">Invoice · SBP phase 1</span>
      <strong>$4,800</strong>
      <div className="axb-st">
        <span className="axb-s1">Sent</span>
        <span className="axb-s2">Reminder sent</span>
      </div>
      <span className="axb-dots"><i /><i /><i /></span>
      <span className="axb-stamp">Paid</span>
    </div>
  )
}

function Fan() {
  const out = ['Blog post', 'LinkedIn', 'Newsletter']
  const ys = [16, 50, 84]
  return (
    <div className="axb-fan">
      <span className="axb-idea">Blancora launch</span>
      <svg className="axb-wire" viewBox="0 0 60 100" preserveAspectRatio="none">
        {ys.map((y, i) => (
          <path key={y} className={`axb-s${i + 1}`} d={`M0 50 C30 50 30 ${y} 60 ${y}`} pathLength={1} />
        ))}
      </svg>
      <div className="axb-outs">
        {out.map((o, i) => (
          <span key={o} className={`axb-s${i + 1}`}>{o}<b className={`axb-ck axb-s${i + 2}`}><Tick /></b></span>
        ))}
      </div>
    </div>
  )
}

function Proposal() {
  return (
    <div className="axb-prop">
      <div className="axb-card">
        <b>Call notes</b>
        <i /><i /><i style={{ width: '60%' }} />
      </div>
      <Arrow size={20} />
      <div className="axb-card">
        <b>Proposal</b>
        <i className="axb-s1" /><i className="axb-s2" /><i className="axb-s3" style={{ width: '70%' }} />
        <span className="axb-tot axb-s4"><span>Total</span><b>$12,000</b></span>
        <span className="axb-pill axb-s5">Ready to review</span>
      </div>
    </div>
  )
}

function Chain({ logos }: { logos: Logo[] }) {
  const n = logos.length
  return (
    <div className="axb-chain">
      <span className="axb-track" />
      <span className="axb-ball" />
      {logos.map((l, i) => (
        <span key={l.src} className="axb-lg" style={{ animationDelay: `${(0.08 + (0.6 * i) / Math.max(n - 1, 1)) * 8 - 0.48}s` }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- svg logo */}
          <img src={l.src} alt="" width={28} height={28} />
        </span>
      ))}
    </div>
  )
}

function Demo({ r }: { r: ExplorerRow }) {
  switch (r.id) {
    case 'slow-replies': return <Chat logos={r.logos} />
    case 'chasing-invoices': return <Invoice />
    case 'content-backlog': return <Fan />
    case 'slow-proposals': return <Proposal />
    default: return <Chain logos={r.logos} />
  }
}

/** Bento of the eight jobs. Photo tiles show the scenario, animated tiles demo the fix; each tile links to its service branch. */
export function Explorer({ rows }: { rows: ExplorerRow[] }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('is-off', !e.isIntersecting)))
    root.current?.querySelectorAll('.axb-t').forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])
  return (
    <div className="axb" ref={root}>
      {rows.map((r) => {
        const photo = PHOTO.has(r.id)
        return (
          <article key={r.id} className={`axb-t axb-${r.id} ${photo ? 'is-photo' : THEME[r.id] ? `is-${THEME[r.id]}` : 'is-white'}`}>
            {photo ? (
              <>
                <Image src={r.photo} alt="" fill sizes={SIZES[r.id]} />
                <span className="axb-shade" aria-hidden />
                <span className="axb-lg-row" aria-hidden>
                  {r.logos.map((l) => (
                    <span key={l.src}>
                      {/* eslint-disable-next-line @next/next/no-img-element -- svg logo */}
                      <img src={l.src} alt="" width={18} height={18} />
                    </span>
                  ))}
                </span>
              </>
            ) : (
              <div className="axb-demo" aria-hidden><Demo r={r} /></div>
            )}
            <div className="axb-txt">
              <h3><Link href={r.href}>{r.label}</Link></h3>
              <p>{r.fix}</p>
              <div className="axb-svc">
                <span>{r.name}</span>
                <ul aria-label={`${r.name} services`}>
                  {r.products.map((p) => <li key={p.href}><Link href={p.href}>{p.name}</Link></li>)}
                </ul>
              </div>
            </div>
            <span className="axb-go" aria-hidden><Arrow size={18} /></span>
          </article>
        )
      })}
    </div>
  )
}
