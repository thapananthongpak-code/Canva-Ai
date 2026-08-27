import { Link } from 'react-router-dom'
import type { Instructor } from '../data/instructors'
import { topics } from '../data/topics'
import { FacebookIcon, InstagramIcon, LineIcon, MailIcon } from './Icons'

/** แปลงค่าที่กรอกไว้ใน instructors.ts ให้เป็นลิงก์ที่กดได้ */
function toHref(kind: keyof Instructor['contact'], value: string): string {
  if (!value) return ''
  const isUrl = value.startsWith('http://') || value.startsWith('https://')
  switch (kind) {
    case 'email':
      return value.includes('@') && !isUrl ? `mailto:${value}` : value
    case 'line':
      return isUrl ? value : `https://line.me/ti/p/~${value.replace(/^@/, '')}`
    case 'facebook':
      return isUrl ? value : `https://facebook.com/${value.replace(/^@/, '')}`
    case 'instagram':
      return isUrl ? value : `https://instagram.com/${value.replace(/^@/, '')}`
  }
}

const channels = [
  { kind: 'line' as const, label: 'LINE', Icon: LineIcon, hover: 'hover:bg-mint-100 hover:text-mint-600' },
  { kind: 'facebook' as const, label: 'Facebook', Icon: FacebookIcon, hover: 'hover:bg-grape-100 hover:text-grape-700' },
  { kind: 'instagram' as const, label: 'Instagram', Icon: InstagramIcon, hover: 'hover:bg-grape-100 hover:text-grape-700' },
  { kind: 'email' as const, label: 'อีเมล', Icon: MailIcon, hover: 'hover:bg-aqua-100 hover:text-aqua-600' },
]

export function InstructorCard({ instructor }: { instructor: Instructor }) {
  const topic = topics.find((item) => item.id === instructor.topicId)
  const topicIndex = topics.findIndex((item) => item.id === instructor.topicId)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-grape-100 bg-paper shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-grape-300 hover:shadow-lift">
      {/* รูปพี่ผู้สอน — กรอบแนวตั้งให้พอดีกับรูปคน, hover แล้วซูมเข้าเล็กน้อย */}
      <div className="aspect-[3/4] overflow-hidden bg-grape-50">
        <img
          src={instructor.photoUrl}
          alt={instructor.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold leading-snug text-ink-800">{instructor.name}</h3>

        {topic && (
          <Link
            to={`/topic/${topic.slug}/${instructor.grade}`}
            className="focus-ring mt-3 inline-flex w-fit max-w-full items-center gap-1.5 rounded-full bg-grape-50 px-3 py-1.5 text-xs font-semibold text-grape-700 transition-colors duration-200 hover:bg-grape-100"
          >
            <span className="shrink-0 text-grape-400">หัวข้อที่ {topicIndex + 1}</span>
            <span className="line-clamp-1">{topic.shortTitle}</span>
          </Link>
        )}

        <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-500">{instructor.bio}</p>

        <div className="mt-6 flex items-center gap-2 border-t border-grape-100 pt-5">
          {channels.map(({ kind, label, Icon, hover }) => {
            const value = instructor.contact[kind]
            const href = toHref(kind, value)

            // ไม่มีข้อมูล → แสดงไอคอนจางแบบกดไม่ได้
            if (!href) {
              return (
                <span
                  key={kind}
                  title={`ยังไม่มีข้อมูล ${label}`}
                  aria-disabled="true"
                  className="grid h-9 w-9 cursor-not-allowed place-items-center rounded-full bg-grape-50/60 text-ink-400/40"
                >
                  <Icon className="h-4 w-4" />
                </span>
              )
            }

            return (
              <a
                key={kind}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                aria-label={`${label} ของ ${instructor.name}`}
                className={`focus-ring grid h-9 w-9 place-items-center rounded-full bg-grape-50 text-ink-500 transition-all duration-200 hover:-translate-y-0.5 ${hover}`}
              >
                <Icon className="h-4 w-4" />
              </a>
            )
          })}
        </div>
      </div>
    </article>
  )
}
