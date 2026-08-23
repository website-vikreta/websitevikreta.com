import { permanentRedirect } from 'next/navigation'

// Legacy slug — this page moved to /services/web-mobile-app-development. 308s
// old links, bookmarks and indexed URLs across so nothing that already
// points here breaks or loses its SEO value.
export default function LegacyAppsCrmRedirect() {
  permanentRedirect('/services/web-mobile-app-development')
}
