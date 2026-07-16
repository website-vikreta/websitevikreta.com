import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Prevent non-production hosts (stage/preview) from being indexed.
 *
 * The stage deployment shares this codebase and therefore emits the same
 * www canonical tags. Without this guard Google was crawling
 * stage.websitevikreta.com and choosing it as a canonical, competing with
 * the real production domain. Any host that is not the canonical production
 * origin gets a hard `noindex, nofollow`.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  const isProduction = host === 'www.websitevikreta.com'

  const response = NextResponse.next()

  if (!isProduction) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  return response
}

export const config = {
  // Run on all paths except Next internals and static assets.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
