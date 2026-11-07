'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PersonaCutout } from '@/components/wv/automation'
import { Arrow } from '@/components/wv/ui'
import { PrefillLink } from '@/components/wv/automation/LeadForm'
import type { Persona, Problem } from '@/content/ai-automations/types'

type Props = { problems: Problem[]; personas: Record<string, Persona>; base: string }

export function ProblemPicker({ problems, personas, base }: Props) {
  const [on, setOn] = useState(problems[0].id)
  return (
    <>
      <div className="wv-axp-chips" role="group" aria-label="Pick what is eating your week">
        {problems.map((p) => (
          <button key={p.id} type="button" className="wv-axp-chip" aria-pressed={on === p.id} aria-controls={`fix-${p.id}`} onClick={() => setOn(p.id)}>
            {p.label}
          </button>
        ))}
      </div>
      <div aria-live="polite">
      {problems.map((p) => (
        <div key={p.id} id={`fix-${p.id}`} className="wv-axp-panel" hidden={on !== p.id}>
          <PersonaCutout persona={personas[p.persona]} size="md" />
          <div>
            <p>{p.fix}</p>
            <div className="wv-cta-row">
              <PrefillLink className="wv-btn wv-btn-y" interest={p.label}>
                Get this fixed <Arrow size={15} />
              </PrefillLink>
              <Link className="wv-btn wv-btn-ghost" href={`${base}/${p.branch}`}>
                See how
              </Link>
            </div>
          </div>
        </div>
      ))}
      </div>
    </>
  )
}
