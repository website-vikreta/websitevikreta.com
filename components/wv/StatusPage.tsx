'use client'

import type { ReactNode } from 'react'
import '@/app/wv.css'
import { wvFonts } from './fonts'
import { KineticTitle, Reveal } from './ui'

/** Shared 404 / 500 layout in the homepage wv type: Anton display H1, Inter Tight body. */
export function StatusPage({ code, title, text, children }: { code: string; title: string; text: string; children: ReactNode }) {
  return (
    <div className={`wv ${wvFonts}`}>
      <section className="wv-hero" aria-label={title}>
        <div className="wv-grid-bg" aria-hidden />
        <div className="wv-wrap relative z-1 flex flex-1 flex-col justify-center pb-20">
          <h1 className="wv-h1">
            <KineticTitle as="span" lines={[code, title]} accent={0} delay={0.1} />
          </h1>
          <Reveal delay={0.45} className="wv-hero-sub">
            <p>{text}</p>
            <div className="wv-cta-row">{children}</div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
