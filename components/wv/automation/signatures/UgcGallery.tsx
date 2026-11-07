'use client'
import { useRef } from 'react'
import Image from 'next/image'
import type { Branch } from '@/content/ai-automations/types'
import { TOOL_LOGOS, CLIENTS } from '@/content/ai-automations/logos'
import { KineticTitle } from '../../ui'
import './sig-c.css'

type Reel = { src: string; hook: string; p: string; views: string; video?: string }
const A = '/our-services/ai-automation/'
// TODO(owner): Simpli Home 9:16 videos -> set `video` (muted loop, preload none). Posters are stand-ins.
const REELS: Reel[] = [
  { src: A + 'why-choose-website-vikreta-ai-automation.webp', hook: 'Stop scrolling if you own a home', p: 'tiktok', views: '1.2M' },
  { src: A + 'ai-generated-ugc-content-automation.webp', hook: '3 reasons my kitchen finally feels done', p: 'instagram', views: '480K' },
  { src: '/wv/personas/meher-front.webp', hook: 'This took 11 minutes, not 11 days', p: 'meta', views: '340K' },
  { src: '/wv/personas/arjun-three-quarter.webp', hook: "I tried this so you don't have to", p: 'tiktok', views: '212K' },
  { src: A + 'ai-business-process-automation-diagram.webp', hook: 'Before you hire an editor, watch this', p: 'instagram', views: '801K' },
]

function Player({ r }: { r: Reel }) {
  const v = useRef<HTMLVideoElement>(null)
  const logo = TOOL_LOGOS[r.p]
  const go = (on: boolean) => { const el = v.current; if (el) { on ? el.play().catch(() => {}) : el.pause() } }
  return (
    <figure className="wv-sg-reel" onMouseEnter={() => go(true)} onMouseLeave={() => go(false)} onFocus={() => go(true)} onBlur={() => go(false)} tabIndex={0}>
      {r.video
        ? <video ref={v} src={r.video} poster={r.src} muted loop playsInline preload="none" />
        : <Image src={r.src} alt="" fill sizes="(min-width:960px) 18vw, 60vw" />}
      <span className="wv-sg-reel-top">
        {/* eslint-disable-next-line @next/next/no-img-element -- svg logo */}
        <span className="wv-sg-pill"><img src={logo.src} alt={logo.name} width={14} height={14} />▶ {r.views}</span>
        <span className="wv-sg-pill is-y">AI presenter</span>
      </span>
      <figcaption>{r.hook}</figcaption>
    </figure>
  )
}

export default function UgcGallery({ branch }: { branch: Branch }) {
  const c = CLIENTS['simpli-home']
  return (
    <section className="wv-sec wv-sg wv-sg-ugc" aria-label={`${branch.name} examples`}>
      <div className="wv-wrap">
        <div className="wv-sec-head">
          <KineticTitle lines={['Ads people', 'actually watch.']} className="wv-h2" accent={1} />
          <p className="wv-sec-aside">AI presenters, real hooks, tested in batches. Here is what a first round of reels looks like.</p>
        </div>
        <div className="wv-sg-case">
          {/* eslint-disable-next-line @next/next/no-img-element -- client svg */}
          <img className="wv-sg-case-logo" src={c.src} alt={c.alt} />
          <p className="wv-sg-case-r"><b>20 hrs → 1 hr</b><span>a week of manual work at Simpli Home</span></p>
          <p className="wv-sg-case-t">Repeat work now runs on automation, ads included. Samples below are stand-ins for their reels.</p>
        </div>
        <div className="wv-sg-reels" role="list">
          {REELS.map((r) => <div role="listitem" key={r.hook}><Player r={r} /></div>)}
        </div>
        <p className="wv-sg-note">Every ad is labelled as an AI presenter. Hover a reel to preview once videos are added.</p>
      </div>
    </section>
  )
}
