'use client'

import Image from 'next/image'
import { useReducedMotion } from 'motion/react'
import { PERSONAS } from '@/content/ai/personas'
import { TOOL_LOGOS } from '@/content/ai/logos'
import { useClock } from './HubHero'

/** AI Content & Ads pillar hero art — a live "content studio" board.
 *
 * One brief comes in, then two real child-page scenes run from it:
 *  - Content automation: Ira drafts a post, repurposes it to five channels
 *    and schedules the month. A person approves before it goes out.
 *  - AI UGC ads: one product still becomes short presenter-led ads for Meta,
 *    TikTok and Instagram — every presenter labeled AI — with hooks to test.
 * Real persona, real tool marks, wv tokens only. SSR / reduced motion show the
 * final frame; the loop pauses offscreen and in hidden tabs.
 */

const END = 9000
const START = 4000
const on = (t: number, at: number) => t >= at

function Tool({ k, s = 15 }: { k: string; s?: number }) {
  const l = TOOL_LOGOS[k]
  return l ? <img src={l.src} alt={l.name} width={s} height={s} style={{ width: s, height: s }} /> : null
}

const BRIEF = 'Blancora fall line, warm tone, 3x/week'
const CHANNELS = [
  { k: 'wordpress', t: 'Fall line: what changed', day: 'Nov 2' },
  { k: 'linkedin', t: '3 ways to style it', day: 'Nov 4' },
  { k: 'x', t: 'Why we made it warm', day: 'Nov 6' },
  { k: 'instagram', t: 'Behind the fabric', day: 'Nov 9' },
  { k: 'mailchimp', t: 'Fall letter #1', day: 'Nov 11' },
]
const A = '/our-services/ai-automation/'
const ADS = [
  { img: A + 'ai-generated-ugc-content-automation.webp', hook: 'Stop scrolling if you own a home', p: 'tiktok', views: '1.2M' },
  { img: PERSONAS.ira.img.front, hook: '3 reasons my kitchen…', p: 'instagram', views: '480K' },
  { img: PERSONAS.ira.img.threeQuarter, hook: 'Before you hire an editor…', p: 'meta', views: '212K' },
]

function BriefStrip({ t, reduce }: { t: number; reduce: boolean }) {
  const chars = reduce ? BRIEF.length : Math.min(BRIEF.length, Math.max(0, Math.floor((t - 200) / 34)))
  return (
    <div className="ais-brief">
      <span className="ais-face"><Image src={PERSONAS.ira.img.front} alt="" fill sizes="34px" /></span>
      <span className="ais-bcopy">
        <b>Content brief</b>
        <span>{BRIEF.slice(0, chars)}{!reduce && chars < BRIEF.length && <i className="ais-caret" />}</span>
      </span>
      <span className={`ais-chip ais-chip-y${on(t, 2800) ? ' is-on' : ''}`}>Approved ✓</span>
    </div>
  )
}

function ContentPanel({ t }: { t: number }) {
  const at = (i: number) => 3200 + i * 480
  const shown = CHANNELS.filter((_, i) => on(t, at(i))).length
  return (
    <div className="ais-p ais-content">
      <div className="ais-ph">
        <span className="ais-ph-t"><Tool k="notion" s={15} />Content automation</span>
        <small>A month of posts</small>
      </div>
      <div className="ais-plan">
        {CHANNELS.map((c, i) => (
          <div key={c.k} className={`ais-row${on(t, at(i)) ? ' is-on' : ''}`}>
            <Tool k={c.k} s={15} />
            <span className="ais-row-t">{c.t}</span>
            <small>{c.day}</small>
          </div>
        ))}
      </div>
      <div className="ais-stat"><span>Posts scheduled</span><b>{8 + shown}<i>/13</i></b></div>
    </div>
  )
}

function AdsPanel({ t }: { t: number }) {
  const at = (i: number) => 3800 + i * 800
  return (
    <div className="ais-p ais-ads">
      <div className="ais-ph">
        <span className="ais-ph-t"><Tool k="meta" s={15} />AI UGC ads</span>
        <small>AI disclosed</small>
      </div>
      <div className="ais-reel">
        {ADS.map((a, i) => (
          <div key={a.hook} className={`ais-ad${on(t, at(i)) ? ' is-on' : ''}`}>
            <span className="ais-ad-img"><Image src={a.img} alt="" fill sizes="72px" /></span>
            <span className="ais-ad-meta">
              <b>{a.hook}</b>
              <small><Tool k={a.p} s={12} />▶ {a.views}</small>
            </span>
            {i === 0 && <span className={`ais-topbadge${on(t, 7000) ? ' is-on' : ''}`}>TOP</span>}
          </div>
        ))}
      </div>
      <span className={`ais-chip ais-curious${on(t, 6200) ? ' is-on' : ''}`}>
        {on(t, 7400) ? 'Hook 1 won → making 3 more' : 'Which hook will win?'}
      </span>
    </div>
  )
}

export default function AiContentAdsHeroArt() {
  const { ref, t } = useClock(END, 3600, START)
  const reduce = !!useReducedMotion()
  return (
    <section className="ais-stage" ref={ref} aria-hidden>
      <div className="ais-board">
        <div className="ais-top">
          <span className="ais-brand"><b>Content studio</b> · one brief, two outputs</span>
          <span className="ais-live"><span className="ais-dot" />2 flows live</span>
        </div>
        <BriefStrip t={t} reduce={reduce} />
        <div className="ais-grid">
          <ContentPanel t={t} />
          <AdsPanel t={t} />
        </div>
        <div className="ais-foot">
          {['wordpress', 'linkedin', 'instagram', 'x', 'mailchimp', 'meta', 'tiktok', 'canva'].map((k) => <Tool key={k} k={k} s={14} />)}
          <span>A person approves every post and every ad</span>
        </div>
      </div>
      <p className="wv-sr">One content brief becomes a month of scheduled blog and social posts, and disclosed AI-presenter ad variants to test on Meta and TikTok. A person approves the facts and the voice before anything ships.</p>
    </section>
  )
}
