import Link from 'next/link'
import React from 'react'
import { ArrowRight } from 'lucide-react'

function SlotText({ children }: { children: React.ReactNode }) {
  if (typeof children !== 'string') return <>{children}</>
  return (
    <span aria-label={children}>
      {children.split('').map((char, i) => (
        <span
          key={i}
          className="slot-char-wrap"
          style={{ '--char-i': i } as React.CSSProperties}
          aria-hidden="true"
        >
          <span className="slot-char">{char === ' ' ? ' ' : char}</span>
        </span>
      ))}
    </span>
  )
}

type Variant = 'primary' | 'ghost' | 'accent' | 'light'
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

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  ghost:   'btn-ghost',
  accent:  'btn-accent',
  light:   'btn-light',
}

const sizeClass: Record<Size, string> = {
  sm: 'py-2.5 px-5 text-sm',
  md: 'py-[0.8125rem] px-[1.625rem] text-[0.9375rem]',
  lg: 'py-[1.125rem] px-10 text-[1rem] tracking-[0.005em]',
}

const iconSize: Record<Size, number> = {
  sm: 14,
  md: 15,
  lg: 16,
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
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      <span className="btn-label"><SlotText>{children}</SlotText></span>
      {showArrow && (
        <ArrowRight
          size={iconSize[size]}
          strokeWidth={1.75}
          className="btn-icon"
          aria-hidden="true"
        />
      )}
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
