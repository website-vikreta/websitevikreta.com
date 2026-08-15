'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { RevealImage } from '@/components/ui/Reveal'
import { trackLinkClick } from '@/lib/analytics'
import type { CaseStudy } from '@/lib/work-data'

interface CaseStudyCardProps {
  study: CaseStudy
  showReadLink?: boolean
}

export function CaseStudyReadLink() {
  return (
    <span className="inline-flex w-fit items-center gap-1.5 text-[1rem] font-medium text-(--color-text)">
      <span className="relative">
        Read case study
        <span className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-(--color-text) transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
      </span>
      <ArrowRight
        size={14}
        strokeWidth={1.75}
        aria-hidden="true"
        className="transition-transform duration-300 ease-out group-hover:translate-x-1"
      />
    </span>
  )
}

export function CaseStudyCardContent({ study, showReadLink = true }: CaseStudyCardProps) {
  return (
    <>
      <Image
        src={study.logo}
        alt={study.company}
        height={32}
        width={160}
        className="self-start"
        style={{ height: '32px', width: 'auto' }}
        unoptimized
      />
      <div>
        <span className="block text-sm text-(--color-text-muted)">{study.tags}</span>
        <h3 className="mt-4 mb-6 text-2xl font-bold leading-snug tracking-tight text-balance sm:text-3xl text-(--color-text)">
          {study.title}{' '}
          <span className="font-semibold text-(--color-text-faint)">{study.subtitle}</span>
        </h3>
        {showReadLink ? <CaseStudyReadLink /> : null}
      </div>
    </>
  )
}

export function CaseStudyVisual({
  study,
  showImage = true,
}: {
  study: CaseStudy
  showImage?: boolean
}) {
  return (
    <div className="h-full border border-(--color-border) bg-(--color-surface) p-2">
      <div className="relative flex aspect-[14/9] h-full w-full items-center justify-center overflow-hidden bg-(--color-bg-muted)">
        {showImage && study.image ? (
          // alt="": study.image is a generic service illustration, not a
          // preview of this client's project — calling it one describes
          // something that isn't in the frame. Restore a real alt with real
          // screenshots. The logo branch below IS the company, so it keeps one.
          <RevealImage className="relative h-full w-full">
            <Image
              src={study.image}
              alt=""
              fill
              className="object-cover grayscale"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </RevealImage>
        ) : (
          <Image
            src={study.logo}
            alt={`${study.company} logo`}
            height={48}
            width={200}
            className="opacity-80"
            style={{ height: '48px', width: 'auto' }}
            unoptimized
          />
        )}
      </div>
    </div>
  )
}

export function CaseStudyFeaturedLink({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group grid gap-8 bg-(--color-bg) px-6 transition-colors duration-300 ease-out hover:bg-(--color-surface) md:px-10 lg:grid-cols-2 lg:gap-16"
    >
      <div className="flex flex-col justify-between gap-8 pt-10 md:pt-14 lg:pb-14">
        <CaseStudyCardContent study={study} />
      </div>
      <div className="py-10 lg:py-14">
        <CaseStudyVisual study={study} showImage={false} />
      </div>
    </Link>
  )
}

export function CaseStudyGridLink({
  study,
  className = '',
}: {
  study: CaseStudy
  className?: string
}) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className={`group flex flex-col justify-between gap-12 px-6 py-10 transition-colors duration-300 ease-out hover:bg-(--color-surface) md:px-10 md:py-14 xl:gap-16 ${className}`}
    >
      <CaseStudyCardContent study={study} />
    </Link>
  )
}

export function ExternalProjectLink({
  title,
  description,
  href,
  image,
  imageAlt,
  skills,
  className = '',
}: {
  title: string
  description: string
  href: string
  image: string
  imageAlt: string
  skills: string
  className?: string
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLinkClick(href, 'work_websites_section')}
      className={`group relative flex h-full flex-col bg-(--color-surface) transition-colors duration-300 ease-out hover:bg-(--color-bg-muted) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text) ${className}`}
    >
      <div className="relative aspect-video overflow-hidden border-b border-(--color-border) bg-(--color-bg-muted)">
        <RevealImage className="relative h-full w-full">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </RevealImage>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        <h3 className="text-2xl font-bold leading-snug tracking-tight text-(--color-text)">
          {title}
        </h3>
        <p className="text-base text-(--color-text-muted) leading-relaxed line-clamp-3">
          {description}
        </p>
        <span className="block text-sm text-(--color-text-muted)">{skills}</span>
        <div className="mt-auto flex items-center gap-1.5 text-base font-medium text-(--color-text)">
          <span className="relative">
            Visit site
            <span className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-(--color-text) transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
          </span>
          <ArrowUpRight
            size={15}
            strokeWidth={1.75}
            className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  )
}
