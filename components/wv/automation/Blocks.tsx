import Link from 'next/link'
import type { Branch, CaseStudy as CaseT, Demo, Product } from '@/content/ai-automations/types'
import { BASE, BRANCHES, PERSONAS, getProduct } from '@/content/ai-automations'
import { CLIENTS } from '@/content/ai-automations/logos'
import { blogList, readingFor, pairsWithOf } from '@/content/ai-automations/links'
import { showPlaceholders } from '@/lib/ai-automations-seo'
import { Arrow } from '../ui'
import { Avatar } from './Persona'
import { DemoSlot } from './DemoSlot'
import { PrefillLink } from './LeadForm'
import { RichText } from './RichText'
import { Sec } from './Sections'
import { ReadCards } from './closing'

export function CaseStudy({ cs, productName }: { cs?: CaseT; productName: string }) {
  if (!cs) {
    return (
      <Sec title={['Be our next', 'case study']} accent={1}>
        <div className="wv-ax-cs is-next">
          <p>We are collecting results for {productName}. Run it first, and we will write up what it did for you.</p>
          <PrefillLink interest={`${productName} (case study)`} className="wv-btn wv-btn-primary">Start with {productName}</PrefillLink>
        </div>
      </Sec>
    )
  }
  const logo = CLIENTS[cs.client]
  const ph = cs.placeholder
  if (ph && !showPlaceholders()) return null
  return (
    <Sec title={['Case', 'study']} accent={1}>
      <article className="wv-ax-cs">
        <header>
          {logo && (
            // eslint-disable-next-line @next/next/no-img-element -- client mark
            <img src={logo.src} alt={logo.alt} className="wv-ax-cs-logo" />
          )}
          <h3>{cs.title}</h3>
          {ph && <em className="wv-ax-ph">Placeholder, owner to confirm</em>}
        </header>
        <dl>
          <div><dt>The problem</dt><dd><RichText text={cs.problem} /></dd></div>
          <div><dt>What we built</dt><dd><RichText text={cs.built} /></dd></div>
          <div className="is-result"><dt>The result</dt><dd><RichText text={cs.result} /></dd></div>
        </dl>
      </article>
    </Sec>
  )
}

export function HowItRuns({ demo }: { demo: Demo }) {
  return (
    <Sec title={['How it', 'runs']} accent={1}>
      <div className="wv-ax-how"><DemoSlot demo={demo} /></div>
    </Sec>
  )
}

export function PairsWith({ branch }: { branch: Branch }) {
  const pair = pairsWithOf(branch.slug, branch.pairsWith)
  return (
    <Sec title={['Pairs well', 'with']} accent={1}>
      <div className="wv-ax-pairs">
        {pair.map((b) => (
          <Link key={b.slug} href={`${BASE}/${b.slug}`} className="wv-ax-rel">
            <span className="wv-ax-rel-top">
              <Avatar persona={PERSONAS[b.persona]} px={44} />
              <strong>{b.name}</strong>
            </span>
            <span className="wv-ax-rel-s">{PERSONAS[b.persona].name}: {b.usp}</span>
            <Arrow size={16} />
          </Link>
        ))}
      </div>
    </Sec>
  )
}

export function Reading({ hrefs, seed, title }: { hrefs?: string[]; seed: number; title?: string[] }) {
  return <ReadCards posts={readingFor(hrefs, seed)} title={title} />
}

/** 2 siblings + 1 cross-branch product; uses `page.related` first, tops up automatically. */
export function RelatedProducts({ branch, product, related }: { branch: Branch; product: Product; related: string[] }) {
  const seen = new Set([`${branch.slug}/${product.slug}`])
  const picks: { b: Branch; p: Product }[] = []
  const add = (b?: Branch, p?: Product) => {
    if (!b || !p || seen.has(`${b.slug}/${p.slug}`)) return
    seen.add(`${b.slug}/${p.slug}`)
    picks.push({ b, p })
  }
  related.forEach((r) => { const [bs, ps] = r.split('/'); add(BRANCHES.find((x) => x.slug === bs), getProduct(bs, ps)) })
  branch.products.forEach((p) => picks.filter((x) => x.b.slug === branch.slug).length < 2 && add(branch, p))
  if (!picks.some((x) => x.b.slug !== branch.slug)) {
    const other = BRANCHES.filter((b) => b.slug !== branch.slug)[BRANCHES.indexOf(branch) % (BRANCHES.length - 1)]
    add(other, other.products[0])
  }
  return (
    <Sec title={['Keep', 'exploring']} accent={1}>
      <div className="wv-axp-related">
        {picks.slice(0, 3).map(({ b, p }) => {
          const inner = (
            <>
              <span className="wv-ax-rel-top"><Avatar persona={PERSONAS[p.persona]} px={40} /><strong>{p.name}</strong></span>
              <span className="wv-ax-rel-s">{p.oneLiner}</span>
              <Arrow size={16} />
            </>
          )
          return p.page ? (
            <Link key={b.slug + p.slug} href={`${BASE}/${b.slug}/${p.slug}`} className="wv-ax-rel">{inner}</Link>
          ) : (
            <PrefillLink key={b.slug + p.slug} interest={p.name} className="wv-ax-rel">{inner}</PrefillLink>
          )
        })}
      </div>
      <p className="wv-ax-more">
        Part of <Link href={`${BASE}/${branch.slug}`} className="wv-ax-inl">{branch.name}</Link>. See the whole team on <Link href={BASE} className="wv-ax-inl">AI automations</Link>.
      </p>
    </Sec>
  )
}

export { blogList }
