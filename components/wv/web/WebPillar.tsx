'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PILLAR } from '@/content/web/pillar'
import { WEB_PROJECTS } from '@/lib/work-data'
import { CLIENT_LOGOS } from '../data'
import { Arrow, HoverLetters, KineticTitle, Magnetic, Photo, Reveal, RotatingWord, ScrollWords, Star, VelocityMarquee } from '../ui'
import { Band, Faq, Process, Quote, Section, Stats } from './LeafPage'
import './web.css'

const SHOT = WEB_PROJECTS.find((p) => p.slug === 'ap-cleanco-site')!
const domain = (href: string) => href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '')

/** Desktop browser with a real client site, a phone wireframe and a vitals card. Readouts are illustrative words, no scores. */
function BuildStage() {
  return (
    <div className="wp-stage">
      <i className="cw-cross is-tl" aria-hidden />
      <i className="cw-cross is-tr" aria-hidden />
      <i className="cw-cross is-bl" aria-hidden />
      <i className="cw-cross is-br" aria-hidden />
      <Reveal className="wp-stage-desk">
        <span className="wp-dim" aria-hidden>1440</span>
        <div className="cw-browser">
          <div className="cw-browser-bar">
            <i /><i /><i />
            <span>{domain(SHOT.href)}</span>
          </div>
          <div className="cw-browser-shot">
            <Photo src={SHOT.image!} alt={SHOT.imageAlt!} priority sizes="(min-width: 960px) 40vw, 90vw" />
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.25} className="wp-stage-phone">
        <div className="wp-phone" aria-hidden>
          <b className="wp-phone-notch" />
          <i className="wp-ph-bar" />
          <b className="wp-ph-h" />
          <b className="wp-ph-h is-short" />
          <i className="wp-ph-p" />
          <i className="wp-ph-p is-short" />
          <span className="wp-ph-btn" />
          <i className="wp-ph-img" />
        </div>
        <span className="wp-dim" aria-hidden>390</span>
      </Reveal>
      <Reveal delay={0.45} className="wp-stage-vit">
        <div className="wp-vit" aria-hidden>
          <b>Core Web Vitals</b>
          {['Largest paint', 'Layout shift', 'Interaction'].map((k) => (
            <span key={k}>
              <i className="cw-dot" /> {k} <em>Good</em>
            </span>
          ))}
          <u>Passed</u>
        </div>
      </Reveal>
      <p className="wp-stage-cap">Example build. Real client site, illustrative readouts.</p>
    </div>
  )
}

function Hero() {
  return (
    <section className="cw-hero wp-hero">
      <div className="wv-grid-bg" aria-hidden />
      <div className="cw-glow" aria-hidden />
      <div className="cw-ghost-circle" aria-hidden />
      <div className="cw-cols" aria-hidden>
        <div className="wv-wrap">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>
      </div>
      <div className="wv-wrap cw-hero-in">
        <div className="cw-hero-copy">
          <nav className="wv-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>/<span aria-current="page">Web Design &amp; Development</span>
          </nav>
          <h1 className="wv-h1 is-long">
            <KineticTitle as="p" lines={PILLAR.h1} accent={2} delay={0.1} />
          </h1>
          <Reveal delay={0.45} className="cw-hero-sub">
            <p className="wv-page-lead">{PILLAR.lead}</p>
            <div className="wv-cta-row">
              <Magnetic>
                <Link href="/contact" className="wv-btn wv-btn-y">
                  Get a free website audit <Arrow size={15} />
                </Link>
              </Magnetic>
              <Link href="#proof" className="wv-btn wv-btn-ghost">
                See the work <Arrow size={15} />
              </Link>
            </div>
            <p className="cw-rot">
              Built to <RotatingWord words={PILLAR.words} />
            </p>
            <div className="cw-hero-proof">
              <a href="https://www.upwork.com/agencies/websitevikreta/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Star /> Top Rated on Upwork, with 100% Job Success
              </a>
            </div>
          </Reveal>
        </div>
        <BuildStage />
      </div>
      <div className="wv-wrap cw-hero-foot">
        <span>Trusted by founders at</span>
        <VelocityMarquee items={CLIENT_LOGOS} baseVelocity={-2} className="is-logos" />
      </div>
    </section>
  )
}

function GroupStrip() {
  return (
    <nav className="wp-strip" aria-label="Web services">
      <div className="wv-wrap wp-strip-in">
        {PILLAR.groups.map((g) => (
          <a key={g.id} href={`#${g.id}`}>
            <span className="wp-check" aria-hidden>
              <svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
            </span>
            <span>
              <b>{g.t}</b>
              <em>{g.strip}</em>
            </span>
          </a>
        ))}
      </div>
    </nav>
  )
}

