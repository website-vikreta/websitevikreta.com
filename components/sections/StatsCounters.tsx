import { Infinity as InfinityIcon } from 'lucide-react'
import { RevealText, RevealFade, Counter } from '@/components/ui/Reveal'

interface StatItem {
  id: number
  value: number | null
  suffix: string
  label: string
  isInfinity?: boolean
}

const STATS: StatItem[] = [
  { id: 1, value: 5,    suffix: '+',  label: 'Working with clients across the globe' },
  { id: 2, value: 68,   suffix: '+',  label: 'Projects shipped: web, apps, automation, design' },
  { id: 3, value: 6360, suffix: 'hrs', label: 'Saved since we went AI-first' },
  { id: 4, value: null, suffix: '',   label: 'Tools we can use: no limitation, only solutions', isInfinity: true },
]

export function StatsCounters() {
  return (
    <section
      className="relative py-16 md:py-20 overflow-hidden"
      aria-label="Impact Statistics"
    >
      <div className="container relative z-10">
        <RevealText as="h2" className="text-h2 font-bold text-[var(--color-text)] mb-10 md:mb-14">
          The Impact We&rsquo;ve Delivered
        </RevealText>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {STATS.map((stat, i) => (
            <RevealFade
              key={stat.id}
              delay={0.15 + i * 0.1}
              className="flex flex-col border-l border-[var(--color-border)] pl-5 pr-8 py-2"
            >
              <div
                role="region"
                aria-label={stat.isInfinity ? `${stat.label}: unlimited` : `${stat.label}: ${stat.value}${stat.suffix}`}
              >
                {/* Value */}
                <div className="font-bold text-[var(--color-text)] font-mono leading-none mb-2 flex items-center h-12 md:h-[3.75rem]">
                  {stat.isInfinity ? (
                    <InfinityIcon
                      className="w-12 h-12 md:w-[3.75rem] md:h-[3.75rem] text-[var(--color-text)]"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="text-5xl md:text-6xl">
                      <Counter value={stat.value ?? 0} />
                      <span className="text-3xl md:text-4xl ml-1">{stat.suffix}</span>
                    </span>
                  )}
                </div>

                {/* Label */}
                <p className="text-[var(--color-text-muted)] text-sm md:text-base leading-relaxed">
                  {stat.label}
                </p>
              </div>
            </RevealFade>
          ))}
        </div>

        {/* Note below stats */}
        <RevealFade className="mt-10 md:mt-14" delay={0.4}>
          <p className="text-[var(--color-text-muted)] text-sm md:text-base leading-relaxed max-w-2xl">
            That last number is one year old. We made the shift, measured everything, and haven't looked back.
          </p>
        </RevealFade>
      </div>
    </section>
  )
}
