'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'

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
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

function isItemActive(item: NavItem, pathname: string): boolean {
  if (item.dropdown) {
    return item.dropdown.some((d) => pathname.startsWith(d.href))
  }
  if (item.href) {
    return pathname === item.href || pathname.startsWith(item.href + '/')
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
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMobileExpanded(null)
    setActiveDropdown(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] btn btn-primary btn-sm"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAFAF7]/92 backdrop-blur-[20px] border-b border-black/[0.08]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav
          className={`container flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-14' : 'h-20'
          }`}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Logo variant="light" />

          {/* Desktop nav — hidden at top, visible on scroll */}
          <ul
            className={`hidden lg:flex items-center gap-10 list-none transition-all duration-300 ${
              scrolled
                ? 'opacity-100 pointer-events-auto translate-y-0'
                : 'opacity-0 pointer-events-none -translate-y-1'
            }`}
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
                      <ChevronDown
                        size={11}
                        strokeWidth={1.5}
                        aria-hidden={true}
                        className={`transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <div
                      className={`dropdown-panel${
                        activeDropdown === item.label ? ' open' : ''
                      }`}
                      role="menu"
                    >
                      <ul className="list-none" role="list">
                        {item.dropdown.map((dropItem) => (
                          <li key={dropItem.href} role="none">
                            <Link
                              href={dropItem.href}
                              className="block px-3 py-2.5 text-sm text-[var(--color-text-muted)] rounded-[3px] transition-colors duration-150 hover:text-[var(--color-text)] hover:bg-[var(--color-bg-subtle)]"
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

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Button href="/contact" variant="primary" size="sm" showArrow>
              Contact Us
            </Button>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
          >
            <span
              className={`block w-[22px] h-px bg-[var(--color-text)] origin-center transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-[6px]' : ''
              }`}
            />
            <span
              className={`block h-px bg-[var(--color-text)] transition-all duration-300 ${
                mobileOpen ? 'opacity-0 w-0' : 'w-[22px]'
              }`}
            />
            <span
              className={`block w-[22px] h-px bg-[var(--color-text)] origin-center transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-[6px]' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[45] bg-black/30 backdrop-blur-[2px] lg:hidden transition-opacity duration-300 ${
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
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-[340px] bg-(--color-bg) border-l border-black/[0.06] flex flex-col lg:hidden transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-black/[0.06] flex-shrink-0">
          <Link href="/" onClick={closeMobileMenu} className="flex items-center">
            <Image
              src="/logo/websitevikreta-logo-horizontal.svg"
              alt="Website Vikreta"
              width={130}
              height={29}
              priority
            />
          </Link>
          <button
            className="flex items-center justify-center w-10 h-10 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200"
            onClick={closeMobileMenu}
            aria-label="Close navigation"
          >
            <X size={18} strokeWidth={1.5} aria-hidden={true} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-5" aria-label="Mobile navigation">
          <ul className="list-none space-y-0.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {item.dropdown ? (
                  <div>
                    <button
                      className="flex items-center justify-between w-full py-3 text-left text-[0.9375rem] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-150"
                      onClick={() =>
                        setMobileExpanded(
                          mobileExpanded === item.label ? null : item.label,
                        )
                      }
                      aria-expanded={mobileExpanded === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        size={13}
                        strokeWidth={1.5}
                        aria-hidden={true}
                        className={`transition-transform duration-200 ${
                          mobileExpanded === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <ul
                      className={`list-none overflow-hidden transition-all duration-300 ${
                        mobileExpanded === item.label
                          ? 'max-h-72 opacity-100 pb-1'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      {item.dropdown.map((dropItem) => (
                        <li key={dropItem.href}>
                          <Link
                            href={dropItem.href}
                            className="block py-2.5 pl-4 text-sm text-[var(--color-text-faint)] border-l border-black/[0.08] hover:text-[var(--color-text)] hover:border-black/[0.2] transition-all duration-150"
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
                    className="block py-3 text-[0.9375rem] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-150"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 px-6 py-6 border-t border-black/[0.06] flex-shrink-0">
          <Button href="/contact" variant="primary" className="w-full justify-center" showArrow>
            Contact Us
          </Button>
        </div>
      </div>
    </>
  )
}
