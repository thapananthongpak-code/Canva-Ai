import { Link, Navigate, useParams } from 'react-router-dom'
import { GRADE_LABEL, isGrade, topics } from '../data/topics'
import type { Grade } from '../data/topics'
import { getInstructorsByGrade } from '../data/instructors'
import { Blobs } from '../components/Blobs'
import { InstructorCard } from '../components/InstructorCard'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { ArrowRightIcon, ChevronRightIcon } from '../components/Icons'

const otherGrade = (grade: Grade): Grade => (grade === 'm3' ? 'm6' : 'm3')

/**
 * หน้าทีมพี่ผู้สอน — แยกกันคนละ route ตามระดับชั้น
 * /instructors/m3 และ /instructors/m6 โหลดข้อมูลเฉพาะทีมของตัวเองเท่านั้น
 */
export function InstructorsPage() {
  const { grade: gradeParam } = useParams()

  // grade ผิด → ส่งกลับไปที่ ม.3 เป็นค่าเริ่มต้น
  if (!isGrade(gradeParam)) return <Navigate to="/instructors/m3" replace />

  const grade = gradeParam
  const team = getInstructorsByGrade(grade)
  const other = otherGrade(grade)
  const isM3 = grade === 'm3'

  return (
    <>
      {/* ══════════════ หัวหน้า ══════════════ */}
      <section className="relative overflow-hidden pt-8">
        <Blobs
          blobs={[
            { tone: isM3 ? 'grape' : 'aqua', position: '-top-24 right-[-4rem] h-80 w-80' },
            { tone: 'mint', position: 'top-40 left-[-5rem] h-64 w-64' },
          ]}
        />
        <div className="container-page">
          <nav aria-label="เส้นทางหน้า">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-400">
              <li>
                <Link to="/" className="focus-ring rounded transition-colors hover:text-grape-600">
                  หน้าแรก
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRightIcon className="h-3.5 w-3.5" />
              </li>
              <li className="font-medium text-ink-600" aria-current="page">
                ทีมพี่ผู้สอน {GRADE_LABEL[grade]}
              </li>
            </ol>
          </nav>

          <Reveal className="mt-7">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold ${
                isM3 ? 'bg-grape-100 text-grape-700' : 'bg-aqua-100 text-aqua-600'
              }`}
            >
              ทีมของระดับชั้น {GRADE_LABEL[grade]} · {team.length} คน
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-ink-800 sm:text-4xl">
              ทีมพี่ผู้สอน{' '}
              <span className={isM3 ? 'text-grape-600' : 'text-aqua-600'}>{GRADE_LABEL[grade]}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-500">
              พี่ผู้สอนทั้ง {team.length} คนของทีม {GRADE_LABEL[grade]} แบ่งกันรับผิดชอบคนละ 1 หัวข้อ
              จากทั้งหมด {topics.length} หัวข้อ ติดต่อพี่ ๆ ได้ตามช่องทางในการ์ดถ้ามีอะไรอยากถามเพิ่ม
            </p>

            {/* ลิงก์ไปดูอีกทีม (คนละหน้ากัน ไม่ใช่ตัวสลับในหน้าเดียว) */}
            <Link
              to={`/instructors/${other}`}
              className="focus-ring group mt-7 inline-flex items-center gap-2 rounded-full border border-grape-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-ink-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-grape-300 hover:text-grape-700 hover:shadow-soft"
            >
              ไปดูทีมพี่ผู้สอน {GRADE_LABEL[other]}
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══════════════ การ์ดพี่ผู้สอน 4 คน ══════════════ */}
      <section className="container-page mt-14">
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((instructor) => (
            <RevealItem key={instructor.id} className="h-full">
              <InstructorCard instructor={instructor} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ══════════════ ลิงก์ไปเนื้อหาของทีมนี้ ══════════════ */}
      <section className="container-page mt-20">
        <Reveal className="rounded-3xl border border-grape-100 bg-white/70 p-6 shadow-soft sm:p-8">
          <h2 className="text-xl font-bold text-ink-800">
            เนื้อหาทั้ง {topics.length} หัวข้อของทีม {GRADE_LABEL[grade]}
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {topics.map((topic, index) => (
              <li key={topic.id}>
                <Link
                  to={`/topic/${topic.slug}/${grade}`}
                  className="focus-ring group flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-grape-100 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-grape-300 hover:shadow-soft"
                >
                  <span className="min-w-0">
                    <span className="block text-xs text-ink-400">หัวข้อที่ {index + 1}</span>
                    <span className="block truncate text-sm font-semibold text-ink-700">
                      {topic.title}
                    </span>
                  </span>
                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-grape-500 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </>
  )
}
