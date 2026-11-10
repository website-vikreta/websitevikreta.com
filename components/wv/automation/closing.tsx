import Link from 'next/link'
import Image from 'next/image'
import type { Faq as FaqT } from '@/content/ai-automations/types'
import { clientLogos } from '@/content/ai-automations/logos'
import { PERSONAS } from '@/content/ai-automations/personas'
import { fetchPostCards } from '@/sanity/lib/fetch'
import { Arrow, KineticTitle, Reveal } from '../ui'
import { LeadForm } from './LeadForm'
import { Avatar } from './Persona'
import { RichText } from './RichText'
import { WaButton } from './WaButton'
import './closing.css'

/** Shared closing blocks for every AI automations page: client logos, blog cards, split FAQ, closing CTA. */

export function ClientLogos({ clients }: { clients: string[] }) {
  const logos = clientLogos(clients.length ? clients : ['simpli-home', 'blancora', 'sbp'])
  return (
    <section className="axc-logos" aria-label="Clients">
      <div className="wv-wrap axc-logos-in">
        <ul>
          {logos.map((l) => (
            <li key={l.src}>
              {/* eslint-disable-next-line @next/next/no-img-element -- svg/png client marks */}
              <img src={l.src} alt={l.alt} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const slugOf = (href: string) => href.split('/').pop()!

/** Up to 3 posts with Sanity thumbnail + excerpt; falls back to the title if Sanity has nothing. */
export async function ReadCards({ posts, title = ['Keep', 'reading'] }: { posts: { href: string; title: string }[]; title?: string[] }) {
  const shown = posts.slice(0, 3)
  const cards = await fetchPostCards(shown.map((p) => slugOf(p.href)))
  return (
    <section className="wv-sec axc-read">
      <div className="wv-wrap">
        <div className="wv-sec-head">
          <KineticTitle lines={title} className="wv-h2" accent={title.length - 1} />
          <div className="wv-sec-aside">
            <Link href="/blog" className="wv-link">All articles <Arrow size={14} /></Link>
          </div>
        </div>
        <ul className="axc-posts">
          {shown.map((b, i) => {
            const c = cards.find((x) => x.slug === slugOf(b.href))
            return (
              <li key={b.href}>
                <Reveal delay={i * 0.06}>
                  <Link href={b.href}>
                    <span className="axc-post-img">{c?.imageUrl && <Image src={c.imageUrl} alt="" fill sizes="(min-width:960px) 400px, 100vw" />}</span>
                    <strong>{c?.title ?? b.title}</strong>
                    {c?.excerpt && <span className="axc-post-x">{c.excerpt}</span>}
                    <span className="axc-post-go">Read <Arrow size={14} /></span>
                  </Link>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/** Native <details>: every answer is in the server HTML. */
export function SplitFaq({ faqs, updated }: { faqs: FaqT[]; updated?: string }) {
  return (
    <section className="wv-sec axc-faq" id="faq">
      <div className="wv-wrap axc-faq-in">
        <div className="axc-faq-head">
          <KineticTitle lines={['Questions', 'people ask']} className="wv-h2" accent={1} />
          <p>Not on the list? <a href="#lead" className="wv-link">Ask us directly <Arrow size={14} /></a></p>
          {updated && (
            <p className="axc-faq-upd">
              Updated <time dateTime={updated}>{new Date(`${updated}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</time>
            </p>
          )}
        </div>
        <div className="axc-faq-list">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>
                <span>{f.q}</span>
                <span className="axc-plus" aria-hidden />
              </summary>
              <p><RichText text={f.a} /></p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function GradientCta({ title, interest, source, waText }: { title: string[]; interest: string; source: string; waText: string }) {
  return (
    <section className="axc-cta">
      <div className="wv-wrap axc-cta-in">
        <div className="axc-cta-l">
          <KineticTitle lines={title} className="wv-h2" />
          <p className="axc-cta-p">Tell us what eats your week. We come back with what we would automate first, and what it takes.</p>
          <div className="axc-cta-faces">
            {Object.values(PERSONAS).map((p) => <Avatar key={p.id} persona={p} px={56} />)}
            <span>Meher, Ira and Arjun are on it.</span>
          </div>
          <WaButton text={waText} />
        </div>
        <div className="axc-cta-form">
          <LeadForm interest={interest} source={source} />
        </div>
      </div>
    </section>
  )
}
