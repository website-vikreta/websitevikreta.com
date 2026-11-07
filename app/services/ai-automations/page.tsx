import Link from 'next/link'
import { AllServices, AutomationShell, Avatar, Reading, Crumbs, CtaBlock, Faq, HubHero, JsonLd, ProofBar, ScenarioCards, Sec } from '@/components/wv/automation'
import { Arrow } from '@/components/wv/ui'
import { BASE, BLOG, BRANCHES, HUB, PERSONAS, toolLogos } from '@/content/ai-automations'
import { HubDesk } from '@/components/wv/automation/signatures'
import { hubMetadata, hubSchema } from '@/lib/ai-automations-seo'
import { ProblemPicker } from './ProblemPicker'
import './pages.css'

export const metadata = hubMetadata()

const people = Object.values(PERSONAS)
const ROLE3: Record<string, string> = { meher: 'HR and workflows', ira: 'Content and ads', arjun: 'Calls, sales, money' }

export default function Page() {
  return (
    <AutomationShell>
      <JsonLd data={hubSchema()} />
      <main className="wv-axp-main">
        <HubHero hub={HUB} />
        <ProofBar clients={['simpli-home', 'blancora', 'sbp', 'raicoon', 'tocal', 'carelift']} />
        <HubDesk hub={HUB} />

        <Sec id="picker" title={["What's eating", 'your week?']}>
          <ProblemPicker problems={HUB.problems} personas={PERSONAS} base={BASE} />
        </Sec>

        <Sec id="branches" title={['Eight things', 'we automate']}>
          <div className="wv-axp-idx">
            {BRANCHES.map((b) => (
              <Link key={b.slug} href={`${BASE}/${b.slug}`} className="wv-axp-idx-row">
                <span className="wv-axp-idx-t">
                  <strong>{b.name}</strong>
                  <span>{b.usp}</span>
                </span>
                <span className="wv-axp-logos">
                  {toolLogos(b.tools.slice(0, 4)).map((l) => (
                    // eslint-disable-next-line @next/next/no-img-element -- svg logo
                    <img key={l.src} src={l.src} alt={l.alt} />
                  ))}
                </span>
                <Arrow size={18} />
              </Link>
            ))}
          </div>
        </Sec>

        <ScenarioCards scenarios={HUB.scenarios} />

        <section className="wv-ax-sec wv-axp-band" id="agents">
          <div className="wv-wrap wv-axp-band-in">
            <h2>The AI agents behind the work</h2>
            <ul>
              {people.map((p) => (
                <li key={p.id}>
                  <Avatar persona={p} px={40} />
                  <span><strong>{p.name}</strong> {ROLE3[p.id]}</span>
                </li>
              ))}
            </ul>
            <p>We run our own company on these automations too. <Link className="wv-ax-inl" href="#branches">See the eight services</Link>.</p>
          </div>
        </section>

        <AllServices />
        <Reading seed={0} hrefs={BLOG.slice(0, 3).map((x) => x.href)} />
        <Faq faqs={HUB.faqs} />
        <Crumbs items={[{ label: 'Home', href: '/' }, { label: 'AI Automations', href: BASE }]} />
        <CtaBlock title={['Get my', 'automation plan']} interest="AI automation plan" source="ai-automations-hub" waText="Hi, I'd like an AI automation plan" />
      </main>
    </AutomationShell>
  )
}
