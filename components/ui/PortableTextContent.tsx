import Image from 'next/image'
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponentProps,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
  type PortableTextTypeComponentProps,
} from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'
import { getBlockText, slugify } from '@/sanity/lib/utils'

type LinkMark = { _type: 'link'; href?: string; blank?: boolean }
type ImageValue = { asset?: unknown; alt?: string; caption?: string }
type TableValue = { rows?: { cells?: string[] }[] }

export const ptComponents: PortableTextComponents = {
  block: {
    h2: ({ children, value }: PortableTextComponentProps<PortableTextBlock>) => (
      <h2 id={slugify(getBlockText(value))} className="text-2xl font-bold mt-10 mb-4 text-[var(--color-text)] scroll-mt-32">
        {children}
      </h2>
    ),
    h3: ({ children, value }: PortableTextComponentProps<PortableTextBlock>) => (
      <h3 id={slugify(getBlockText(value))} className="text-xl font-semibold mt-8 mb-3 text-[var(--color-text)] scroll-mt-32">
        {children}
      </h3>
    ),
    h4: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h4 className="text-lg font-semibold mt-6 mb-2 text-[var(--color-text)]">{children}</h4>
    ),
    normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="mb-4 leading-relaxed text-[var(--color-text-muted)]">{children}</p>
    ),
    blockquote: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <blockquote className="border-l-4 border-[#FFD600] pl-4 italic my-6 text-[var(--color-text-muted)]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ul className="list-disc list-outside ml-6 mb-4 space-y-1 text-[var(--color-text-muted)]">{children}</ul>
    ),
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ol className="list-decimal list-outside ml-6 mb-4 space-y-1 text-[var(--color-text-muted)]">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }: PortableTextMarkComponentProps) => (
      <strong className="font-bold text-[var(--color-text)]">{children}</strong>
    ),
    em: ({ children }: PortableTextMarkComponentProps) => <em className="italic">{children}</em>,
    code: ({ children }: PortableTextMarkComponentProps) => (
      <code className="bg-neutral-800 px-1 rounded text-sm font-mono text-[#FFD600]">{children}</code>
    ),
    link: ({ children, value }: PortableTextMarkComponentProps<LinkMark>) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : '_self'}
        rel={value?.blank ? 'noreferrer' : undefined}
        className="underline hover:text-[#FFD600] transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: PortableTextTypeComponentProps<ImageValue>) =>
      value?.asset ? (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(720).auto('format').url()}
            alt={value.alt ?? ''}
            width={720}
            height={405}
            className="rounded w-full h-auto"
          />
          {value.caption && (
            <figcaption className="text-sm text-center text-[var(--color-text-muted)] mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      ) : null,
    table: ({ value }: PortableTextTypeComponentProps<TableValue>) => {
      const rows = value?.rows ?? []
      if (!rows.length) return null
      return (
        <div className="overflow-x-auto my-8 border border-[var(--color-border)]">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={
                    i === 0
                      ? 'border-b-2 border-[#FFD600] bg-[var(--color-bg-muted)]'
                      : 'border-b border-[var(--color-border)]'
                  }
                >
                  {(row.cells ?? []).map((cell, j) => {
                    const Tag = i === 0 ? 'th' : 'td'
                    return (
                      <Tag
                        key={j}
                        className="px-4 py-3 text-left text-[var(--color-text)] font-normal"
                      >
                        {cell}
                      </Tag>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
  },
}

// Some imported posts store spans as `marks: [null]` (plus link markDefs with
// `href: null`). @portabletext/react then misreads every span as an unknown
// block type and renders it `display:none`, so the whole post body is blank.
type LooseBlock = {
  _type?: string
  markDefs?: ({ _type?: string; href?: string | null } | null)[]
  children?: ({ marks?: (string | null)[] } | null)[]
}

function sanitize(value: LooseBlock[]): PortableTextBlock[] {
  return value.map((block) =>
    block?._type !== 'block'
      ? block
      : {
          ...block,
          markDefs: (block.markDefs ?? []).filter((d) => d && (d._type !== 'link' || d.href)),
          children: (block.children ?? []).map((c) =>
            Array.isArray(c?.marks) ? { ...c, marks: c.marks.filter(Boolean) } : c
          ),
        }
  ) as PortableTextBlock[]
}

export default function PortableTextContent({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={sanitize((value ?? []) as LooseBlock[])} components={ptComponents} />
}
