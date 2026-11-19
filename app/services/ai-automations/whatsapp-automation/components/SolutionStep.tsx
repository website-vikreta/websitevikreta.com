import type { ReactNode } from 'react'

/* One step of the "fix the leak" flow. Same title and intro treatment for every step,
   so the checkout fix, the recovery messages, the AI chat and the COD confirmation read as one sequence. */
export default function SolutionStep({
  id,
  title,
  intro,
  introClassName = '',
}: {
  id: string
  title: ReactNode
  intro: ReactNode
  introClassName?: string
}) {
  return (
    <div className="pt-2 md:pt-4">
      <h3
        id={id}
        className="relative scroll-mt-32 text-h3 font-bold leading-[1.1] tracking-tight text-(--color-text)"
      >
        {title}
      </h3>
      <p className={`mt-5 max-w-xl text-body-lg leading-relaxed text-(--color-text-muted) ${introClassName}`}>{intro}</p>
    </div>
  )
}
