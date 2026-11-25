import '@/app/wv.css'
import { Header } from './Header'
import { Footer } from './Footer'
import { wvFonts } from './fonts'
import { BackToTop } from './BackToTop'

/** Site-wide header and footer. `.wv-shell` strips the page-level background/min-height `.wv` adds, keeping only its tokens. */
export function SiteHeader() {
  return (
    <div className={`wv wv-shell ${wvFonts}`}>
      <Header />
    </div>
  )
}

export function SiteFooter() {
  return (
    <div className={`wv wv-shell ${wvFonts}`}>
      <Footer />
    </div>
  )
}

export function SiteBackToTop() {
  return (
    <div className={`wv wv-shell ${wvFonts}`}>
      <BackToTop />
    </div>
  )
}
