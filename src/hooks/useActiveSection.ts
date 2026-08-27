import { useEffect, useState } from 'react'

/**
 * บอกว่าตอนนี้เลื่อนอยู่ที่ section ไหน เพื่อไฮไลต์ในสารบัญลอย
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      // นับว่า "กำลังอ่าน" เมื่อ section อยู่ในช่วงกลางจอ
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [ids])

  return active
}
