import { notFound } from 'next/navigation'
import { AutomationShell, BranchHero, Crumbs, CtaBlock, Faq, JsonLd, LogoRail, PairsWith, ProductList, ProofBar, Reading, ScenarioCards, Shifts, VideoSlot } from '@/components/wv/automation'
import { BranchSignature } from '@/components/wv/automation/signatures'
import { BASE, BRANCHES, branchParams, getBranch, PERSONAS } from '@/content/ai-automations'
import { branchMetadata, branchSchema } from '@/lib/ai-automations-seo'
import '../pages.css'

export const dynamicParams = false
export const generateStaticParams = branchParams

type P = { params: Promise<{ branch: string }> }

export async function generateMetadata({ params }: P) {
  const b = getBranch((await params).branch)
  return b ? branchMetadata(b) : {}
}

export default async function Page({ params }: P) {
  const b = getBranch((await params).branch)
  if (!b) notFound()
  const persona = PERSONAS[b.persona]
  const wa = `Hi, I'm interested in ${b.name}`
  return (
    <AutomationShell>
      <JsonLd data={branchSchema(b)} />
      <main className="wv-axp-main wv-ax-glow">
        <BranchHero branch={b} />
        <ProofBar clients={b.clients} />
        <BranchSignature branch={b} />
        <ProductList branch={b} persona={persona} />
        <Shifts shifts={b.shifts} />
        <ScenarioCards scenarios={b.scenarios} />
        <VideoSlot video={b.video} />
        <LogoRail keys={b.tools} />
        <PairsWith branch={b} />
        <Reading hrefs={b.reading} seed={BRANCHES.indexOf(b)} />
        <Faq faqs={b.faqs} />
        <Crumbs items={[{ label: 'Home', href: '/' }, { label: 'AI Automations', href: BASE }, { label: b.name, href: `${BASE}/${b.slug}` }]} />
        <CtaBlock title={['Get my', b.name, 'plan']} interest={b.name} source={`ai-automations/${b.slug}`} waText={wa} />
      </main>
    </AutomationShell>
  )
}
