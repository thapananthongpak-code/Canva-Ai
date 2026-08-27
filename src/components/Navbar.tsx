import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CANVA_DECK_URL, GRADES, GRADE_LABEL, topics } from '../data/topics'
import type { Grade } from '../data/topics'
import { PADLET_URL } from '../data/links'
import { SearchBox } from './SearchBox'
import { ChevronDownIcon, ExternalLinkIcon, SparkIcon } from './Icons'

type Tone = 'grape' | 'aqua' | 'mint'

const toneStyles: Record<Tone, { bubble: string; text: string; item: string }> = {
  grape: {
    bubble: 'bg-grape-100 text-grape-700',
    text: 'hover:bg-grape-100 hover:text-grape-700',
    item: 'hover:bg-grape-50 hover:text-grape-700',
  },
  aqua: {
    bubble: 'bg-aqua-100 text-aqua-600',
    text: 'hover:bg-aqua-100 hover:text-aqua-600',
    item: 'hover:bg-aqua-100/60 hover:text-aqua-600',
  },
  mint: {
    bubble: 'bg-mint-100 text-mint-600',
    text: 'hover:bg-mint-100 hover:text-mint-600',
    item: 'hover:bg-mint-100/60 hover:text-mint-600',
  },
}

/** ลำดับสีบับเบิลของแต่ละหัวข้อบน navbar */
const topicTones: Tone[] = ['grape', 'aqua', 'mint', 'grape']

interface MenuItem {
  label: string
  hint?: string
  /** ลิงก์ภายในเว็บ */
  to?: string
  /** ลิงก์ภายนอก (เปิดแท็บใหม่) */
  href?: string
}

/* ══════════════════════════════════════════════════════════════════
   dropdown สำหรับจอใหญ่ — กางด้วย hover หรือคลิกก็ได้
   ══════════════════════════════════════════════════════════════════ */
function NavDropdown({
  id,
  label,
  tone,
  items,
  isActive,
  openMenu,
  setOpenMenu,
  solid = false,
}: {
  id: string
  label: string
  tone: Tone
  items: MenuItem[]
  isActive: boolean
  openMenu: string | null
  setOpenMenu: (id: string | null) => void
  /** ปุ่มแบบพื้นหลังทึบ (ใช้กับปุ่ม Prompt Template) */
  solid?: boolean
}) {
  const open = openMenu === id
  const closeTimer = useRef<number | undefined>(undefined)
  const wrapperRef = useRef<HTMLDivElement>(null)
  // เมนูที่กางด้วยการ "คลิก" จะค้างไว้จนกว่าจะเลือก/คลิกนอกเมนู/กด Escape
  // ไม่ใช่หุบทันทีที่เมาส์ออก (สำคัญกับจอสัมผัสและตอนเลื่อนหน้า)
  const openedByClick = useRef(false)

  const cancelClose = () => window.clearTimeout(closeTimer.current)
  const scheduleClose = () => {
    if (openedByClick.current) return
    cancelClose()
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140)
  }

  useEffect(() => () => cancelClose(), [])

  // เมนูนี้ถูกปิด (หรือมีเมนูอื่นถูกเปิด) → ล้างสถานะ "เปิดด้วยการคลิก"
  useEffect(() => {
    if (!open) openedByClick.current = false
  }, [open])

  // ปิดเมนูเมื่อคลิกนอกเมนู หรือกด Escape
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpenMenu(null)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenu(null)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, setOpenMenu])

  const styles = toneStyles[tone]
  const triggerClass = solid
    ? `flex items-center gap-1.5 whitespace-nowrap rounded-full bg-grape-500 px-4 py-2 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:bg-grape-600 hover:shadow-lift ${
        open ? 'bg-grape-600' : ''
      }`
    : `flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-sm transition-all duration-200 2xl:px-3 ${
        isActive
          ? `${styles.bubble} scale-105 font-bold`
          : `font-medium text-ink-600 ${styles.text} ${open ? styles.bubble : ''}`
      }`

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose()
        setOpenMenu(id)
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={() => {
          openedByClick.current = !open
          setOpenMenu(open ? null : id)
        }}
        aria-expanded={open}
        aria-haspopup="true"
        className={`focus-ring ${triggerClass}`}
      >
        {solid && <SparkIcon className="h-4 w-4" />}
        <span className="whitespace-nowrap">{label}</span>
        <ChevronDownIcon
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-2">
          <div className="animate-menu-in overflow-hidden rounded-2xl border border-grape-100 bg-white p-1.5 shadow-lift">
            {items.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpenMenu(null)}
                  className={`focus-ring flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-600 transition ${styles.item}`}
                >
                  <span>{item.label}</span>
                  <ExternalLinkIcon className="h-3.5 w-3.5 opacity-60" />
                </a>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to ?? '/'}
                  onClick={() => setOpenMenu(null)}
                  className={({ isActive: itemActive }) =>
                    `focus-ring block rounded-xl px-3 py-2.5 text-sm transition ${
                      itemActive
                        ? `${styles.bubble} font-bold`
                        : `font-medium text-ink-600 ${styles.item}`
                    }`
                  }
                >
                  <span>{item.label}</span>
                  {item.hint && <span className="mt-0.5 block text-xs text-ink-400">{item.hint}</span>}
                </NavLink>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   accordion สำหรับเมนูมือถือ
   ══════════════════════════════════════════════════════════════════ */
