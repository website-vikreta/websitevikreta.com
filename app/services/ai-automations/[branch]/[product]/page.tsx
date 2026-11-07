import { notFound } from 'next/navigation'
import { AutomationShell, BranchHero, CaseStudy, Crumbs, CtaBlock, Faq, HowItRuns, IncludeExclude, JsonLd, ProofBar, Reading, RelatedProducts, Shifts } from '@/components/wv/automation'
import { BASE, BRANCHES, getBranch, getProduct, productParams } from '@/content/ai-automations'
import { productMetadata, productSchema } from '@/lib/ai-automations-seo'
import '../../pages.css'

export const dynamicParams = false
export const generateStaticParams = productParams

type P = { params: Promise<{ branch: string; product: string }> }

export async function generateMetadata({ params }: P) {
  const { branch, product } = await params
  const b = getBranch(branch)
  const p = getProduct(branch, product)
  return b && p?.page ? productMetadata(b, p) : {}
}

export default async function Page({ params }: P) {
  const { branch, product } = await params
  const b = getBranch(branch)
  const p = getProduct(branch, product)
  if (!b || !p?.page) notFound()
  const pg = p.page
  const wa = `Hi, I'm interested in ${p.name}`

  return (
    <AutomationShell>
      <JsonLd data={productSchema(b, p)} />
      <main className="wv-axp-main">
        <BranchHero branch={b} product={p} />
        <ProofBar clients={b.clients} />
        <CaseStudy cs={p.caseStudy} productName={p.name} />
        <HowItRuns demo={pg.demo} />
        <Shifts shifts={pg.shifts ?? b.shifts} />
        <IncludeExclude product={p} />
        <RelatedProducts branch={b} product={p} related={pg.related} />
        <Reading hrefs={p.reading ?? b.reading} seed={BRANCHES.indexOf(b) + 1} title={['Further', 'reading']} />
        <Faq faqs={pg.faqs} />
        <Crumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'AI Automations', href: BASE },
            { label: b.name, href: `${BASE}/${b.slug}` },
            { label: p.name, href: `${BASE}/${b.slug}/${p.slug}` },
          ]}
        />
        <CtaBlock title={['Get', p.name]} interest={p.name} source={`ai-automations/${b.slug}/${p.slug}`} waText={wa} />
      </main>
    </AutomationShell>
  )
}
