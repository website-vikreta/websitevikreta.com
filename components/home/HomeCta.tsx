import { Button } from '@/components/ui/Button'
import type { HomeLink } from '@/content/home'

/** Pill CTA. href '#book-audit' opens the audit modal via Button's hash handling. */
export function HomeCta({ link, variant = 'accent', className }: { link: HomeLink; variant?: 'accent' | 'ghost'; className?: string }) {
  return (
    <Button href={link.href} variant={variant} size="md" showArrow={variant === 'accent'} external={link.external} className={className}>
      {link.label}
    </Button>
  )
}
