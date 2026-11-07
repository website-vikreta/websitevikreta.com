import Link from 'next/link'
import Image from 'next/image'
import type { Branch, Faq as FaqT, Persona, Product, Scenario, Shift } from '@/content/ai-automations/types'
import { TOOL_LOGOS, clientLogos, toolLogos } from '@/content/ai-automations/logos'
import { PrefillLink } from './LeadForm'
import { RichText } from './RichText'
import { Arrow, KineticTitle, Reveal, VelocityMarquee } from '../ui'

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

/** Section wrapper: statement head + content, tight. */
function Sec({ id, title, accent, children, className = '' }: { id?: string; title?: string[]; accent?: number; children: React.ReactNode; className?: string }) {
  return (
    <section className={`wv-ax-sec ${className}`} id={id}>
      <div className="wv-wrap">
        {title && <KineticTitle lines={title} className="wv-h2 wv-ax-h2" accent={accent ?? title.length - 1} />}
        {children}
      </div>
    </section>
  )
}

export function ProofBar({ clients, number = true }: { clients: string[]; number?: boolean }) {
  const logos = clientLogos(clients.length ? clients : ['simpli-home', 'blancora', 'sbp'])
  return (
    <section className="wv-ax-proof">
      <div className="wv-wrap wv-ax-proof-in">
        {number && (
          <p className="wv-ax-proof-n">
            <strong>20 hrs → 1 hr</strong>
            <span>a week of manual work, Simpli Home</span>
          </p>
        )}
        <ul className="wv-ax-proof-logos" aria-label="Clients">
          {logos.map((l) => (
            <li key={l.src}>
              {/* eslint-disable-next-line @next/next/no-img-element -- svg/png client marks */}
              <img src={l.src} alt={l.alt} style={{ height: Math.max(32, Math.min(l.h ?? 32, 40)) }} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const CHANNEL_KEY: Record<string, string> = { Email: 'gmail', WhatsApp: 'whatsapp', Slack: 'slack', SMS: 'twilio', 'Web chat': 'intercom' }

function Channels({ list }: { list?: string[] }) {
  const logos = (list ?? []).flatMap((c) => (CHANNEL_KEY[c] ? [TOOL_LOGOS[CHANNEL_KEY[c]]] : []))
  if (!logos.length) return null
  return (
    <span className="wv-ax-chs">
      {logos.map((l) => (
        // eslint-disable-next-line @next/next/no-img-element -- svg logo
        <img key={l.src} src={l.src} alt={l.name} />
      ))}
    </span>
  )
}

function RowLogo({ list, tools }: { list?: string[]; tools: string[] }) {
  const k = (list ?? []).map((c) => CHANNEL_KEY[c]).find(Boolean) ?? tools[0]
  const l = TOOL_LOGOS[k]
  return l ? (
    // eslint-disable-next-line @next/next/no-img-element -- svg logo
    <img src={l.src} alt="" className="wv-ax-row-logo" />
  ) : <span className="wv-ax-row-logo" />
}

/** AEO answer (plain prose) then product rows with persona face and channel logos. */
export function ProductList({ branch, persona, title }: { branch: Branch; persona: Persona; title?: string[] }) {
  return (
    <Sec id="products" title={title ?? [`What ${persona.name}`, 'handles']}>
      <p className="wv-ax-answer"><RichText text={branch.answer} /></p>
      <div className="wv-ax-rows">
        {branch.products.map((p) => {
          const inner = (
            <>
              <RowLogo list={p.channels} tools={branch.tools} />
              <span className="wv-ax-row-t">
                <strong>{p.name}</strong>
                <span>{p.oneLiner}</span>
              </span>
              <Channels list={p.channels} />
              <span className="wv-ax-row-go" aria-hidden>
                <Arrow size={16} />
              </span>
            </>
          )
          return p.page ? (
            <Link key={p.slug} href={`/services/ai-automations/${branch.slug}/${p.slug}`} className="wv-ax-row">
              {inner}
            </Link>
          ) : (
            <PrefillLink key={p.slug} interest={p.name} className="wv-ax-row">
              {inner}
            </PrefillLink>
          )
        })}
      </div>
    </Sec>
  )
}

export function ScenarioCards({ scenarios, title }: { scenarios: Scenario[]; title?: string[] }) {
  return (
    <Sec title={title ?? ['Sound like', 'your week?']}>
      <div className={`wv-ax-scn is-${scenarios.length}`}>
        {scenarios.map((s, i) => (
          <Reveal key={s.industry + i} delay={i * 0.06} className="wv-ax-scn-card">
            <Image src={s.photo} alt={s.alt} fill sizes="(min-width:960px) 33vw, 100vw" />
            <div className="wv-ax-scn-tx">
              <b>{s.industry}</b>
              <p><RichText text={s.line} /></p>
            </div>
          </Reveal>
        ))}
      </div>
    </Sec>
  )
}

export function Shifts({ shifts, title }: { shifts: Shift[]; title?: string[] }) {
  return (
    <Sec title={title ?? ['Before', 'and after']}>
      <div className="wv-ax-shifts">
        {shifts.map((s, i) => (
          <Reveal key={i} delay={i * 0.06} className="wv-ax-shift">
            <del><RichText text={s.before} /></del>
            <span aria-hidden className="wv-ax-shift-ar">
              <Arrow size={22} />
            </span>
            <strong><RichText text={s.after} /></strong>
          </Reveal>
        ))}
      </div>
    </Sec>
  )
}

export function LogoRail({ keys, title }: { keys: string[]; title?: string[] }) {
  const items = toolLogos(keys)
  if (!items.length) return null
  return (
    <section className="wv-ax-sec wv-ax-rail">
      <div className="wv-wrap">
        <KineticTitle lines={title ?? ['Works with', 'your tools']} className="wv-h2 wv-ax-h2" accent={1} />
      </div>
      <VelocityMarquee items={items} baseVelocity={-2} className="wv-ax-rail-mq" />
    </section>
  )
}

export function IncludeExclude({ product }: { product: Product }) {
  return (
    <Sec title={['What you get', 'and what not']} accent={0}>
      <div className="wv-ax-ie">
        <ul className="is-yes">
          {product.includes.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
        <ul className="is-no">
          {product.excludes.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
    </Sec>
  )
}

export function Crumbs({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="wv-ax-crumbbar">
      <ol className="wv-wrap wv-ax-crumbs">
        {items.map((c, i) => (
          <li key={c.href}>
            {i < items.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            {i < items.length - 1 && <span aria-hidden> /</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Native <details>: every answer is in the server HTML. */
export function Faq({ faqs }: { faqs: FaqT[] }) {
  return (
    <Sec id="faq" title={['Questions', 'people ask']} className="wv-ax-faqsec">
      <div className="wv-ax-faq-list">
        {faqs.map((f, i) => (
          <details key={i} className="wv-acc wv-ax-acc">
            <summary className="wv-acc-btn">
              <span>{f.q}</span>
              <span className="wv-plus" aria-hidden />
            </summary>
            <div className="wv-acc-pad">
              <p><RichText text={f.a} /></p>
            </div>
          </details>
        ))}
      </div>
    </Sec>
  )
}

export { Sec }
