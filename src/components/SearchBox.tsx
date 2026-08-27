import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GRADES, GRADE_LABEL, topics } from '../data/topics'
import type { Grade } from '../data/topics'
import { SearchIcon, CloseIcon } from './Icons'

interface SearchResult {
  slug: string
  title: string
  grade: Grade
  /** ข้อความที่ตรงกับคำค้น เอาไว้แสดงใต้ชื่อหัวข้อ */
  snippet: string
}

/** ค้นข้าม title / summary / ประเด็นสำคัญ / กิจกรรม ของทั้งสองระดับชั้น */
function search(query: string): SearchResult[] {
  const needle = query.trim().toLowerCase()
  if (needle.length < 1) return []

  const results: SearchResult[] = []
  for (const topic of topics) {
    for (const grade of GRADES) {
      const content = topic.contentByGrade[grade]
      const titleHit = topic.title.toLowerCase().includes(needle)
      const summaryHit = content.summary.toLowerCase().includes(needle)
      const pointHit = content.content.find((point) => point.toLowerCase().includes(needle))
      const workshopHit = content.workshop.toLowerCase().includes(needle)

      if (!titleHit && !summaryHit && !pointHit && !workshopHit) continue
      results.push({
        slug: topic.slug,
        title: topic.title,
        grade,
        snippet: pointHit ?? (workshopHit ? content.workshop : content.summary),
      })
    }
  }
  return results.slice(0, 8)
}

export function SearchBox({
  variant = 'desktop',
  onNavigate,
}: {
  /**
   * desktop — ช่องค้นหาเต็มรูปแบบ (จอกว้างมาก)
   * compact — ปุ่มไอคอนแว่นขยายที่กดแล้วกางช่องค้นหาออกมา (จอเดสก์ท็อปทั่วไป ที่ navbar เริ่มแน่น)
   * mobile  — ช่องค้นหาเต็มความกว้างในเมนู hamburger
   */
  variant?: 'desktop' | 'compact' | 'mobile'
  onNavigate?: () => void
}) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const listId = useId()

  const results = useMemo(() => search(query), [query])

  // ปิดผลการค้นหาเมื่อคลิกนอกช่อง
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent) => {
      if (containerRef.current?.contains(event.target as Node)) return
      setOpen(false)
      setExpanded(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open])

  // แบบ compact: ปิดช่องค้นหาเมื่อคลิกนอกช่องแม้ยังไม่ได้พิมพ์อะไร
  useEffect(() => {
    if (!expanded) return
    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setExpanded(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [expanded])

  const goTo = (result: SearchResult) => {
    setQuery('')
    setOpen(false)
    setExpanded(false)
    onNavigate?.()
    navigate(`/topic/${result.slug}/${result.grade}`)
  }

  const isMobile = variant === 'mobile'
  const isCompact = variant === 'compact'

  // แบบ compact ตอนยังไม่กด — แสดงเป็นปุ่มไอคอนอย่างเดียว
  if (isCompact && !expanded) {
    return (
      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => {
            setExpanded(true)
            window.setTimeout(() => inputRef.current?.focus(), 0)
          }}
          aria-label="ค้นหาเนื้อหาข้ามหัวข้อ"
          aria-expanded={false}
          className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-grape-200 bg-white/80 text-grape-500 transition-all duration-200 hover:border-grape-300 hover:bg-grape-50"
        >
          <SearchIcon className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${isMobile ? 'w-full' : ''} ${isCompact ? 'w-64' : ''}`}
    >
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-grape-400" />
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          ref={inputRef}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setOpen(false)
              setExpanded(false)
            }
            if (event.key === 'Enter' && results[0]) goTo(results[0])
          }}
          placeholder="ค้นหาหัวข้อ / ประเด็นสำคัญ"
          aria-label="ค้นหาเนื้อหาข้ามหัวข้อ"
          aria-controls={listId}
          aria-expanded={open && query.trim().length > 0}
          className={`focus-ring w-full rounded-full border border-grape-200 bg-white/80 py-2 pl-9 pr-8 text-sm text-ink-700 placeholder:text-ink-400 transition-all duration-300 hover:border-grape-300 focus:border-grape-400 focus:bg-white ${
            isMobile || isCompact ? '' : 'w-40 focus:w-64'
          }`}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setOpen(false)
            }}
            aria-label="ล้างคำค้น"
            className="focus-ring absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-400 transition hover:bg-grape-50 hover:text-grape-600"
          >
            <CloseIcon className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {open && query.trim().length > 0 && (
        <div
          id={listId}
          className={`animate-menu-in z-50 overflow-hidden rounded-2xl border border-grape-100 bg-white shadow-lift ${
            isMobile ? 'mt-2' : 'absolute right-0 mt-2 w-80 max-w-[calc(100vw-2.5rem)]'
          }`}
        >
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-ink-400">ไม่พบเนื้อหาที่ตรงกับ “{query}”</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-1">
              {results.map((result) => (
                <li key={`${result.slug}-${result.grade}`}>
                  <button
                    type="button"
                    onClick={() => goTo(result)}
                    className="focus-ring block w-full px-4 py-2.5 text-left transition hover:bg-grape-50"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="shrink-0 rounded-full bg-grape-100 px-2 py-0.5 text-[11px] font-semibold text-grape-700">
                        {GRADE_LABEL[result.grade]}
                      </span>
                      <span className="truncate text-sm font-medium text-ink-700">{result.title}</span>
                    </span>
                    <span className="mt-1 block truncate text-xs text-ink-400">{result.snippet}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
