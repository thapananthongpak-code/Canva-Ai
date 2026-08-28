import { Link } from 'react-router-dom'
import type { Grade, Topic } from '../data/topics'
import { GRADE_LABEL } from '../data/topics'
import { TopicIcon } from './TopicIcon'
import { ArrowRightIcon } from './Icons'

/** สีของการ์ดบอกระดับชั้น — ม.3 ม่วง / ม.6 ฟ้า ให้ตรงกับที่ใช้ในหน้าอื่น */
const accents: Record<Grade, { ring: string; chip: string; glow: string; cta: string; badge: string }> = {
  m3: {
    ring: 'hover:border-grape-300',
    chip: 'bg-grape-100 text-grape-700',
    glow: 'from-grape-100',
    cta: 'text-grape-600',
    badge: 'bg-grape-50 text-grape-600',
  },
  m6: {
    ring: 'hover:border-aqua-300',
    chip: 'bg-aqua-100 text-aqua-600',
    glow: 'from-aqua-100',
    cta: 'text-aqua-600',
    badge: 'bg-aqua-100/70 text-aqua-600',
  },
}

export function TopicCard({
  topic,
  index,
  grade = 'm3',
}: {
  topic: Topic
  index: number
  /** ระดับชั้นที่การ์ดนี้ลิงก์ไป */
  grade?: Grade
}) {
  const accent = accents[grade]
  const content = topic.contentByGrade[grade]

  return (
    <Link
      to={`/topic/${topic.slug}/${grade}`}
      className={`focus-ring group relative flex h-full flex-col overflow-hidden rounded-3xl border border-grape-100 bg-paper p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift ${accent.ring}`}
    >
      {/* แสงจาง ๆ มุมบนขวา โผล่ตอน hover */}
      <span
        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${accent.glow} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-3">
        <span className={`grid h-12 w-12 place-items-center rounded-2xl ${accent.chip}`}>
          <TopicIcon icon={topic.icon} className="h-6 w-6" />
        </span>
        <span className="flex shrink-0 items-center gap-1.5">
          <span className="rounded-full border border-grape-100 px-2.5 py-1 text-xs font-semibold text-ink-400">
            หัวข้อที่ {index + 1}
          </span>
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${accent.badge}`}>
            {GRADE_LABEL[grade]}
          </span>
        </span>
      </div>

      <h3 className="relative mt-5 text-lg font-bold leading-snug text-ink-800 transition-colors duration-200 group-hover:text-grape-700">
        {topic.title}
      </h3>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ink-500">{content.summary}</p>

      <span className={`relative mt-6 flex items-center gap-2 text-sm font-semibold ${accent.cta}`}>
        อ่านเนื้อหาเวอร์ชัน {GRADE_LABEL[grade]}
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
      </span>
    </Link>
  )
}