function Friction() {
  const { friction } = PILLAR
  return (
    <section className="wv-sec cw-friction" id="friction">
      <div className="cw-cols" aria-hidden>
        <div className="wv-wrap">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>
      </div>
      <div className="wv-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <ScrollWords text={friction.statement} className="wv-big-p" />
        <ul className="cw-conn wp-pains">
          {friction.items.map((f, i) => (
            <li key={f.t}>
              <Reveal delay={0.04 * i}>
                <span className="cw-conn-n">0{i + 1}</span>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const GLYPHS = [
  <svg key="a" viewBox="0 0 24 24" aria-hidden><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /></svg>,
  <svg key="b" viewBox="0 0 24 24" aria-hidden><path d="M5 7h14l-1.5 9h-11zM9 7V5a3 3 0 0 1 6 0v2" /></svg>,
  <svg key="c" viewBox="0 0 24 24" aria-hidden><path d="M13 3 5 14h6l-1 7 8-11h-6z" /></svg>,
]

function Groups() {
  return (
    <section className="wv-sec wp-groups" id="services">
      <div className="wv-wrap">
        <Section title={['Pick your', 'starting point']} aside={<p>Three groups, nine services. Start with the one that fits, we will tell you if another one fits better.</p>} />
        <div className="wp-group-grid">
          {PILLAR.groups.map((g, i) => (
            <Reveal key={g.id} delay={0.06 * i}>
              <article className="wp-group" id={g.id}>
                <div className="wp-group-top">
                  <span className="wp-tile">{GLYPHS[i]}</span>
                  <span className="cw-conn-n">0{i + 1}</span>
                </div>
                <h3>{g.t}</h3>
                <p className="wp-group-d">{g.d}</p>
                <ul>
                  {g.rows.map((r) => (
                    <li key={r.t}>
                      <Link href={r.href}>
                        <span>
                          <b>
                            {r.t}
                            {r.tag && <em className="wv-chip">{r.tag}</em>}
                          </b>
                          <small>{r.d}</small>
                        </span>
                        <Arrow size={16} />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={g.href} className="wv-btn wv-btn-ghost wp-group-btn">
                  Explore {g.t} <Arrow size={15} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Hover or focus a row to swap the sticky image (desktop). On phones each row shows its own image. */
function Includes() {
  const [on, setOn] = useState(0)
  const cur = PILLAR.includes[on]
  return (
    <section className="wv-sec wp-inc" id="includes">
      <div className="wv-wrap">
        <Section title={['What every', 'build includes']} aside={<p>Whichever group you pick, these four come standard.</p>} />
        <div className="wp-inc-in">
          <ol className="wv-svc-list">
            {PILLAR.includes.map((r, i) => (
              <li key={r.t} className={`wp-inc-row${i === on ? ' is-on' : ''}`} onPointerEnter={() => setOn(i)} onFocus={() => setOn(i)}>
                <span className="wv-svc-n">0{i + 1}</span>
                <div>
                  <h3 className="wv-svc-t">
                    <HoverLetters text={r.t} />
                  </h3>
                  <p>{r.d}</p>
                  <Link href="/contact" className="wv-link">
                    {r.link} <Arrow size={14} />
                  </Link>
                  <div className="wp-inc-mimg">
                    <Photo src={r.img} alt={r.alt} sizes="100vw" />
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div className="wp-inc-panel">
            <Photo key={cur.img} src={cur.img} alt={cur.alt} sizes="(min-width: 960px) 40vw, 1px" className="wp-inc-fade" />
          </div>
        </div>
      </div>
    </section>
  )
}

function AfterLaunch() {
  return (
    <section className="wv-sec wp-after" aria-label="After launch">
      <div className="wv-wrap">
        <KineticTitle lines={['Friday night.', 'Something breaks.', 'We pick up.']} accent={2} className="wv-h2 wp-after-h" />
        <ol className="wp-after-cols">
          {PILLAR.support.map((s, i) => (
            <li key={s.t}>
              <Reveal delay={0.06 * i}>
                <div className="wp-after-img">
                  <Photo src={s.img} alt={s.alt} sizes="(min-width: 960px) 30vw, 85vw" />
                </div>
                <span className="cw-conn-n">0{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function ProofGrid() {
  const cards = PILLAR.proof.slugs.map((s) => WEB_PROJECTS.find((p) => p.slug === s)!)
  return (
    <section className="wv-sec" id="proof">
      <div className="wv-wrap">
        <Section
          title={['The work', 'is live']}
          aside={
            <p>
              Real clients, live sites. Click through and check.{' '}
              <Link href="/work" className="wv-link">
                All work <Arrow size={14} />
              </Link>
            </p>
          }
        />
        <ul className="wp-proof">
          {cards.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={0.05 * (i % 3)}>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="wp-proof-card">
                  <div className="cw-browser">
                    <div className="cw-browser-bar">
                      <i /><i /><i />
                      <span>{domain(p.href)}</span>
                    </div>
                    <div className="cw-browser-shot">
                      <Photo src={p.image!} alt={p.imageAlt!} sizes="(min-width: 960px) 30vw, (min-width: 720px) 45vw, 90vw" />
                    </div>
                  </div>
                  <span className="cw-conn-n">{String.fromCharCode(65 + i)}</span>
                  <h3>{p.title}</h3>
                  <div className="cw-case-tags">
                    {p.skills.split(' / ').map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  {PILLAR.proof.metric[p.slug] && <em className="wv-chip">{PILLAR.proof.metric[p.slug]}</em>}
                  <span className="wv-link">
                    Visit site <Arrow size={14} />
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function WebPillar() {
  return (
    <main className="cw-page wp-page">
      <Hero />
      <GroupStrip />
      <Friction />
      <Groups />
      <Band band={PILLAR.band} />
      <Includes />
      <Process steps={PILLAR.steps} title={['How we', 'work']} />
      <AfterLaunch />
      <Stats items={PILLAR.stats} />
      <ProofGrid />
      <Quote />
      <Faq faqs={PILLAR.faqs} title={['Questions', 'people ask']} />
    </main>
  )
}
