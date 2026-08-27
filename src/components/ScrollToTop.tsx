import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * เลื่อนกลับขึ้นบนสุดทุกครั้งที่เปลี่ยนหน้า
 * ยกเว้นตอนที่ URL มี hash (เช่นกดสารบัญไปยังหัวข้อย่อย)
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
