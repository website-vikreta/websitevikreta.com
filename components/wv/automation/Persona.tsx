import Image from 'next/image'
import type { Persona } from '@/content/ai-automations/types'

type Size = 'sm' | 'md' | 'lg'
// Source images are ~280-500px wide; sizes never exceed that.
const PX: Record<Size, number> = { sm: 96, md: 200, lg: 280 }

export function PersonaCutout({ persona, view = 'front', size = 'md', label = true, preload }: { persona: Persona; view?: 'front' | 'threeQuarter'; size?: Size; label?: boolean; preload?: boolean }) {
  return (
    <figure className={`wv-ax-cut is-${size}`} style={{ ['--w' as string]: `${PX[size]}px` }}>
      <div className="wv-ax-cut-img">
        <Image src={persona.img[view]} alt={persona.img.alt} fill sizes={`${PX[size]}px`} preload={preload} />
      </div>
      {label && (
        <figcaption className="wv-ax-cut-pill">
          <span className="wv-dot" aria-hidden /> {persona.name} · {persona.role}
        </figcaption>
      )}
    </figure>
  )
}

/** Round face. Decorative by default (name sits next to it). */
export function Avatar({ persona, px = 44 }: { persona: Persona; px?: number }) {
  return (
    <span className="wv-ax-av" style={{ width: px, height: px }}>
      <Image src={persona.img.front} alt="" fill sizes={`${px}px`} />
    </span>
  )
}
