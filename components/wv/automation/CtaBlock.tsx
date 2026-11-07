import { PERSONAS } from '@/content/ai-automations/personas'
import { KineticTitle, Reveal } from '../ui'
import { LeadForm } from './LeadForm'
import { Avatar } from './Persona'
import { WaButton } from './WaButton'

export function CtaBlock({ title, interest, source, waText }: { title: string[]; interest: string; source: string; waText: string }) {
  return (
    <section className="wv-ax-cta">
      <div className="wv-wrap wv-ax-cta-in">
        <div className="wv-ax-cta-l">
          <KineticTitle lines={title} className="wv-h2 wv-ax-h2 is-light" accent={title.length - 1} />
          <div className="wv-ax-faces">
            {Object.values(PERSONAS).map((p) => (
              <Avatar key={p.id} persona={p} px={64} />
            ))}
          </div>
          <WaButton text={waText} variant="y" />
        </div>
        <Reveal className="wv-ax-cta-form">
          <LeadForm interest={interest} source={source} />
        </Reveal>
      </div>
    </section>
  )
}
