'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { RevealText, RevealFade } from '@/components/ui/Reveal'
import SkillsPills from '@/components/ui/SkillsPills'

interface Opening {
  _id: string
  title: string
  slug: string
  type: string
  stipend: string
  positions: number
  flag?: string
  isActive: boolean
  shortDescription: string
  prerequisites: string[]
  skills: string[]
}

interface Props {
  openings: Opening[]
}

const FLAG_STYLES: Record<string, string> = {
  New: 'bg-(--color-accent) text-(--color-text)',
  'Hiring Urgently': 'bg-[#FF4444] text-white',
}

const ALL_FILTER = 'All'
const ACTIVE_FILTER = 'Active Roles'

export default function CareersClient({ openings }: Props) {
  const filters = useMemo(() => {
    const flags = Array.from(new Set(openings.map(o => o.flag).filter((f): f is string => !!f)))
    const hasClosedRoles = openings.some(o => !o.isActive)
    return [...(hasClosedRoles ? [ACTIVE_FILTER] : []), ...flags, ALL_FILTER]
  }, [openings])

  const [activeFilter, setActiveFilter] = useState(ALL_FILTER)

  const filteredOpenings = useMemo(() => {
    if (activeFilter === ALL_FILTER) return openings
    if (activeFilter === ACTIVE_FILTER) return openings.filter(o => o.isActive)
    return openings.filter(o => o.flag === activeFilter)
  }, [openings, activeFilter])

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="container pt-32 pb-8 md:pb-16 md:pt-40">
          <RevealText
            as="h1"
            className="text-h2 font-bold tracking-tight text-(--color-text)"
          >
            Careers
          </RevealText>
        </div>
      </section>

      {/* ── Openings listing ─────────────────────────────────────────────── */}
      <section id="openings" className="pb-16 md:pb-20">
        <div className="container">
          <div className="mb-10 md:mb-14 max-w-2xl">
            <RevealText
              as="h2"
              className="text-h3 font-bold tracking-tight text-(--color-text)"
            >
              Open Roles
            </RevealText>
            <RevealFade className="mt-4" delay={0.1}>
              <p className="text-body-lg text-(--color-text-muted) leading-relaxed">
                All roles are flexible and available in hybrid and remote formats.
              </p>
            </RevealFade>
          </div>

          {filters.length > 1 && (
            <RevealFade className="mb-8 md:mb-10" delay={0.15}>
              <div role="group" aria-label="Filter openings by status" className="flex flex-wrap gap-2">
                {filters.map(filter => {
                  const isActive = filter === activeFilter
                  return (
                    <button
                      key={filter}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveFilter(filter)}
                      className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text) ${
                        isActive
                          ? 'border-(--color-text) bg-(--color-text) text-(--color-bg)'
                          : 'border-(--color-border) text-(--color-text-muted) hover:border-(--color-text)'
                      }`}
                    >
                      {filter}
                    </button>
                  )
                })}
              </div>
            </RevealFade>
          )}

          {filteredOpenings.length === 0 ? (
            <p className="text-base text-(--color-text-muted)">No openings in this category right now.</p>
          ) : (
          <div className="grid grid-cols-1 border-t border-l border-(--color-border) md:grid-cols-2 lg:grid-cols-3">
            {filteredOpenings.map((opening, i) => (
              <RevealFade key={opening.slug} delay={(i % 3) * 0.08} className="border-r border-b border-(--color-border)">
                <Link
                  href={`/careers/${opening.slug}`}
                  className="group relative flex h-full flex-col gap-5 bg-(--color-surface) p-6 transition-colors duration-300 ease-out hover:bg-(--color-bg-muted) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text) md:p-8"
                >
                  {opening.flag && (
                    <span
                      className={`absolute top-0 right-0 px-3 py-1 text-xs font-medium uppercase tracking-wide ${FLAG_STYLES[opening.flag] ?? 'bg-(--color-accent) text-(--color-text)'}`}
                    >
                      {opening.flag}
                    </span>
                  )}

                  <span className="text-sm text-(--color-text-muted)">
                    {opening.type} · {opening.positions} {opening.positions === 1 ? 'opening' : 'openings'}
                    {!opening.isActive && ' · Not hiring right now'}
                  </span>

                  <h3 className="text-2xl font-bold leading-snug tracking-tight text-(--color-text)">
                    {opening.title}
                  </h3>

                  <p className="text-base text-(--color-text-muted) leading-relaxed line-clamp-3">
                    {opening.shortDescription}
                  </p>

                  {opening.skills.length > 0 && <SkillsPills skills={opening.skills} />}

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-sm text-(--color-text-muted)">₹{opening.stipend}</span>
                    <span className="inline-flex items-center gap-1.5 text-base font-medium text-(--color-text)">
                      <span className="relative">
                        View &amp; Apply
                        <span className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-(--color-text) transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                      </span>
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.75}
                        className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </RevealFade>
            ))}
          </div>
          )}
        </div>
      </section>
    </>
  )
}
