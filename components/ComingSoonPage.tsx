'use client'

import { motion } from 'motion/react'
import { Instagram, Linkedin, Whatsapp } from 'react-bootstrap-icons'
import { FooterSection } from '@/components/sections/FooterSection'
import { Button } from '@/components/ui/Button'
import { TextLink } from '@/components/ui/TextLink'

const SOCIAL = [
   {
      label: 'LinkedIn',
      href: 'https://linkedin.com/company/websitevikreta',
      Icon: Linkedin,
   },
   {
      label: 'Instagram',
      href: 'https://instagram.com/websitevikreta',
      Icon: Instagram,
   },
   {
      label: 'WhatsApp',
      href: 'https://wa.me/919970445198',
      Icon: Whatsapp,
   },
]

interface ComingSoonPageProps {
   pageName: string
   showFooter?: boolean
}

export function ComingSoonPage({ pageName, showFooter = false }: ComingSoonPageProps) {
   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: { staggerChildren: 0.1, delayChildren: 0.2 },
      },
   }

   const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
         opacity: 1,
         y: 0,
         transition: { duration: 0.6, ease: 'easeOut' },
      },
   }

   return (
      <>
         <section
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
            aria-label="Coming Soon"
         >
            <motion.div
               className="relative z-20 flex flex-col items-center justify-center px-6"
               variants={containerVariants}
               initial="hidden"
               animate="visible"
            >
               <motion.h2
                  variants={itemVariants}
                  className="text-6xl md:text-7xl font-semibold text-(--color-text) font-sans leading-tight text-center mb-6"
               >
                  Coming Soon
               </motion.h2>

               <motion.p
                  variants={itemVariants}
                  className="text-body-lg text-(--color-text-muted) max-w-sm text-center leading-relaxed mb-10"
               >
                  This page is under construction.
               </motion.p>

               {/* Primary CTA */}
               <motion.div variants={itemVariants} className="mb-12">
                  <Button href="/" variant="primary" size="md" showArrow>
                     Visit Home
                  </Button>
               </motion.div>

               {/* Follow Us row */}
               <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3"
               >
                  {/* Label */}
                  <span className="text-[0.6875rem] tracking-[0.12em] uppercase font-medium text-neutral-400 select-none">
                     Follow Us
                  </span>

                  {/* Icons */}
                  <div className="flex items-center" role="list">
                     {SOCIAL.map(({ label, href, Icon }) => (
                        <a
                           key={label}
                           href={href}
                           target="_blank"
                           rel="noopener noreferrer"
                           aria-label={label}
                           role="listitem"
                           className="group flex items-center justify-center min-w-[44px] min-h-[44px] text-neutral-400 transition-colors duration-200 hover:text-(--color-text)"
                        >
                           <Icon
                              size={20}
                              aria-hidden="true"
                              className="transition-transform duration-200 group-hover:scale-110"
                           />
                        </a>
                     ))}
                  </div>

                  {/* Divider */}
                  <span
                     className="hidden sm:block w-px h-4 bg-neutral-200"
                     aria-hidden="true"
                  />

                  {/* Get in touch link */}
                  <TextLink href="/contact" arrow="right">
                     Get in touch
                  </TextLink>
               </motion.div>
            </motion.div>
         </section>

         {showFooter && <FooterSection />}
      </>
   )
}
