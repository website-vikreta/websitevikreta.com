'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Linkedin, Instagram, Whatsapp } from 'react-bootstrap-icons'
import { FOOTER_LINKS, FOOTER_CONFIG } from '@/config/footer-links'

const ICON_MAP = {
  Linkedin,
  Instagram,
  Whatsapp,
}

function SlotText({ children }: { children: string }) {
  return (
    <span aria-label={children}>
      {children.split('').map((char, i) => (
        <span
          key={i}
          className="slot-char-wrap"
          style={{ '--char-i': i } as React.CSSProperties}
          aria-hidden="true"
        >
          <span className="slot-char">{char === ' ' ? ' ' : char}</span>
        </span>
      ))}
    </span>
  )
}

export function FooterSection() {
  const socialIcons = FOOTER_LINKS.social
    .filter(item => item.icon in ICON_MAP)
    .map(item => ({
      ...item,
      Component: ICON_MAP[item.icon as keyof typeof ICON_MAP],
    }))

  return (
    <motion.section
      className="relative bg-white overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      aria-label="Footer"
    >
      <div className="container flex flex-col">

        {/* Top bar — Logo + Social */}
        <motion.div
          className="flex items-center justify-between py-10 md:py-14 border-b border-black/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo/websitevikreta-logo-horizontal.png"
              alt="Website Vikreta"
              width={180}
              height={50}
              className="h-9 w-auto"
              priority
            />
          </Link>

          <div className="flex items-center gap-4 md:gap-5">
            {socialIcons.map((item) => {
              const Icon = item.Component
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-black/50 hover:text-black transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={item.label}
                >
                  <Icon size={18} />
                </motion.a>
              )
            })}
          </div>
        </motion.div>

        {/* CTAs — Collaborate & Careers side by side */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/10 border-b border-black/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="/contact"
            className="footer-anim group flex items-center justify-between py-8 md:py-10 md:pr-10"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-black/40 font-mono mb-1.5 group-hover:text-[#FFD600]/60 transition-colors duration-300">Let&apos;s work together</p>
              <span className="text-h2 font-sans font-semibold tracking-tight text-black group-hover:text-[#FFD600] transition-colors duration-300">
                <span className="btn-label"><SlotText>Collaborate</SlotText></span>
              </span>
            </div>
            <ArrowUpRight className="flex-shrink-0 ml-4 h-7 w-7 md:h-9 md:w-9 text-black group-hover:text-[#FFD600] transition-colors duration-300" />
          </a>

          <a
            href="/careers"
            className="footer-anim group flex items-center justify-between py-8 md:py-10 md:pl-10"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-black/40 font-mono mb-1.5 group-hover:text-[#FFD600]/60 transition-colors duration-300">Join the team</p>
              <span className="text-h2 font-sans font-semibold tracking-tight text-black group-hover:text-[#FFD600] transition-colors duration-300">
                <span className="btn-label"><SlotText>Careers</SlotText></span>
              </span>
            </div>
            <ArrowUpRight className="flex-shrink-0 ml-4 h-7 w-7 md:h-9 md:w-9 text-black group-hover:text-[#FFD600] transition-colors duration-300" />
          </a>
        </motion.div>

        {/* Link columns grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 md:py-10 border-b border-black/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-black/40 font-mono mb-3">Quick Links</p>
            <ul className="space-y-2">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-block text-black/60 hover:text-black text-sm transition-all duration-200 hover:translate-x-1">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-black/40 font-mono mb-3">Services</p>
            <ul className="space-y-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-block text-black/60 hover:text-black text-sm transition-all duration-200 hover:translate-x-1">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-black/40 font-mono mb-3">Work</p>
            <ul className="space-y-2">
              {FOOTER_LINKS.work.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-block text-black/60 hover:text-black text-sm transition-all duration-200 hover:translate-x-1">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-black/40 font-mono mb-3">Resources</p>
            <ul className="space-y-2">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-block text-black/60 hover:text-black text-sm transition-all duration-200 hover:translate-x-1">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Contact Us bar */}
        <motion.div
          className="py-6 md:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-black/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-black/40 font-mono mb-1.5">Contact Us</p>
            <a
              href="mailto:contact@websitevikreta.com"
              className="footer-anim font-sans text-xl md:text-3xl font-semibold text-black hover:text-[#FFD600] transition-colors duration-300"
            >
              <span className="btn-label"><SlotText>contact@websitevikreta.com</SlotText></span>
            </a>
          </div>
          <a
            href="tel:+919970445198"
            className="font-mono text-black/50 hover:text-[#FFD600] text-sm transition-colors duration-300"
          >
            +91 99704 45198
          </a>
        </motion.div>

        {/* Copyright strip */}
        <motion.div
          className="py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-black/30 font-mono"
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