function MobileAccordion({
  id,
  label,
  tone,
  items,
  openSection,
  setOpenSection,
  onNavigate,
  solid = false,
}: {
  id: string
  label: string
  tone: Tone
  items: MenuItem[]
  openSection: string | null
  setOpenSection: (id: string | null) => void
  onNavigate: () => void
  solid?: boolean
}) {
  const open = openSection === id
  const styles = toneStyles[tone]

  return (
    <div className={`overflow-hidden rounded-2xl ${solid ? 'bg-grape-500' : 'bg-grape-50/60'}`}>
      <button
        type="button"
        onClick={() => setOpenSection(open ? null : id)}
        aria-expanded={open}
        className={`focus-ring flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-semibold ${
          solid ? 'text-white' : 'text-ink-700'
        }`}
      >
        <span className="flex items-center gap-2">
          {solid && <SparkIcon className="h-4 w-4" />}
          {label}
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        {/* ตอนหุบต้องซ่อนจริง ๆ ไม่งั้นลิงก์ข้างในยังกด/แท็บไปโดนได้ */}
        <div className={`overflow-hidden ${open ? 'visible' : 'invisible'}`} aria-hidden={!open}>
          <div className="space-y-1 px-2 pb-2">
            {items.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onNavigate}
                  className="focus-ring flex items-center justify-between rounded-xl bg-white/95 px-3 py-2.5 text-sm font-medium text-ink-600 transition hover:bg-white"
                >
                  <span>{item.label}</span>
                  <ExternalLinkIcon className="h-3.5 w-3.5 opacity-60" />
                </a>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to ?? '/'}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `focus-ring block rounded-xl px-3 py-2.5 text-sm transition ${
                      isActive ? `${styles.bubble} font-bold` : `bg-white/95 font-medium text-ink-600`
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   Navbar
   ══════════════════════════════════════════════════════════════════ */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)
  const location = useLocation()

  // ย่อ navbar ลงเมื่อเลื่อนหน้าลง
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // เปลี่ยนหน้าเมื่อไหร่ ปิดเมนูทุกอันทันที (รวมถึงตอนกดปุ่มย้อนกลับของเบราว์เซอร์)
  // ปรับ state ระหว่าง render แทนการใช้ useEffect จะได้ไม่เห็นเมนูค้างวาบหนึ่งก่อนปิด
  const [lastPath, setLastPath] = useState(location.pathname)
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    setOpenMenu(null)
    setMobileOpen(false)
    setOpenSection(null)
  }

  // ล็อกการเลื่อนพื้นหลังตอนเปิดเมนูมือถือ
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const closeMobile = () => {
    setMobileOpen(false)
    setOpenSection(null)
  }

  const gradeItems = (buildPath: (grade: Grade) => string, prefix: string): MenuItem[] =>
    GRADES.map((grade) => ({ label: `${prefix} ${GRADE_LABEL[grade]}`, to: buildPath(grade) }))

  const padletItems: MenuItem[] = GRADES.map((grade) => ({
    label: GRADE_LABEL[grade],
    href: PADLET_URL[grade],
  }))

  // ลิงก์สไลด์ Canva รวมทั้งชุดของแต่ละระดับชั้น (เปิดแท็บใหม่)
  const canvaItems: MenuItem[] = GRADES.map((grade) => ({
    label: GRADE_LABEL[grade],
    href: CANVA_DECK_URL[grade],
  }))

  return (
    <header
      className={`animate-slide-down sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-grape-100 bg-cream/90 py-1.5 shadow-soft backdrop-blur-md'
          : 'border-transparent bg-cream/70 py-3 backdrop-blur-sm'
      }`}
    >
      <nav className="container-page flex items-center justify-between gap-3">
        {/* โลโก้ / ชื่อเว็บ */}
        <Link
          to="/"
          className="focus-ring group flex shrink-0 items-center gap-2.5 rounded-full py-1 pr-2"
          aria-label="กลับหน้าแรก"
        >
          <span
            className={`grid place-items-center bg-gradient-to-br from-grape-500 to-aqua-400 text-white shadow-soft transition-all duration-300 group-hover:shadow-lift ${
              scrolled ? 'h-8 w-8' : 'h-10 w-10'
            }`}
            style={{ borderRadius: '42% 58% 61% 39% / 45% 39% 61% 55%' }}
          >
            <SparkIcon className={scrolled ? 'h-4 w-4' : 'h-5 w-5'} />
          </span>
          {/* ช่วง xl–2xl แถบเมนูแน่น จึงเหลือแค่โลโก้ แล้วค่อยโชว์ชื่อเต็มอีกครั้งบนจอกว้าง */}
          <span className="leading-tight xl:hidden 2xl:block">
            <span
              className={`block whitespace-nowrap font-bold text-ink-800 transition-all duration-300 ${
                scrolled ? 'text-sm' : 'text-base'
              }`}
            >
              สรุปคอร์ส Canva &amp; Prompt
            </span>
            <span className="hidden text-xs text-ink-400 sm:block">
              คลังทบทวนของนักเรียน ม.3 &amp; ม.6
            </span>
          </span>
        </Link>

        {/* ── เมนูจอใหญ่ ─────────────────────────────────────────── */}
        <div className="hidden items-center gap-0.5 xl:flex 2xl:gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `focus-ring whitespace-nowrap rounded-full px-3 py-2 text-sm transition-all duration-200 ${
                isActive
                  ? 'scale-105 bg-grape-100 font-bold text-grape-700'
                  : 'font-medium text-ink-600 hover:bg-grape-100 hover:text-grape-700'
              }`
            }
          >
            หน้าแรก
          </NavLink>

          {topics.map((topic, index) => (
            <NavDropdown
              key={topic.id}
              id={topic.id}
              label={topic.shortTitle}
              tone={topicTones[index]}
              isActive={location.pathname.startsWith(`/topic/${topic.slug}/`)}
              items={gradeItems((grade) => `/topic/${topic.slug}/${grade}`, 'เนื้อหา')}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
            />
          ))}

          <NavDropdown
            id="instructors"
            label="พี่ผู้สอน"
            tone="mint"
            isActive={location.pathname.startsWith('/instructors')}
            items={gradeItems((grade) => `/instructors/${grade}`, 'ทีม')}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          />
        </div>

        {/* ── ค้นหา + ปุ่ม Padlet ────────────────────────────────── */}
        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <SearchBox variant="compact" />
          <NavDropdown
            id="padlet"
            label="Prompt Template"
            tone="grape"
            isActive={false}
            items={padletItems}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            solid
          />
          <NavDropdown
            id="canva"
            label="Canva"
            tone="grape"
            isActive={false}
            items={canvaItems}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            solid
          />
        </div>

        {/* ── ปุ่ม hamburger (จอเล็ก/แท็บเล็ต) ──────────────────── */}
        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
          className="focus-ring relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-grape-200 bg-white/70 text-grape-600 transition hover:bg-grape-50 xl:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                mobileOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-200 ${
                mobileOpen ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                mobileOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
              }`}
            />
          </span>
        </button>
      </nav>

      {/* ── เมนูมือถือ ─────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="animate-menu-in xl:hidden">
          <div className="container-page max-h-[calc(100vh-5rem)] space-y-2 overflow-y-auto py-4">
            <SearchBox variant="mobile" onNavigate={closeMobile} />

            <NavLink
              to="/"
              end
              onClick={closeMobile}
              className={({ isActive }) =>
                `focus-ring block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive ? 'bg-grape-100 text-grape-700' : 'bg-grape-50/60 text-ink-700'
                }`
              }
            >
              หน้าแรก
            </NavLink>

            {topics.map((topic, index) => (
              <MobileAccordion
                key={topic.id}
                id={topic.id}
                label={topic.shortTitle}
                tone={topicTones[index]}
                items={gradeItems((grade) => `/topic/${topic.slug}/${grade}`, 'เนื้อหา')}
                openSection={openSection}
                setOpenSection={setOpenSection}
                onNavigate={closeMobile}
              />
            ))}

            <MobileAccordion
              id="instructors"
              label="พี่ผู้สอน"
              tone="mint"
              items={gradeItems((grade) => `/instructors/${grade}`, 'ทีม')}
              openSection={openSection}
              setOpenSection={setOpenSection}
              onNavigate={closeMobile}
            />

            <MobileAccordion
              id="padlet"
              label="Prompt Template"
              tone="grape"
              items={padletItems}
              openSection={openSection}
              setOpenSection={setOpenSection}
              onNavigate={closeMobile}
              solid
            />

            <MobileAccordion
              id="canva"
              label="Canva"
              tone="grape"
              items={canvaItems}
              openSection={openSection}
              setOpenSection={setOpenSection}
              onNavigate={closeMobile}
              solid
            />
          </div>
        </div>
      )}
    </header>
  )
}
