import { Link } from 'react-router-dom'
import type { Instructor } from '../data/instructors'
import { topics } from '../data/topics'

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
      </div>
    </article>
  )
}
