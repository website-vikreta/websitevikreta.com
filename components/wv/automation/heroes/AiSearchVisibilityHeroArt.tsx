'use client'

import { useReducedMotion } from 'motion/react'
import { TOOL_LOGOS } from '@/content/ai/logos'
import { useClock } from './HubHero'

/** AI Search Visibility pillar hero art — a live "answer engine desk".
 *
 * Buyers ask ChatGPT, Perplexity and Google AI before they search. This board
 * shows the whole loop: a real buyer question goes to three answer engines,
 * an answer forms with a citation back to the site, and the five signals we
 * actually change (answer-first content, schema, entity details, crawler
 * access, internal links) light up as the reason. Real service language from
 * the SEO & GEO page. SSR / reduced motion show the final frame; the loop
 * pauses offscreen and in hidden tabs.
 */

const END = 9000
const START = 700
const on = (t: number, at: number) => t >= at

function Mark({ k, fallback, s = 15 }: { k: string; fallback: string; s?: number }) {
  const l = TOOL_LOGOS[k]
  return l
    ? <img src={l.src} alt={l.name} width={s} height={s} style={{ width: s, height: s }} />
    : <i className="aus-letter" style={{ width: s, height: s }}>{fallback}</i>
}

const ENGINES = [
  { k: 'openai', name: 'ChatGPT', letter: 'C', at: 500 },
  { k: '', name: 'Perplexity', letter: 'P', at: 1100 },
  { k: 'gemini', name: 'Google AI', letter: 'G', at: 1700 },
]
const QUESTION = 'Who does GEO for small businesses?'
const ANSWER = [
  'GEO earns citations inside AI answers, not just Google rankings.',
  'Website Vikreta builds the content and schema those answers use.',
  'Start with an AI visibility check.',
]
const SIGNALS = [
  { n: 'Answer-first content', at: 2600 },
  { n: 'Schema markup', at: 3200 },
  { n: 'Entity signals', at: 3800 },
  { n: 'Crawler access', at: 4400 },
  { n: 'Internal links', at: 5000 },
]

function QueryStrip({ t, reduce }: { t: number; reduce: boolean }) {
  const chars = reduce ? QUESTION.length : Math.min(QUESTION.length, Math.max(0, Math.floor((t - 300) / 32)))
  return (
    <div className="aus-query">
      <div className="aus-engines">
        <span className="aus-q-label">Buyer asks</span>
        {ENGINES.map((e) => (
          <span key={e.name} className={`aus-engine${on(t, e.at) ? ' is-on' : ''}`}>
            <Mark k={e.k} fallback={e.letter} s={13} />{e.name}
          </span>
        ))}
      </div>
      <p>“{QUESTION.slice(0, chars)}{!reduce && chars < QUESTION.length && <i className="aus-caret" />}”</p>
    </div>
  )
}

function AnswerPanel({ t }: { t: number }) {
  return (
    <div className="aus-p aus-answer">
      <div className="aus-ph"><span className="aus-ph-t"><Mark k="openai" fallback="C" s={15} />In the AI answer</span><small>Cited source</small></div>
      <div className="aus-lines">
        {ANSWER.map((line, i) => (
          <p key={line} className={on(t, 2400 + i * 550) ? 'is-on' : ''}>{line}</p>
        ))}
      </div>
      <div className={`aus-cite${on(t, 4300) ? ' is-on' : ''}`}>
        <span className="aus-cite-fav">WV</span>
        <span className="aus-cite-txt"><b>Website Vikreta</b><small>AI Search Visibility · AEO &amp; GEO</small></span>
        <span className="aus-cite-tick">Cited ✓</span>
      </div>
      <span className={`aus-chip${on(t, 6600) ? ' is-on' : ''}`}>3 engines checked · where you appear</span>
    </div>
  )
}

function SignalsPanel({ t }: { t: number }) {
  return (
    <div className="aus-p aus-signals">
      <div className="aus-ph"><span className="aus-ph-t"><Mark k="gemini" fallback="G" s={15} />What we change</span><small>On your site</small></div>
      <div className="aus-checks">
        {SIGNALS.map((s) => (
          <div key={s.n} className={`aus-check${on(t, s.at) ? ' is-on' : ''}`}><span>✓</span>{s.n}</div>
        ))}
      </div>
      <p className="aus-note">No one can guarantee a citation. We improve the signals engines use, then check where you show up.</p>
    </div>
  )
}

export default function AiSearchVisibilityHeroArt() {
  const { ref, t } = useClock(END, 3600, START)
  const reduce = !!useReducedMotion()
  return (
    <section className="aus-stage" ref={ref} aria-hidden>
      <div className="aus-board">
        <div className="aus-top">
          <span className="aus-brand"><b>Answer engine desk</b> · be the source AI quotes</span>
          <span className="aus-live"><span className="aus-dot" />3 engines watched</span>
        </div>
        <QueryStrip t={t} reduce={reduce} />
        <div className="aus-grid">
          <AnswerPanel t={t} />
          <SignalsPanel t={t} />
        </div>
        <div className="aus-foot">
          <span>SEO &amp; GEO foundations</span><i>·</i><span>Content systems</span><i>·</i><span>Paid &amp; local</span>
        </div>
      </div>
      <p className="wv-sr">A buyer asks ChatGPT, Perplexity and Google AI who does GEO. An answer forms with a citation to Website Vikreta, backed by the signals we change: answer-first content, schema markup, entity signals, crawler access and internal links.</p>
    </section>
  )
}
