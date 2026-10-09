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

function getDisplayDomain(study: CaseStudy): string {
  if (study.externalUrl) {
    try {
      return new URL(study.externalUrl).hostname.replace(/^www\./, '')
    } catch {
      // fallback
    }
  }
  return `${study.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`
}

export function CaseStudyVisual({
  study,
  showImage = true,
}: {
  study: CaseStudy
  showImage?: boolean
}) {
  if (showImage && study.image) {
    const domain = getDisplayDomain(study)

    return (
      <div className="w-full overflow-hidden border border-(--color-border) bg-(--color-surface) transition-colors duration-300 ease-out group-hover:border-(--color-border-strong)">
        {/* Minimal browser chrome bar */}
        <div className="flex items-center justify-between border-b border-(--color-border) bg-(--color-bg-muted) px-3.5 py-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-(--color-border-strong)" />
            <span className="h-2 w-2 rounded-full bg-(--color-border-strong)" />
            <span className="h-2 w-2 rounded-full bg-(--color-border-strong)" />
          </div>
          <div className="flex h-5 max-w-[200px] flex-1 items-center justify-center rounded-xs border border-(--color-border) bg-(--color-surface) px-2.5 text-[11px] text-(--color-text-faint)">
            <span className="truncate">{domain}</span>
          </div>
          <div className="w-9" aria-hidden="true" />
        </div>

        {/* 16:9 Viewport content */}
        <div className="relative aspect-video w-full overflow-hidden bg-(--color-bg-muted)">
          <RevealImage className="relative h-full w-full">
            <Image
              src={study.image}
              alt={`${study.company} case study preview`}
              fill
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </RevealImage>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full items-center justify-center border border-(--color-border) bg-(--color-surface) p-6">
      <div className="relative flex aspect-video h-full w-full items-center justify-center overflow-hidden bg-(--color-bg-muted)">
        <Image
          src={study.logo}
          alt={`${study.company} logo`}
          height={48}
          width={200}
          className="opacity-80"
          style={{ height: '48px', width: 'auto' }}
          unoptimized
        />
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
      <div className="flex items-center pb-10 pt-0 lg:py-14">
        <CaseStudyVisual study={study} showImage={true} />
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
  logo,
  image,
  imageAlt,
  skills,
  className = '',
}: {
  title: string
  description: string
  href: string
  logo: string
  image?: string
  imageAlt?: string
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
      {image ? (
        <div className="relative aspect-video overflow-hidden border-b border-(--color-border) bg-(--color-bg-muted)">
          <RevealImage className="relative h-full w-full">
            <Image
              src={image}
              alt={imageAlt ?? `${title} website preview`}
              fill
              className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </RevealImage>
        </div>
      ) : (
        <div className="relative flex aspect-video items-center justify-center overflow-hidden border-b border-(--color-border) bg-(--color-bg-muted) p-10">
          <div className="flex h-14 w-[65%] items-center justify-center">
            <Image
              src={logo}
              alt={`${title} logo`}
              width={0}
              height={56}
              unoptimized
              className="h-full w-full object-contain grayscale opacity-60 transition-all duration-300 ease-out group-hover:grayscale-0 group-hover:opacity-100"
            />
          </div>
        </div>
      )}

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
