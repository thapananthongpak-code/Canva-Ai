import { Link } from 'react-router-dom'
import { GRADES, GRADE_LABEL, topics } from '../data/topics'
import { PADLET_URL } from '../data/links'
import { ExternalLinkIcon, SparkIcon } from './Icons'
import { Blobs } from './Blobs'

const linkClass =
  'focus-ring rounded text-sm text-ink-500 transition-colors duration-200 hover:text-grape-600'

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-grape-100 bg-white/70">
      <Blobs
        blobs={[
          { tone: 'grape', position: 'top-[-3rem] left-[6%] h-44 w-44 sm:h-56 sm:w-56' },
          { tone: 'aqua', position: 'bottom-4 right-[-3rem] h-40 w-40 sm:h-52 sm:w-52' },
        ]}
      />
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* แนะนำเว็บ */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" className="focus-ring group inline-flex items-center gap-2.5 rounded-full">
            <span
              className="grid h-9 w-9 place-items-center bg-gradient-to-br from-grape-500 to-aqua-400 text-white shadow-soft transition-shadow duration-300 group-hover:shadow-lift"
              style={{ borderRadius: '42% 58% 61% 39% / 45% 39% 61% 55%' }}
            >
              <SparkIcon className="h-4 w-4" />
            </span>
            <span className="font-bold text-ink-800">สรุปคอร์ส Canva &amp; Prompt</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500">
            คลังสรุปเนื้อหาหลังการอบรมสำหรับนักเรียน ม.3 และ ม.6 ที่เรียนคอร์สนี้ไปแล้ว
            กลับมาอ่านทบทวนประเด็นสำคัญ กิจกรรมในคาบ และสไลด์ที่ใช้สอนได้ทุกเมื่อ
          </p>
        </div>

        {/* หัวข้อทั้งหมด */}
        <div>
          <h2 className="mb-4 text-sm font-bold text-ink-700">หัวข้อทั้งหมด</h2>
          <ul className="space-y-2.5">
            {topics.map((topic) => (
              <li key={topic.id} className="leading-snug">
                <Link to={`/topic/${topic.slug}/m3`} className={linkClass}>
                  {topic.title}
                </Link>
                <span className="ml-1 whitespace-nowrap text-xs text-ink-400">
                  {GRADES.map((grade, index) => (
                    <span key={grade}>
                      {index > 0 && <span className="px-1">·</span>}
                      <Link
                        to={`/topic/${topic.slug}/${grade}`}
                        className="focus-ring rounded transition-colors hover:text-grape-600"
                      >
                        {GRADE_LABEL[grade]}
                      </Link>
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ทีมพี่ผู้สอน */}
        <div>
          <h2 className="mb-4 text-sm font-bold text-ink-700">ทีมพี่ผู้สอน</h2>
          <ul className="space-y-2.5">
            {GRADES.map((grade) => (
              <li key={grade}>
                <Link to={`/instructors/${grade}`} className={linkClass}>
                  ทีมพี่ผู้สอน {GRADE_LABEL[grade]}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/" className={linkClass}>
                หน้าแรก
              </Link>
            </li>
          </ul>
        </div>

        {/* Padlet */}
        <div>
          <h2 className="mb-4 text-sm font-bold text-ink-700">Padlet</h2>
          <ul className="space-y-2.5">
            {GRADES.map((grade) => (
              <li key={grade}>
                <a
                  href={PADLET_URL[grade]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-1.5`}
                >
                  คลัง Prompt ของ {GRADE_LABEL[grade]}
                  <ExternalLinkIcon className="h-3.5 w-3.5 opacity-60" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-grape-100/80">
        <div className="container-page py-6">
          <p className="text-center text-xs leading-relaxed text-ink-400">
            เว็บไซต์นี้เป็นแหล่งทบทวนเนื้อหาที่นักเรียนจัดทำกันเอง
            <span className="mx-1">·</span>
            ไม่ใช่เว็บไซต์ทางการของคอร์ส และไม่ใช่หน้าประชาสัมพันธ์หรือขายคอร์ส
          </p>
        </div>
      </div>
    </footer>
  )
}
