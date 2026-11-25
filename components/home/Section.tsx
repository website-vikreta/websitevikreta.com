import type { ReactNode } from 'react'

export function Section({ id, labelledBy, className = '', children }: { id?: string; labelledBy: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`home-section ${className}`}>
      <div className="container">{children}</div>
    </section>
  )
}
