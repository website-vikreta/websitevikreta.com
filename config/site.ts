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
