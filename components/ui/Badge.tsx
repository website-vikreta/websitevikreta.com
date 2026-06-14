interface BadgeProps {
  text: string
  className?: string
}

export function Badge({ text, className = '' }: BadgeProps) {
  return (
    <div className={`inline-flex items-center rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-600 ${className}`}>
      {text}
    </div>
  )
}
