import { useEffect, useState } from 'react'
import { getTopicImages } from '../lib/topicImages'
import { RevealGroup, RevealItem } from './Reveal'
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, ImageIcon } from './Icons'

/**
 * แกลเลอรีรูปประกอบของหัวข้อ — ดึงรูปทั้งหมดจากโฟลเดอร์ที่ระบุใน topics.ts
 * โฟลเดอร์ไหนยังไม่มีรูป จะขึ้นกล่องเทาบอกว่ายังไม่มีรูปประกอบแทน (ไม่ error)
 */
export function TopicGallery({ folder }: { folder: string }) {
  const images = getTopicImages(folder)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // เปลี่ยนหัวข้อ/ระดับชั้นเมื่อไหร่ ให้ปิดรูปที่เปิดค้างไว้
  const [lastFolder, setLastFolder] = useState(folder)
  if (lastFolder !== folder) {
    setLastFolder(folder)
    setOpenIndex(null)
  }

  // ปุ่มลูกศรซ้าย/ขวาและ Escape ตอนเปิดรูปเต็ม
  useEffect(() => {
    if (openIndex === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenIndex(null)
      if (event.key === 'ArrowRight') setOpenIndex((index) => ((index ?? 0) + 1) % images.length)
      if (event.key === 'ArrowLeft')
        setOpenIndex((index) => ((index ?? 0) - 1 + images.length) % images.length)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [openIndex, images.length])

  if (images.length === 0) {
    return (
      <div className="mt-7 grid place-items-center rounded-3xl border border-dashed border-ink-400/30 bg-ink-400/5 px-6 py-16 text-center">
        <ImageIcon className="h-9 w-9 text-ink-400/60" />
        <p className="mt-4 text-sm font-medium text-ink-500">ยังไม่มีรูปประกอบ</p>
        <p className="mt-1 text-xs text-ink-400">
          วางไฟล์รูปในโฟลเดอร์ <code className="text-ink-500">src/assets/images/{folder}/</code>{' '}
          แล้วรูปจะขึ้นที่นี่เอง
        </p>
      </div>
    )
  }

  const current = openIndex === null ? null : images[openIndex]

  return (
    <>
      <RevealGroup className="mt-7 grid gap-6 sm:grid-cols-2" stagger={0.07}>
        {images.map((image, index) => (
          <RevealItem key={image.fileName} className="h-full">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="focus-ring group block h-full w-full overflow-hidden rounded-3xl border border-grape-100 bg-white text-left shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-grape-300 hover:shadow-lift"
            >
              <span className="relative block aspect-[16/10] overflow-hidden bg-grape-50">
                <img
                  src={image.src}
                  alt={image.label || `รูปประกอบที่ ${index + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* overlay จาง ๆ ตอน hover */}
                <span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-grape-700/45 via-grape-700/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </span>
              <span className="flex items-center justify-between gap-3 p-4">
                <span className="min-w-0 truncate text-sm font-medium text-ink-600">
                  {image.label || `รูปประกอบที่ ${index + 1}`}
                </span>
                <span className="shrink-0 text-xs text-ink-400">
                  {index + 1}/{images.length}
                </span>
              </span>
            </button>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* ── ดูรูปเต็ม ─────────────────────────────────────────── */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.label || 'รูปประกอบ'}
          onClick={() => setOpenIndex(null)}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-ink-800/85 p-4 backdrop-blur-sm sm:p-8"
        >
          <img
            src={current.src}
            alt={current.label || 'รูปประกอบ'}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-lift"
          />

          <div
            className="flex items-center gap-3"
            onClick={(event) => event.stopPropagation()}
          >
            {images.length > 1 && (
              <button
                type="button"
                onClick={() => setOpenIndex((index) => ((index ?? 0) - 1 + images.length) % images.length)}
                aria-label="รูปก่อนหน้า"
                className="focus-ring grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
            )}
            <p className="max-w-[60vw] truncate text-sm text-white/90">
              {current.label || `รูปประกอบที่ ${(openIndex ?? 0) + 1}`}
              <span className="ml-2 text-white/50">
                {(openIndex ?? 0) + 1}/{images.length}
              </span>
            </p>
            {images.length > 1 && (
              <button
                type="button"
                onClick={() => setOpenIndex((index) => ((index ?? 0) + 1) % images.length)}
                aria-label="รูปถัดไป"
                className="focus-ring grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
              >
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="ปิดรูป"
            className="focus-ring absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:right-8 sm:top-8"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </>
  )
}
