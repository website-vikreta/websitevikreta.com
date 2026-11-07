'use client'
import Image from 'next/image'
import type { Branch, Product } from '@/content/ai-automations/types'
import { PERSONAS } from '@/content/ai-automations/personas'
import { HeroCopy } from '../HeroCopy'
import { ToolIcon, heroCopyProps, useClock } from './UgcHero'
import './heroes-c.css'

const BRIEF = 'Launch of Blancora fall line, tone: warm, 3x/week'
const A = '/our-services/ai-automation/'
const THUMBS = [A + 'ai-generated-ugc-content-automation.webp', A + 'why-choose-website-vikreta-ai-automation.webp', A + 'whatsapp-ai-agent-automation.webp']
const CH = ['linkedin', 'instagram', 'x', 'wordpress', 'mailchimp']
const TITLES = ['Fall line is here', '3 ways to style it', 'Why we made it warm', 'Fall line: what changed', 'Fall letter #1', 'Behind the fabric', 'Customer picks', 'Meet the maker', 'Fall care guide', 'Early access', 'The warm edit', 'Last call: fall', 'Fall recap']
const DAYS = [2, 4, 6, 9, 11, 13, 16, 18, 20, 23, 25, 27, 30]
const POSTS = DAYS.map((d, i) => ({ d, ch: CH[i % 5], title: TITLES[i], thumb: THUMBS[i % 3] }))
const SEED = 8, STEP = 500
const TOTAL = STEP * (POSTS.length - SEED) + 1200

const H2S = ["What's new this fall", 'Who it is for', 'How to style it']

function Article({ t }: { t: number }) {
  const s = Math.floor(t / 900) // 0..7
  return (
    <div className="wv-hc-art">
      <div className="wv-hc-art-bar">
        <ToolIcon k="wordpress" size={18} />
        <span className={`wv-hc-pub${s >= 7 ? ' is-on' : ''}`}>Published</span>
      </div>
      <h2 className="wv-hc-art-h1">Blancora fall line: what changed this season</h2>
      {H2S.map((h, i) => (
        <div key={h} className={`wv-hc-art-sec${s >= i * 2 + 1 ? ' is-on' : ''}`}>
          <h3>{h}</h3>
          <i style={{ width: '96%' }} /><i style={{ width: '88%' }} /><i style={{ width: '62%' }} />
        </div>
      ))}
    </div>
  )
}

export default function ContentHero({ branch, product }: { branch: Branch; product?: Product }) {
  const ira = PERSONAS.ira
  const { ref, t, done, played, replay } = useClock(TOTAL, 50)
  const chars = Math.min(BRIEF.length, 24 + Math.floor(t / 40))
  const posted = Math.min(POSTS.length, SEED + Math.floor(t / STEP))
  const blog = product?.slug === 'seo-blog-content'
  return (
    <section ref={ref} className="wv-hc wv-hc-content" aria-label={product?.name ?? branch.name}>
      <div className="wv-wrap wv-hc-in">
        <HeroCopy {...heroCopyProps(branch, product, 'Ira turns one brief into a month of scheduled posts.')} />
        <div className="wv-hc-stage">
          <div className="wv-hc-brief">
            <Image className="wv-hc-av is-lg" src={ira.img.front} alt={ira.img.alt} width={32} height={32} sizes="32px" preload />
            <p>
              <strong>Content brief</strong>
              <span>{BRIEF.slice(0, chars)}<i className={`wv-hc-caret${chars >= BRIEF.length ? ' is-done' : ''}`} /></span>
            </p>
            {!blog && <b className="wv-hc-count">{posted} posts scheduled</b>}
          </div>
          {blog ? <Article t={t + 3000} /> : (
            <div className="wv-hc-cal">
              <div className="wv-hc-cal-h">
                <strong>November</strong>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((w, i) => <span key={i}>{w}</span>)}
              </div>
              <div className="wv-hc-days">
                {Array.from({ length: 35 }, (_, i) => {
                  const d = i + 1
                  const k = POSTS.findIndex((p) => p.d === d)
                  const p = POSTS[k]
                  return (
                    <div key={i} className={`wv-hc-day${d > 30 ? ' is-off' : ''}`}>
                      {d <= 30 && <em>{d}</em>}
                      {p && (
                        <div className={`wv-hc-post${k < posted ? ' is-on' : ''}`}>
                          <span className="wv-hc-post-top">
                            <ToolIcon k={p.ch} size={16} />
                            <Image className="wv-hc-thumb" src={p.thumb} alt="" width={28} height={28} sizes="28px" />
                          </span>
                          <span className="wv-hc-post-t">{p.title}</span>
                          <span className="wv-hc-time">10:00</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {done && played && <button type="button" className="wv-hc-replay" onClick={replay}>Replay</button>}
        </div>
      </div>
    </section>
  )
}
