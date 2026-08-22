"use client"

import Link from "next/link"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { scrollToHash } from "@/lib/scroll-to-hash"
import { useAuditModal, AUDIT_MODAL_HASH } from "@/components/ui/AuditModalProvider"

interface TextLinkProps {
  href: string
  children: React.ReactNode
  arrow?: "right" | "diagonal"
  external?: boolean
  className?: string
}

export function TextLink({
  href,
  children,
  arrow = "right",
  external = false,
  className = "",
}: TextLinkProps) {
  const { openAuditModal } = useAuditModal()
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 text-[1rem] font-medium text-[var(--color-text)] w-fit ${className}`}
      onClick={(e) => {
        if (href === AUDIT_MODAL_HASH) { e.preventDefault(); openAuditModal() }
        else scrollToHash(e, href)
      }}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-px left-0 w-full h-px bg-[var(--color-text)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
      </span>
      {arrow === "diagonal" ? (
        <ArrowUpRight
          size={14}
          strokeWidth={1.75}
          className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      ) : (
        <ArrowRight
          size={14}
          strokeWidth={1.75}
          className="transition-transform duration-300 ease-out group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </Link>
  )
}
