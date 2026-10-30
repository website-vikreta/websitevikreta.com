import Link from 'next/link'
import { CONTACT, SERVICES } from './data'
import { FootWord } from './FootWord'
import { Arrow, Logo } from './ui'

export function Footer() {
  return (
    <footer className="wv-footer">
      <div className="wv-wrap">
        <div className="wv-foot-grid">
          <div className="wv-foot-brand">
            <Logo light height={36} />
            <p className="wv-foot-line">
              Build it <em>once.</em> Build it right.
            </p>
            <a href={`mailto:${CONTACT.email}`} className="wv-link">
              {CONTACT.email} <Arrow size={14} />
            </a>
          </div>
          <div>
            <p className="wv-eyebrow">Services</p>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link href={s.href}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="wv-eyebrow">Studio</p>
            <ul>
              <li><Link href="/work">Work</Link></li>
              <li><Link href="/#process">Process</Link></li>
              <li><Link href="/about">Studio</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>
          <div>
            <p className="wv-eyebrow">Say hello</p>
            <ul>
              <li><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a></li>
              <li>{CONTACT.city}</li>
              <li><a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></li>
              <li><a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <FootWord />
        <div className="wv-foot-base">
          <span>© 2026 Website Vikreta. All rights reserved.</span>
          <nav className="wv-foot-legal" aria-label="Legal">
            <Link href="/legal/privacy-policy">Privacy Policy</Link>
            <Link href="/legal/terms-and-conditions">Terms &amp; Conditions</Link>
            <Link href="/legal/disclaimer">Disclaimer</Link>
            <Link href="/sitemap.xml">Sitemap</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
