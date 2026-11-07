import Link from 'next/link'
import Image from 'next/image'
import { AutomationShell, Avatar, HubHero, JsonLd, LeadForm, RichText, WaButton } from '@/components/wv/automation'
import { HubDesk } from '@/components/wv/automation/signatures'
import { clientLogos } from '@/content/ai-automations/logos'
import { Arrow, KineticTitle, Reveal } from '@/components/wv/ui'
import { BASE, BLOG, BRANCHES, HUB, PERSONAS, toolLogos } from '@/content/ai-automations'
import { hubMetadata, hubSchema } from '@/lib/ai-automations-seo'
import { fetchPostCards } from '@/sanity/lib/fetch'
import { Week } from './Week'
import './hub.css'

export const metadata = hubMetadata()

const CLIENTS = clientLogos(['simpli-home', 'blancora', 'sbp', 'raicoon', 'tocal', 'carelift'])
const READ = BLOG.slice(0, 3)
const slugOf = (href: string) => href.split('/').pop()!

function Head({ title, children }: { title: string[]; children?: React.ReactNode }) {
  return (
    <div className="wv-sec-head">
      <KineticTitle lines={title} className="wv-h2" accent={title.length - 1} />
      {children && <div className="wv-sec-aside">{children}</div>}
    </div>
  )
}

export default async function Page() {
  const cards = await fetchPostCards(READ.map((b) => slugOf(b.href)))
  const card = (href: string) => cards.find((c) => c.slug === slugOf(href))

  return (
    <AutomationShell>
      <JsonLd data={hubSchema()} />
      <main className="axh">
        <HubHero hub={HUB} />

        <section className="axh-logos" aria-label="Clients">
          <div className="wv-wrap axh-logos-in">
            <p className="wv-eyebrow">( Running for )</p>
            <ul>
              {CLIENTS.map((l) => (
                <li key={l.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- svg/png client marks */}
                  <img src={l.src} alt={l.alt} loading="lazy" />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Week problems={HUB.problems} base={BASE} />

        <HubDesk />

        <section className="wv-sec" id="services">
          <div className="wv-wrap">
            <Head title={['Eight things', 'we automate']}>
              <p>{HUB.lead}</p>
            </Head>
            <ol className="axh-idx">
              {BRANCHES.map((b, i) => (
                <li key={b.slug} className="axh-idx-row">
                  <span className="axh-idx-n">{String(i + 1).padStart(2, '0')}</span>
                  <div className="axh-idx-main">
                    <h3><Link href={`${BASE}/${b.slug}`}>{b.name}</Link></h3>
                    <p>{b.usp}</p>
                  </div>
                  <ul className="axh-idx-sub" aria-label={`${b.name} services`}>
                    {b.products.filter((p) => p.page).map((p) => (
                      <li key={p.slug}><Link href={`${BASE}/${b.slug}/${p.slug}`}>{p.name}</Link></li>
                    ))}
                  </ul>
                  <span className="axh-idx-logos" aria-hidden>
                    {toolLogos(b.tools.slice(0, 4)).map((l) => (
                      // eslint-disable-next-line @next/next/no-img-element -- svg logo
                      <img key={l.src} src={l.src} alt="" loading="lazy" />
                    ))}
                  </span>
                  <span className="axh-idx-go" aria-hidden><Arrow size={18} /></span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="wv-sec axh-read">
          <div className="wv-wrap">
            <Head title={['Keep', 'reading']}>
              <Link href="/blog" className="wv-link">All articles <Arrow size={14} /></Link>
            </Head>
            <ul className="axh-posts">
              {READ.map((b, i) => {
                const c = card(b.href)
                return (
                  <li key={b.href}>
                    <Reveal delay={i * 0.06}>
                    <Link href={b.href}>
                      <span className="axh-post-img">
                        {c?.imageUrl && <Image src={c.imageUrl} alt="" fill sizes="(min-width:960px) 400px, 100vw" />}
                      </span>
                      <strong>{c?.title ?? b.title}</strong>
                      {c?.excerpt && <span className="axh-post-x">{c.excerpt}</span>}
                      <span className="axh-post-go">Read <Arrow size={14} /></span>
                    </Link>
                    </Reveal>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        <section className="wv-sec axh-faq" id="faq">
          <div className="wv-wrap axh-faq-in">
            <div className="axh-faq-head">
              <KineticTitle lines={['Questions', 'people ask']} className="wv-h2" accent={1} />
              <p>Not on the list? <a href="#lead" className="wv-link">Ask us directly <Arrow size={14} /></a></p>
            </div>
            <div className="axh-faq-list">
              {HUB.faqs.map((f) => (
                <details key={f.q}>
                  <summary>
                    <span>{f.q}</span>
                    <span className="axh-plus" aria-hidden />
                  </summary>
                  <p><RichText text={f.a} /></p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="axh-cta">
          <div className="wv-wrap axh-cta-in">
            <div className="axh-cta-l">
              <p className="wv-eyebrow">( Free 20-minute call )</p>
              <KineticTitle lines={['Get my', 'automation plan']} className="wv-h2" />
              <p className="axh-cta-p">Tell us what eats your week. We come back with what we would automate first, and what it takes.</p>
              <div className="axh-cta-faces">
                {Object.values(PERSONAS).map((p) => <Avatar key={p.id} persona={p} px={56} />)}
                <span>Meher, Ira and Arjun are on it.</span>
              </div>
              <WaButton text="Hi, I'd like an AI automation plan" />
            </div>
            <div className="axh-cta-form">
              <LeadForm interest="AI automation plan" source="ai-automations-hub" />
            </div>
          </div>
        </section>
      </main>
    </AutomationShell>
  )
}
