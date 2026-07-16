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
