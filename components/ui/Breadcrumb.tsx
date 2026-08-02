import Link from 'next/link'

export interface BreadcrumbSegment {
  label: string
  href?: string
}

interface BreadcrumbProps {
  segments: BreadcrumbSegment[]
  className?: string
  /** Link hover color — 'muted' (default, text-(--color-text)) or 'accent' for pages that want the brand yellow hover. */
  hoverColor?: 'muted' | 'accent'
}

export function Breadcrumb({ segments, className = '', hoverColor = 'muted' }: BreadcrumbProps) {
  const hoverClass = hoverColor === 'accent' ? 'hover:text-(--color-accent)' : 'hover:text-(--color-text)'
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center flex-wrap gap-x-2 text-sm text-(--color-text-muted)">
        {segments.map((segment, i) => {
          const isLast = i === segments.length - 1
          return (
            <li key={i} className="flex items-center gap-x-2 min-w-0">
              {segment.href && !isLast ? (
                <Link
                  href={segment.href}
                  className={`group relative inline-block shrink-0 text-(--color-text-muted) transition-colors duration-300 ${hoverClass} focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text) rounded-[2px]`}
                >
                  {segment.label}
                  <span className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={isLast ? 'font-medium text-(--color-text)' : 'shrink-0 text-(--color-text-muted)'}
                >
                  {segment.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" className="shrink-0 text-(--color-text-faint)">
                  /
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
