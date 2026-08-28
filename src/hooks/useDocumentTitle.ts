import { useEffect } from 'react'

/** ชื่อเว็บที่ต่อท้ายทุกหน้า */
const SITE = 'เนื้อหาคอร์ส Canva พื้นฐาน และ Prompt'

/**
 * ตั้งชื่อแท็บเบราว์เซอร์ให้ตรงกับหน้าที่เปิดอยู่
 * เพราะเว็บนี้เป็น single-page app ถ้าไม่ตั้งเอง ทุกหน้าจะชื่อเดียวกันหมด
 * เวลานักเรียนบุ๊กมาร์กหรือเปิดหลายแท็บจะแยกไม่ออกว่าอันไหนคือหัวข้ออะไร
 */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : SITE
  }, [title])
}
