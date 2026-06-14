'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowUpRight, Mail } from 'lucide-react'
import { FOOTER_LINKS, FOOTER_CONFIG } from '@/config/footer-links'

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37" />
      <circle cx="17.5" cy="6.5" r="1.5" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const ICON_MAP = {
  Instagram: InstagramIcon,
  Linkedin: LinkedinIcon,
  Mail: Mail,
}

export function FooterSection() {
  const socialIcons = FOOTER_LINKS.social.map(item => ({
    ...item,
    Component: ICON_MAP[item.icon as keyof typeof ICON_MAP],
  }))

  return (
    <motion.section
      className="relative bg-black overflow-hidden rounded-t-3xl md:rounded-t-[2rem]"
      style={{ minHeight: 'clamp(90vh, 100vh, 110vh)' }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      aria-label="Footer"
    >
      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top bar — Logo + Social */}
        <motion.div
          className="flex items-center justify-between px-8 md:px-12 pt-8 md:pt-12 pb-8 md:pb-12 border-b border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo/websitevikreta-logo-horizontal.svg"
              alt="Website Vikreta"
              width={180}
              height={50}
              className="h-12 w-auto brightness-0 invert"
              priority
            />
          </Link>

          {/* Social icons */}
          <div className="flex items-center gap-4 md:gap-6">
            {socialIcons.map((item) => {
              const Icon = item.Component
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-white/70 hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={item.label}
                >
                  <Icon size={20} />
                </motion.a>
              )
            })}
          </div>
        </motion.div>

        {/* Big CTAs — Collaborate & Careers */}
        <motion.div
          className="flex-1 flex flex-col justify-center px-8 md:px-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Collaborate */}
          <motion.a
            href="/contact"
            className="group flex items-center justify-between border-t border-b border-white/10 py-8 md:py-12"
            whileHover={{ paddingLeft: 8 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-sans font-semibold text-5xl md:text-8xl tracking-tight text-white">
              Collaborate
            </span>
            <motion.div
              className="flex-shrink-0"
              whileHover={{ x: 8, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="h-10 w-10 md:h-16 md:w-16 text-white" />
            </motion.div>
          </motion.a>

          {/* Careers */}
          <motion.a
            href="/careers"
            className="group flex items-center justify-between border-b border-white/10 py-8 md:py-12"
            whileHover={{ paddingLeft: 8 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-sans font-semibold text-5xl md:text-8xl tracking-tight text-white">
              Careers
            </span>
            <motion.div
              className="flex-shrink-0"
              whileHover={{ x: 8, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="h-10 w-10 md:h-16 md:w-16 text-white" />
            </motion.div>
          </motion.a>
        </motion.div>

        {/* Link columns grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8 md:px-12 py-12 md:py-16 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Quick Links */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 font-mono mb-4">
              Quick Links
            </p>
            <ul className="space-y-2">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 font-mono mb-4">
              Services
            </p>
            <ul className="space-y-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Work */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 font-mono mb-4">
              Work
            </p>
            <ul className="space-y-2">
              {FOOTER_LINKS.work.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 font-mono mb-4">
              Resources
            </p>
            <ul className="space-y-2">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Contact Us bar */}
        <motion.div
          className="border-t border-white/10 px-8 md:px-12 py-8 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 font-mono mb-2">
              Contact Us
            </p>
            <a
              href={`mailto:${FOOTER_CONFIG.email}`}
              className="font-sans text-2xl md:text-4xl font-semibold text-white hover:text-white/70 transition-colors duration-200"
            >
              {FOOTER_CONFIG.email}
            </a>
          </div>
          <a
            href={`tel:${FOOTER_CONFIG.phone.replace(/\s/g, '')}`}
            className="font-mono text-white/60 hover:text-white text-sm md:text-base transition-colors duration-200"
          >
            {FOOTER_CONFIG.phone}
          </a>
        </motion.div>

        {/* Copyright strip */}
        <motion.div
          className="px-8 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/30 font-mono border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span>© 2026 {FOOTER_CONFIG.brandName}. All rights reserved.</span>
          <span>{FOOTER_CONFIG.tagline}</span>
        </motion.div>
      </div>
    </motion.section>
  )
}
