import Link from 'next/link'
import { AutomationShell, CtaBlock, Faq, HubHero, JsonLd, ProofBar, Reading } from '@/components/wv/automation'
import { HubDesk } from '@/components/wv/automation/signatures'
import { Arrow, KineticTitle } from '@/components/wv/ui'
import { BASE, BLOG, BRANCHES, HUB, toolLogos } from '@/content/ai-automations'
import { hubMetadata, hubSchema } from '@/lib/ai-automations-seo'
import { Week } from './Week'
import './hub.css'

export const metadata = hubMetadata()

const CLIENTS = ['simpli-home', 'blancora', 'sbp', 'raicoon', 'tocal', 'carelift']

function Head({ title, children }: { title: string[]; children?: React.ReactNode }) {
  return (
    <div className="wv-sec-head">
      <KineticTitle lines={title} className="wv-h2" accent={title.length - 1} />
      {children && <div className="wv-sec-aside">{children}</div>}
    </div>
  )
}

export default function Page() {
  return (
    <AutomationShell>
      <JsonLd data={hubSchema()} />
      <main className="axh wv-ax-glow">
        <HubHero hub={HUB} />

        <ProofBar clients={CLIENTS} />

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

        <Reading seed={0} hrefs={BLOG.slice(0, 3).map((x) => x.href)} />
        <Faq faqs={HUB.faqs} />
        <CtaBlock title={['Get my', 'automation plan']} interest="AI automation plan" source="ai-automations-hub" waText="Hi, I'd like an AI automation plan" />
      </main>
    </AutomationShell>
  )
}
