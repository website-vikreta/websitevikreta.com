'use client'

import { TOOL_LOGOS } from '@/content/ai/logos'

/** The three service flows used in the pillar hero board and on each service card.
 * `t` is a shared millisecond clock; SSR / reduced motion pass the final frame.
 * Same component at both sizes so a card and its hero tell the same story.
 */

const on = (t: number, at: number) => t >= at

function Mark({ k, letter, s = 14 }: { k: string; letter: string; s?: number }) {
  const l = TOOL_LOGOS[k]
  return l
    ? // eslint-disable-next-line @next/next/no-img-element -- tiny third-party brand logo, images are unoptimized
      <img src={l.src} alt={l.name} width={s} height={s} style={{ width: s, height: s }} />
    : <i className="mk-letter" style={{ width: s, height: s }}>{letter}</i>
}

function Stage({ at, t, n, title, children }: { at: number; t: number; n: number; title: string; children: React.ReactNode }) {
  return (
    <div className={`mk-stage${on(t, at) ? ' is-on' : ''}`}>
      <span className="mk-stage-n">{n}</span>
      <span className="mk-stage-b"><b>{title}</b><span className="mk-stage-d">{children}</span></span>
    </div>
  )
}

function SceneHead({ icon, label, letter, live }: { icon: string; label: string; letter: string; live: string }) {
  return (
    <div className="mk-sc-head">
      <span className="mk-sc-name"><Mark k={icon} letter={letter} s={15} />{label}</span>
      <span className="mk-sc-live"><i />{live}</span>
    </div>
  )
}

function Final({ t, at, children }: { t: number; at: number; children: React.ReactNode }) {
  return <span className={`mk-final${on(t, at) ? ' is-on' : ''}`}>{children}</span>
}

export function SeoFlow({ t }: { t: number }) {
  return (
    <div className="mk-scene">
      <SceneHead icon="google" letter="G" label="SEO foundations" live="site check" />
      <div className="mk-stages">
        <Stage at={400} t={t} n={1} title="Crawl audit">
          <span className="mk-tag">robots ✓</span><span className="mk-tag">sitemap ✓</span>
          <span className={`mk-tag is-fix${on(t, 1400) ? ' is-on' : ''}`}>404s fixed</span>
        </Stage>
        <Stage at={1900} t={t} n={2} title="Fix the templates">
          <span className="mk-line" /> <span className="mk-line is-short" />
        </Stage>
        <Stage at={3100} t={t} n={3} title="Found locally">
          <span className="mk-result"><i>WV</i><b>websitevikreta.com</b><small>Service page · Google + Maps</small></span>
        </Stage>
      </div>
      <Final t={t} at={4300}>Crawlable, fast, consistent ✓</Final>
    </div>
  )
}

export function GeoFlow({ t }: { t: number }) {
  return (
    <div className="mk-scene">
      <SceneHead icon="openai" letter="C" label="AEO & GEO" live="answer check" />
      <div className="mk-stages">
        <Stage at={500} t={t} n={1} title="Buyer prompt">
          <span className="mk-quote">“Who does SEO in Pune?”</span>
        </Stage>
        <Stage at={1800} t={t} n={2} title="Three answer engines">
          <span className="mk-engine"><Mark k="openai" letter="C" s={12} />ChatGPT</span>
          <span className="mk-engine"><Mark k="" letter="P" s={12} />Perplexity</span>
          <span className="mk-engine"><Mark k="gemini" letter="G" s={12} />Google AI</span>
        </Stage>
        <Stage at={3200} t={t} n={3} title="Answer cites the source">
          <span className="mk-cite"><i>WV</i><b>Website Vikreta</b><small>SEO &amp; GEO · cited source</small></span>
        </Stage>
      </div>
      <Final t={t} at={4500}>Cited, not guessed ✓</Final>
    </div>
  )
}

export function ContentFlow({ t }: { t: number }) {
  return (
    <div className="mk-scene">
      <SceneHead icon="wordpress" letter="W" label="Content systems" live="publish" />
      <div className="mk-stages">
        <Stage at={600} t={t} n={1} title="Research the question">
          <span className="mk-tag">search intent</span><span className="mk-tag">real sources</span>
        </Stage>
        <Stage at={2000} t={t} n={2} title="Draft, edit, approve">
          <span className="mk-line" /> <span className="mk-line is-short" />
          <span className="mk-tag is-check">human edit ✓</span>
        </Stage>
        <Stage at={3400} t={t} n={3} title="Publish and link">
          <span className="mk-tag">blog post</span><span className="mk-tag">service page</span><span className="mk-tag">internal link</span>
        </Stage>
      </div>
      <Final t={t} at={4700}>Still working after launch ✓</Final>
    </div>
  )
}

export const FLOWS = { 'seo-foundations': SeoFlow, 'aeo-geo': GeoFlow, 'content-systems': ContentFlow } as const
export type FlowSlug = keyof typeof FLOWS
