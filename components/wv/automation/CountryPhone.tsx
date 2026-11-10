'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { getCountries, matchDial } from './countries'

type Props = { id: string; label: string; error?: string }

export function CountryPhone({ id, label, error }: Props) {
  const all = useMemo(() => getCountries(), [])
  const [iso, setIso] = useState('US')
  const [num, setNum] = useState('')
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const picked = useRef(false)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const search = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const uid = useId()
  const listId = `${uid}-list`

  const cur = all.find((c) => c.iso === iso) ?? all[0]

  // Detect: browser locale immediately, then server geo; never override a manual pick.
  useEffect(() => {
    const known = (c?: string | null) => (c && all.some((x) => x.iso === c.toUpperCase()) ? c.toUpperCase() : null)
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language]
    const fromLang = langs.map((l) => known(l.split('-')[1])).find(Boolean)
    if (fromLang && !picked.current) setIso(fromLang)
    fetch('/api/geo')
      .then((r) => r.json())
      .then((d: { country: string | null }) => {
        const c = known(d.country)
        if (c && !picked.current) setIso(c)
      })
      .catch(() => {})
  }, [all])

  const needle = q.trim().toLowerCase().replace(/^\+/, '')
  const shown = useMemo(
    () => {
      if (!needle) return all
      const hit = all.filter((c) => c.name.toLowerCase().includes(needle) || c.iso.toLowerCase() === needle || c.dial.startsWith(needle))
      const rank = (c: (typeof all)[number]) => (c.name.toLowerCase().startsWith(needle) ? 0 : 1) // name-prefix matches first
      return hit.sort((a, b) => rank(a) - rank(b))
    },
    [all, needle],
  )

  function openList() {
    setQ('')
    setActive(Math.max(0, all.findIndex((c) => c.iso === iso)))
    setOpen(true)
  }
  function close(refocus: boolean) {
    setOpen(false)
    if (refocus) trigger.current?.focus()
  }
  function choose(i: string) {
    picked.current = true
    setIso(i)
    close(true)
  }

  useEffect(() => {
    if (!open) return
    search.current?.focus()
    const off = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', off)
    return () => document.removeEventListener('pointerdown', off)
  }, [open])

  useEffect(() => {
    if (open) listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [open, active, shown])

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, shown.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (shown[active]) choose(shown[active].iso)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      close(true)
    } else if (e.key === 'Tab') close(false)
  }

  function onNum(v: string) {
    const t = v.trimStart()
    if (t.startsWith('+')) {
      const m = matchDial(t.replace(/\D/g, ''))
      if (m) {
        picked.current = true
        setIso(m.country.iso)
        setNum(m.rest)
        return
      }
    }
    setNum(v)
  }

  return (
    <div className="wv-ax-field wv-ax-phone">
      <label htmlFor={`${id}-phone`}>{label}</label>
      <div className="wv-ax-phone-row" ref={root}>
        <button
          ref={trigger}
          type="button"
          className="wv-ax-cc"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Country code: ${cur.name} +${cur.dial}`}
          onClick={() => (open ? close(false) : openList())}
        >
          <span aria-hidden="true">{cur.flag}</span>
          <span>+{cur.dial}</span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <input type="hidden" name="phoneIso" value={iso} />
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="Phone number"
          value={num}
          onChange={(e) => onNum(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-phone-e` : undefined}
        />
        {open && (
          <div className="wv-ax-cc-pop" onKeyDown={onKey}>
            <input
              ref={search}
              className="wv-ax-cc-search"
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-activedescendant={shown[active] ? `${uid}-o-${shown[active].iso}` : undefined}
              aria-label="Search country or code"
              placeholder="Search country or code"
              autoComplete="off"
              value={q}
              onChange={(e) => {
                setQ(e.target.value)
                setActive(0)
              }}
            />
            <ul ref={listRef} id={listId} role="listbox" aria-label="Countries" className="wv-ax-cc-list">
              {shown.map((c, i) => (
                <li
                  key={c.iso}
                  id={`${uid}-o-${c.iso}`}
                  role="option"
                  aria-selected={c.iso === iso}
                  data-active={i === active}
                  onClick={() => choose(c.iso)}
                  onMouseMove={() => active !== i && setActive(i)}
                >
                  <span aria-hidden="true">{c.flag}</span>
                  <span className="wv-ax-cc-name">{c.name}</span>
                  {c.iso === iso && <span aria-hidden="true">✓</span>}
                  <span className="wv-ax-cc-dial">+{c.dial}</span>
                </li>
              ))}
              {!shown.length && <li className="wv-ax-cc-empty">No match</li>}
            </ul>
          </div>
        )}
      </div>
      {error && (
        <em id={`${id}-phone-e`} role="alert">
          {error}
        </em>
      )}
    </div>
  )
}
