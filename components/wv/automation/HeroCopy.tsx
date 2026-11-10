import type { Persona } from '@/content/ai-automations/types'
import { Arrow, KineticTitle, Magnetic, Star } from '../ui'
import { PrefillLink } from './LeadForm'
import { Avatar } from './Persona'
import { WaButton } from './WaButton'

type Props = { h1: string[]; sub: string; persona?: Persona; showBy?: boolean; interest: string; waText: string; rated?: boolean }

/** Hero text block shared by every hero. No eyebrow, no crumbs. */
export function HeroCopy({ h1, sub, persona, showBy = false, interest, waText, rated }: Props) {
  return (
    <div className="wv-ax-hc">
      <h1 className="wv-h1 wv-ax-h1">
        <KineticTitle as="span" lines={h1} delay={0.1} accent={h1.length - 1} />
      </h1>
      <p className="wv-ax-sub">{sub}</p>
      <div className="wv-cta-row">
        <Magnetic>
          <PrefillLink interest={interest} className="wv-btn wv-btn-y">
            Get my plan <Arrow size={15} />
          </PrefillLink>
        </Magnetic>
        <WaButton text={waText} />
      </div>
      {rated && <p className="wv-ax-rated"><Star className="wv-ax-star" /> Top Rated on Upwork, with 100% Job Success</p>}
      {persona && showBy && (
        <p className="wv-ax-by">
          <Avatar persona={persona} px={32} /> {persona.name} · {persona.role}
        </p>
      )}
    </div>
  )
}
