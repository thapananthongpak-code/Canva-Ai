import { useLayoutEffect, useRef, type ReactNode } from 'react'

/**
 * เอฟเฟกต์ค่อย ๆ ปรากฏตอนเลื่อนเข้ามาในจอ — เล่นครั้งเดียวแล้วนิ่ง
 * ────────────────────────────────────────────────────────────────
 * กฎเหล็กของไฟล์นี้: "เนื้อหาต้องโผล่เสมอ"
 * ถ้าอะไรก็ตามพลาด (เบราว์เซอร์ไม่รองรับ IntersectionObserver, observer ไม่ยิง,
 * หรือยิงช้าเพราะเพิ่งเปลี่ยนหน้า) ต้องไม่เหลือเนื้อหาที่จางค้างอยู่บนหน้าจอ
 * จึงมีตาข่ายกันตกสามชั้น: เช็กตำแหน่งตอน mount → observer → ตัวจับเวลากันเหนียว
 *
 * ใช้วิธีสลับ data-reveal บน DOM ตรง ๆ แทน state ของ React
 * เพราะเป็นเรื่องการแสดงผลล้วน ๆ ไม่ต้อง re-render และไม่มีทางค้างกลางคัน
 */

/** ถ้า observer ไม่ยิงภายในเวลานี้ ให้แสดงเนื้อหาไปเลย (มิลลิวินาที) */
const FAILSAFE_MS = 900

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const show = () => element.setAttribute('data-reveal', 'shown')

    // ชั้นที่ 1 — เบราว์เซอร์ไม่รองรับ ก็แสดงไปเลย
    if (typeof IntersectionObserver === 'undefined') {
      show()
      return
    }

    // ชั้นที่ 2 — อยู่ในจออยู่แล้วตั้งแต่ตอน mount (เช่นเพิ่งเปลี่ยนหน้ามา) ไม่ต้องรอ observer
    const rect = element.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      show()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          show()
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -5% 0px' },
    )
    observer.observe(element)

    // ชั้นที่ 3 — กันเหนียว เผื่อ observer เงียบไปเฉย ๆ
    const failsafe = window.setTimeout(() => {
      show()
      observer.disconnect()
    }, FAILSAFE_MS)

    return () => {
      observer.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [])

  return ref
}

/** คลาสของตัวที่ค่อย ๆ ปรากฏด้วยตัวเอง */
const selfReveal =
  'translate-y-4 opacity-0 transition-[opacity,transform] duration-500 ease-out data-[reveal=shown]:translate-y-0 data-[reveal=shown]:opacity-100'

/** คลาสของลูกที่รอสัญญาณจาก RevealGroup */
const childReveal =
  'translate-y-4 opacity-0 transition-[opacity,transform] duration-500 ease-out group-data-[reveal=shown]/reveal:translate-y-0 group-data-[reveal=shown]/reveal:opacity-100'

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  /** หน่วงก่อนเริ่ม (วินาที) */
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article'
}) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <Tag
      ref={ref}
      data-reveal="hidden"
      className={`${className ?? ''} ${selfReveal}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  )
}

/** ลิสต์ที่อยากให้ลูก ๆ ทยอยโผล่ทีละชิ้น */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref} data-reveal="hidden" className={`group/reveal ${className ?? ''}`}>
      {children}
    </div>
  )
}

/** ลูกของ RevealGroup — ส่ง index มาด้วยเพื่อให้ทยอยโผล่ทีละชิ้น */
export function RevealItem({
  children,
  className,
  index = 0,
  stagger = 0.08,
}: {
  children: ReactNode
  className?: string
  index?: number
  /** ระยะห่างของจังหวะที่ลูกแต่ละชิ้นโผล่ (วินาที) */
  stagger?: number
}) {
  return (
    <div
      className={`${className ?? ''} ${childReveal}`}
      style={index ? { transitionDelay: `${index * stagger}s` } : undefined}
    >
      {children}
    </div>
  )
}
