'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DropdownItem {
  label: string
  href: string
}

interface NavItem {
  label: string
  href?: string
  dropdown?: DropdownItem[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Services',
    dropdown: [
      { label: 'UX Design', href: '/services/ux-design' },
      { label: 'UI Design', href: '/services/ui-design' },
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'Web & Mobile Apps', href: '/services/web-mobile-apps' },
      { label: 'AI & Automation', href: '/services/ai-automation' },
    ],
  },
  {
    label: 'Work',
    dropdown: [
      { label: 'Case Studies', href: '/work/case-studies' },
      { label: 'Industries', href: '/work/industries' },
    ],
  },
  {
    label: 'About',
    dropdown: [
      { label: 'Our Story', href: '/about' },
      { label: 'Team', href: '/about/team' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

function isItemActive(item: NavItem, pathname: string): boolean {
  if (item.dropdown) {
    return item.dropdown.some((d) => pathname.startsWith(d.href))
  }
  if (item.href) {
    return pathname === item.href
  }
  return false
}

export function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMobileExpanded(null)
    setActiveDropdown(null)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false)
    setMobileExpanded(null)
  }, [])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] btn btn-primary"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-black/85 backdrop-blur-[20px] border-b border-white/[0.08]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav
          className="container flex items-center justify-between h-20"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 text-white font-semibold text-[1.0625rem] tracking-tight transition-colors duration-200 hover:text-[var(--color-accent)]"
            aria-label="Website Vikreta — Home"
          >
            Website Vikreta
          </Link>

          {/* Desktop nav */}
          <ul
            className="hidden lg:flex items-center gap-8 list-none"
            role="list"
          >
            {NAV_ITEMS.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <>
                    <button
                      className={`nav-link${isItemActive(item, pathname) ? ' active' : ''}`}
                      aria-expanded={activeDropdown === item.label}
                      aria-haspopup="true"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setActiveDropdown(
                            activeDropdown === item.label ? null : item.label,
                          )
                        }
                        if (e.key === 'Escape') setActiveDropdown(null)
                      }}
                    >
                      {item.label}
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        aria-hidden="true"
                        className={`transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      >
                        <path
                          d="M2 3.5l3.5 3.5 3.5-3.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <div
                      className={`dropdown-panel${activeDropdown === item.label ? ' open' : ''}`}
                      role="menu"
                    >
                      <ul className="list-none" role="list">
                        {item.dropdown.map((dropItem) => (
                          <li key={dropItem.href} role="none">
                            <Link
                              href={dropItem.href}
                              className="block px-3 py-2.5 text-sm text-[var(--color-text-muted)] rounded-sm transition-colors duration-150 hover:text-white hover:bg-white/[0.05]"
                              role="menuitem"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {dropItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    className={`nav-link${isItemActive(item, pathname) ? ' active' : ''}`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/work" className="btn btn-ghost text-sm py-[0.5rem] px-[1.125rem]">
              Our Work
            </Link>
            <Link href="/contact" className="btn btn-primary text-sm py-[0.5rem] px-[1.125rem]">
              Get a Quote
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
          >
            <span
              className={`block w-[22px] h-px bg-white origin-center transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-[6px]' : ''
              }`}
            />
            <span
              className={`block h-px bg-white transition-all duration-300 ${
                mobileOpen ? 'opacity-0 w-0' : 'w-[22px]'
              }`}
            />
            <span
              className={`block w-[22px] h-px bg-white origin-center transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-[6px]' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[45] bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-black border-l border-white/[0.08] flex flex-col lg:hidden transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-white/[0.08] flex-shrink-0">
          <Link
            href="/"
            className="text-white font-semibold text-[1.0625rem] tracking-tight"
            onClick={closeMobileMenu}
          >
            Website Vikreta
          </Link>
          <button
            className="flex items-center justify-center w-10 h-10 text-[var(--color-text-muted)] hover:text-white transition-colors duration-200"
            onClick={closeMobileMenu}
            aria-label="Close navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M4 4l12 12M16 4L4 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav
          className="flex-1 overflow-y-auto px-6 py-6"
          aria-label="Mobile navigation"
        >
          <ul className="list-none space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {item.dropdown ? (
                  <div>
                    <button
                      className="flex items-center justify-between w-full py-3 text-left text-base text-[var(--color-text-muted)] hover:text-white transition-colors duration-150"
                      onClick={() =>
                        setMobileExpanded(
                          mobileExpanded === item.label ? null : item.label,
                        )
                      }
                      aria-expanded={mobileExpanded === item.label}
                    >
                      {item.label}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                        className={`transition-transform duration-200 ${
                          mobileExpanded === item.label ? 'rotate-180' : ''
                        }`}
                      >
                        <path
                          d="M2 5l5 5 5-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <ul
                      className={`list-none overflow-hidden transition-all duration-300 ${
                        mobileExpanded === item.label
                          ? 'max-h-64 opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      {item.dropdown.map((dropItem) => (
                        <li key={dropItem.href}>
                          <Link
                            href={dropItem.href}
                            className="block py-2.5 pl-4 text-sm text-[var(--color-text-faint)] border-l border-white/[0.08] hover:text-white hover:border-white/[0.24] transition-all duration-150"
                            onClick={closeMobileMenu}
                          >
                            {dropItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className="block py-3 text-base text-[var(--color-text-muted)] hover:text-white transition-colors duration-150"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer CTAs */}
        <div className="flex flex-col gap-3 px-6 py-6 border-t border-white/[0.08] flex-shrink-0">
          <Link
            href="/work"
            className="btn btn-ghost w-full justify-center"
            onClick={closeMobileMenu}
          >
            Our Work
          </Link>
          <Link
            href="/contact"
            className="btn btn-primary w-full justify-center"
            onClick={closeMobileMenu}
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </>
  )
}
