import { useEffect, useState } from 'react'
import { ArrowUpIcon } from './Icons'

/** ปุ่มลอยมุมขวาล่าง — โผล่เมื่อเลื่อนลงมาพอสมควร */
export function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="กลับขึ้นบนสุด"
      className={`focus-ring fixed bottom-6 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-grape-500 text-white shadow-lift transition-all duration-300 hover:-translate-y-1 hover:bg-grape-600 sm:bottom-8 sm:right-8 ${
        visible ? 'pointer-events-auto opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUpIcon className="h-5 w-5" />
    </button>
  )
}
