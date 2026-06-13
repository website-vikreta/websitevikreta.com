import Link from 'next/link'

type Variant = 'primary' | 'ghost' | 'accent'
type Size    = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?:   Variant
  size?:      Size
  showArrow?: boolean
  className?: string
  children:   React.ReactNode
}

interface ButtonAsLink extends BaseProps {
  href:      string
  external?: boolean
  onClick?:  never
  type?:     never
  disabled?: never
}

interface ButtonAsButton extends BaseProps {
  href?:     never
  external?: never
  onClick?:  React.MouseEventHandler<HTMLButtonElement>
  type?:     'button' | 'submit' | 'reset'
  disabled?: boolean
}

type ButtonProps = ButtonAsLink | ButtonAsButton

// Variants live in @layer components in globals.css
const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  ghost:   'btn-ghost',
  accent:  'btn-accent',
}

// Sizes use Tailwind utilities (layer: utilities > components) — guarantees padding wins
const sizeClass: Record<Size, string> = {
  sm: 'py-2.5 px-5 text-sm',
  md: 'py-[0.8125rem] px-[1.625rem] text-[0.9375rem]',
  lg: 'py-[1.125rem] px-10 text-[1rem] tracking-[0.005em]',
}

function ArrowDots() {
  return (
    <span className="btn-arrow-wrap" aria-hidden="true">
      <span className="btn-arrow-icon">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 7h10M8 3l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="btn-dots">
        <span className="btn-dot" />
        <span className="btn-dot" />
        <span className="btn-dot" />
      </span>
    </span>
  )
}

export function Button({
  variant   = 'primary',
  size      = 'md',
  showArrow = false,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    'btn',
    variantClass[variant],
    sizeClass[size],
    showArrow ? 'btn-arrow-dots' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      <span className="btn-arrow-label">{children}</span>
      {showArrow && <ArrowDots />}
    </>
  )

  if ('href' in rest && rest.href) {
    const { href, external } = rest as ButtonAsLink
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </Link>
    )
  }

  const { onClick, type = 'button', disabled } = rest as ButtonAsButton
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {inner}
    </button>
  )
}
