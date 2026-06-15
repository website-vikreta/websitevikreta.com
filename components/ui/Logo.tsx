import Link from 'next/link'
import Image from 'next/image'

type LogoVariant = 'light' | 'dark'

interface LogoProps {
  variant?: LogoVariant
  className?: string
}

export function Logo({ variant = 'light', className = '' }: LogoProps) {
  const linkClasses = [
    'flex-shrink-0 flex items-center gap-3',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Link
      href="/"
      className={linkClasses}
      aria-label="Website Vikreta — Home"
    >
      {/* Icon */}
      <Image
        src="/logo/websitevikreta-icon.svg"
        alt=""
        width={54}
        height={54}
        priority
        className={variant === 'dark' ? 'brightness-0 invert h-8 w-8' : 'h-8 w-8'}
        aria-hidden="true"
      />
      {/* Text */}
      <Image
        src="/logo/WebsiteVikreta.svg"
        alt="Website Vikreta"
        width={180}
        height={30}
        priority
        className={variant === 'dark' ? 'brightness-0 invert h-6 w-auto' : 'h-6 w-auto'}
      />
    </Link>
  )
}
