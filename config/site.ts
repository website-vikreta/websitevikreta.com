/**
 * Single source of truth for the public production origin.
 *
 * SEO-critical: every canonical tag, Open Graph URL, JSON-LD `url`, sitemap
 * entry and robots directive resolves against this value. It is a hardcoded
 * constant on purpose — a misconfigured env var (`NEXT_PUBLIC_HOSTNAME` was
 * once pointed at stage) previously leaked `stage.websitevikreta.com` into
 * every canonical tag, causing Google to treat www pages as duplicates.
 *
 * Do NOT read this from env. Do NOT point it at stage.
 */
export const SITE_URL = 'https://www.websitevikreta.com'

/**
 * JSON-LD `provider` for service pages. The full ProfessionalService node only
 * ships on the homepage, so a bare `{ '@id' }` here would be an unresolved
 * reference on every other page; name + url make it stand on its own.
 */
export const ORGANIZATION_REF = {
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: 'Website Vikreta',
  url: SITE_URL,
}

/**
 * Calendly booking link behind every "schedule a call" CTA.
 *
 * Env-driven (unlike SITE_URL) so the booking target can change without a code
 * change. Resolves to `''` when unset — **every consumer must guard on it**, so
 * a missing env var hides the CTA rather than shipping a dead `href=""`, which
 * silently reloads the page instead of booking anything.
 *
 * `NEXT_PUBLIC_*` is inlined at build time: setting it after a build has no
 * effect until the next one.
 */
export const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? ''

/** Founded August 2020. Single source for "N years in" copy and JSON-LD foundingDate. */
export const FOUNDED = { year: 2020, month: 8 } as const
export const FOUNDING_DATE = '2020-08'

const WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen']

/** Whole years since founding, e.g. 6 in Nov 2026. */
export function yearsIn(now = new Date()): number {
  const y = now.getFullYear() - FOUNDED.year
  return now.getMonth() + 1 >= FOUNDED.month ? y : y - 1
}

/** "Six years in" */
export function yearsInPhrase(now = new Date()): string {
  const n = yearsIn(now)
  return `${WORDS[n] ?? n} years in`
}
