'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof Link>

export function NavigationLink({ onClick, href, ...props }: Props) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const url = href.toString()
    if (!url.startsWith('http') && !url.startsWith('mailto') && !url.startsWith('tel')) {
      window.dispatchEvent(new Event('routeChangeStart'))
    }
    onClick?.(e)
  }

  return <Link href={href} onClick={handleClick} {...props} />
}
