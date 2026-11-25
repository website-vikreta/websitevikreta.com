import { LeadForm } from '../automation/LeadForm'
import { WaButton } from '../automation/WaButton'
import { KineticTitle } from '../ui'

/** Closing CTA for the SEO & GEO section. Uses the same light `.axc-cta` shell as
 * every AI page so the theme stays identical — only the copy is marketing-specific.
 * The section id is `marketing-lead`: LeadForm already owns `id="lead"`. */
export function MarketingCta({ title, interest, source, waText }: { title: string[]; interest: string; source: string; waText: string }) {
  return (
    <section className="axc-cta mk-cta" id="marketing-lead">
      <div className="wv-wrap axc-cta-in">
        <div className="axc-cta-l">
          <KineticTitle lines={title} className="wv-h2" />
          <p className="axc-cta-p">Tell us what is not working: rankings, traffic or leads. We will tell you straight what it takes to fix it, and what we do not do.</p>
          <div className="mk-cta-note">
            <span>SEO foundations</span><span>AEO &amp; GEO</span><span>Content systems</span>
          </div>
          <WaButton text={waText} />
        </div>
        <div className="axc-cta-form">
          <LeadForm interest={interest} source={source} topic="grow" />
        </div>
      </div>
    </section>
  )
}
