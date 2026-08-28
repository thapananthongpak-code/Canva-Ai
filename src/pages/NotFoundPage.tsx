import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Blobs } from '../components/Blobs'
import { ArrowRightIcon } from '../components/Icons'

export function NotFoundPage() {
  useDocumentTitle('ไม่พบหน้านี้')

  return (
    <section className="relative isolate overflow-hidden">
      <Blobs
        blobs={[
          { tone: 'grape', position: '-top-16 left-[10%] h-64 w-64' },
          { tone: 'mint', position: 'bottom-0 right-[8%] h-56 w-56' },
          { tone: 'aqua', kind: 'bubble', position: 'top-[24%] right-[16%] h-12 w-12 sm:h-16 sm:w-16' },
          { tone: 'grape', kind: 'ring', position: 'bottom-[22%] left-[18%] h-10 w-10 sm:h-14 sm:w-14' },
        ]}
      />
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="text-6xl font-bold text-gradient">404</span>
        <h1 className="mt-6 text-2xl font-bold text-ink-800 sm:text-3xl">ไม่พบหน้านี้</h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-ink-500">
          ลิงก์อาจพิมพ์ผิดหรือถูกย้ายไปแล้ว ลองกลับไปหน้าแรกแล้วเลือกหัวข้อที่อยากทบทวนอีกครั้ง
        </p>
        <Link
          to="/"
          className="focus-ring group mt-8 inline-flex items-center gap-2 rounded-full bg-grape-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-grape-600 hover:shadow-lift"
        >
          กลับหน้าแรก
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
