import { useCallback, useSyncExternalStore } from 'react'
import type { Grade } from '../data/topics'

/**
 * หัวข้อที่ผู้ใช้ปักหมุดไว้ เก็บใน localStorage ของเครื่องผู้ใช้เอง
 * คีย์หนึ่งอันคือ "slug__grade" เพราะเนื้อหาแต่ละระดับชั้นคนละชุดกัน
 */
const STORAGE_KEY = 'canva-course:favorites'

export type FavoriteKey = string

export const makeFavoriteKey = (slug: string, grade: Grade): FavoriteKey => `${slug}__${grade}`

export function parseFavoriteKey(key: FavoriteKey): { slug: string; grade: Grade } | undefined {
  const [slug, grade] = key.split('__')
  if (!slug || (grade !== 'm3' && grade !== 'm6')) return undefined
  return { slug, grade }
}

function read(): FavoriteKey[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : []
  } catch {
    // เบราว์เซอร์บางตัวปิด localStorage ไว้ — ถือว่ายังไม่มีรายการโปรด
    return []
  }
}

/* ── store เล็ก ๆ เพื่อให้ทุกหน้าที่ใช้ hook นี้อัปเดตพร้อมกัน ───────── */
let snapshot: FavoriteKey[] = read()
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  // เผื่อผู้ใช้เปิดเว็บไว้หลายแท็บ
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

function onStorage(event: StorageEvent) {
  if (event.key !== STORAGE_KEY) return
  snapshot = read()
  emit()
}

function write(next: FavoriteKey[]) {
  snapshot = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // บันทึกไม่ได้ก็ยังใช้งานต่อได้ในแท็บนี้
  }
  emit()
}

export function useFavorites() {
  const favorites = useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => [] as FavoriteKey[], // ตอน render ฝั่งเซิร์ฟเวอร์/ก่อน hydrate
  )

  const toggle = useCallback((slug: string, grade: Grade) => {
    const key = makeFavoriteKey(slug, grade)
    write(snapshot.includes(key) ? snapshot.filter((item) => item !== key) : [...snapshot, key])
  }, [])

  const isFavorite = useCallback(
    (slug: string, grade: Grade) => favorites.includes(makeFavoriteKey(slug, grade)),
    [favorites],
  )

  return { favorites, toggle, isFavorite }
}
