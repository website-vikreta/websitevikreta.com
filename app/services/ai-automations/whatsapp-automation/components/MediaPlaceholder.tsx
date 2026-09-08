interface MediaPlaceholderProps {
  label: string
  aspect?: 'video' | 'square' | 'portrait' | 'wide'
  className?: string
}

const ASPECT: Record<NonNullable<MediaPlaceholderProps['aspect']>, string> = {
  video: 'aspect-video',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  wide: 'aspect-[21/9]',
}

/** Reserved slot for assets not yet delivered — swap for next/image when ready. */
export function MediaPlaceholder({
  label,
  aspect = 'video',
  className = '',
}: MediaPlaceholderProps) {
  return (
    <div
      className={`relative w-full overflow-hidden border border-dashed border-(--color-border) bg-(--color-bg-muted) ${ASPECT[aspect]} ${className}`}
      role="img"
      aria-label={`Image placeholder: ${label}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
        <span className="font-mono text-[10px] uppercase tracking-widest text-(--color-text-faint)">
          Image coming soon
        </span>
        <span className="max-w-[28ch] text-sm text-(--color-text-muted)">{label}</span>
      </div>
    </div>
  )
}
