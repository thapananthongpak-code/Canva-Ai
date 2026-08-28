import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  GRADE_LABEL,
  getCanvaLinks,
  getTopicBySlug,
  getTopicNeighbors,
  getTopicNumber,
  isGrade,
  topics,
} from '../data/topics'
import { getInstructorById } from '../data/instructors'
import { useFavorites } from '../hooks/useFavorites'
import { useActiveSection } from '../hooks/useActiveSection'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { Blobs } from '../components/Blobs'
import { GradeSwitch } from '../components/GradeSwitch'
import { TopicIcon } from '../components/TopicIcon'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookmarkIcon,
  CheckIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  ListIcon,
  WorkshopIcon,
} from '../components/Icons'
import { NotFoundPage } from './NotFoundPage'

const sections = [
  { id: 'key-points', label: 'ประเด็นสำคัญ' },
  { id: 'workshop', label: 'กิจกรรมในคาบ' },
  { id: 'slides', label: 'สไลด์ Canva' },
]

export function TopicPage() {
  const { slug, grade: gradeParam } = useParams()
  const topic = getTopicBySlug(slug)
  const sectionIds = useMemo(() => sections.map((section) => section.id), [])
  const activeSection = useActiveSection(sectionIds)
  const { isFavorite, toggle } = useFavorites()
  useDocumentTitle(
    topic && isGrade(gradeParam) ? `${topic.title} · ${GRADE_LABEL[gradeParam]}` : undefined,
  )

  // slug ไม่มีอยู่จริง → หน้า 404
  if (!topic) return <NotFoundPage />
  // grade ผิด → ส่งกลับไปที่ ม.3 เป็นค่าเริ่มต้น
  if (!isGrade(gradeParam)) return <Navigate to={`/topic/${topic.slug}/m3`} replace />

  const grade = gradeParam
  const content = topic.contentByGrade[grade]
  const instructor = getInstructorById(content.instructorId)
  const { prev, next } = getTopicNeighbors(topic.slug, grade)
  const topicNumber = getTopicNumber(topic, grade)
  const slides = getCanvaLinks(content.canvaEmbedUrl)
  const pinned = isFavorite(topic.slug, grade)

  return (
    <>
      {/* ══════════════ ส่วนหัวของหน้า ══════════════ */}
      <section className="relative isolate overflow-hidden pb-4 pt-8">
        <Blobs
          blobs={[
            { tone: 'grape', position: '-top-24 left-[-4rem] h-72 w-72' },
            { tone: 'aqua', position: 'top-4 right-[-6rem] h-80 w-80' },
            { tone: 'mint', kind: 'bubble', position: 'top-[18%] right-[12%] h-12 w-12 sm:h-20 sm:w-20' },
            { tone: 'grape', kind: 'ring', position: 'bottom-[10%] right-[28%] h-10 w-10 sm:h-14 sm:w-14' },
          ]}
        />
        <div className="container-page">
          {/* Breadcrumb */}
          <nav aria-label="เส้นทางการนำทาง">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-400">
              <li>
                <Link to="/" className="focus-ring rounded transition-colors hover:text-grape-600">
                  หน้าแรก
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRightIcon className="h-3.5 w-3.5" />
              </li>
              <li>
                <Link to="/#topics" className="focus-ring rounded transition-colors hover:text-grape-600">
                  หัวข้อ
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRightIcon className="h-3.5 w-3.5" />
              </li>
              <li className="font-medium text-ink-600" aria-current="page">
                {topic.title}
              </li>
            </ol>
          </nav>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-grape-100 text-grape-700">
              <TopicIcon icon={topic.icon} className="h-6 w-6" />
            </span>
            <span className="rounded-full border border-grape-200 bg-white/70 px-3 py-1 text-xs font-semibold text-grape-600">
              หัวข้อที่ {topicNumber} จาก {topics.length}
            </span>
          </div>

          <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight text-ink-800 sm:text-4xl">
            {topic.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-500">{content.summary}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <GradeSwitch
              current={grade}
              buildPath={(target) => `/topic/${topic.slug}/${target}`}
              label="ดูเนื้อหาของ"
            />

            <button
              type="button"
              onClick={() => toggle(topic.slug, grade)}
              aria-pressed={pinned}
              className={`focus-ring inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                pinned
                  ? 'border-mint-300 bg-mint-100 text-mint-600 shadow-note'
                  : 'border-grape-200 bg-white/80 text-ink-500 hover:border-grape-300 hover:text-grape-600'
              }`}
            >
              <BookmarkIcon className="h-4 w-4" filled={pinned} />
              {pinned ? `ปักหมุดไว้แล้ว (${GRADE_LABEL[grade]})` : 'ปักหมุดหัวข้อนี้'}
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════ เนื้อหา + สารบัญลอย ══════════════ */}
      <div className="relative isolate overflow-hidden pb-4 pt-14">
        <Blobs
          blobs={[
            { tone: 'mint', position: 'top-[4%] right-[-3rem] h-52 w-52 sm:h-64 sm:w-64' },
            { tone: 'grape', position: 'top-[30%] left-[-2rem] h-56 w-56 sm:h-72 sm:w-72' },
            { tone: 'aqua', position: 'top-[58%] right-[-2rem] h-48 w-48 sm:h-64 sm:w-64' },
            { tone: 'grape', position: 'bottom-[4%] left-[4%] h-48 w-48 sm:h-60 sm:w-60' },
            { tone: 'aqua', kind: 'bubble', position: 'top-[16%] left-[3%] h-12 w-12 sm:h-16 sm:w-16' },
            { tone: 'mint', kind: 'ring', position: 'top-[44%] left-[7%] h-14 w-14 sm:h-20 sm:w-20' },
            { tone: 'grape', kind: 'bubble', position: 'top-[70%] left-[2%] h-9 w-9 sm:h-12 sm:w-12' },
            { tone: 'mint', kind: 'bubble', position: 'bottom-[14%] right-[6%] h-10 w-10 sm:h-14 sm:w-14' },
            { tone: 'aqua', kind: 'ring', position: 'bottom-[30%] left-[24%] h-8 w-8 sm:h-12 sm:w-12' },
          ]}
        />
        <div className="container-page grid gap-10 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-12">
        {/* สารบัญ */}
        <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-grape-100 bg-white/80 p-4 shadow-soft">
            <p className="mb-3 flex items-center gap-2 px-2 text-xs font-bold uppercase tracking-wider text-ink-400">
              <ListIcon className="h-4 w-4" />
              สารบัญ
            </p>
            <ul className="flex gap-1.5 overflow-x-auto lg:flex-col lg:overflow-visible">
              {sections.map((section) => {
                const active = activeSection === section.id
                return (
                  <li key={section.id} className="shrink-0 lg:shrink">
                    <a
                      href={`#${section.id}`}
                      className={`focus-ring block whitespace-nowrap rounded-xl px-3 py-2 text-sm transition-all duration-200 ${
                        active
                          ? 'bg-grape-100 font-bold text-grape-700'
                          : 'font-medium text-ink-500 hover:bg-grape-50 hover:text-grape-600'
                      }`}
                    >
                      {section.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* พี่ผู้สอนของหัวข้อนี้ */}
          {instructor && (
            <Link
              to={`/instructors/${grade}`}
              className="focus-ring group mt-4 hidden rounded-3xl border border-grape-100 bg-white/80 p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-grape-300 hover:shadow-lift lg:block"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">สอนโดย</p>
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={instructor.photoUrl}
                  alt={instructor.name}
                  loading="lazy"
                  className="h-11 w-11 rounded-full object-cover"
                />
                <span className="text-sm font-semibold leading-snug text-ink-700">{instructor.name}</span>
              </div>
              <span className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-grape-600">
                ดูทีมพี่ผู้สอน {GRADE_LABEL[grade]}
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          )}
        </aside>

        <main className="min-w-0 space-y-20">
          {/* ── ประเด็นสำคัญ ────────────────────────────────── */}
          <section id="key-points" className="scroll-mt-28">
            <Reveal>
              <h2 className="text-2xl font-bold text-ink-800 sm:text-3xl">ประเด็นสำคัญ</h2>
              <p className="mt-2 text-sm text-ink-400">
                สิ่งที่เรียนไปในหัวข้อนี้ เวอร์ชัน {GRADE_LABEL[grade]}
              </p>
            </Reveal>

            <RevealGroup className="mt-7 space-y-3">
              {content.content.map((point, pointIndex) => (
                <RevealItem key={pointIndex} index={pointIndex} stagger={0.06}>
                  <div className="group flex items-start gap-4 rounded-2xl border border-grape-100 bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-grape-300 hover:shadow-lift sm:p-5">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-grape-100 text-grape-700 transition-colors duration-300 group-hover:bg-grape-500 group-hover:text-white">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <p className="text-[15px] leading-relaxed text-ink-600">{point}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </section>

          {/* ── กิจกรรมในคาบ ────────────────────────────────── */}
          <section id="workshop" className="scroll-mt-28">
            <Reveal>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-ink-800 sm:text-3xl">
                <WorkshopIcon className="h-6 w-6 text-aqua-500" />
                กิจกรรมในคาบ
              </h2>
              <p className="mt-2 text-sm text-ink-400">
                สิ่งที่ได้ลงมือทำจริงในหัวข้อนี้ เวอร์ชัน {GRADE_LABEL[grade]}
              </p>
            </Reveal>

            <Reveal delay={0.05} className="mt-7">
              <div className="rounded-3xl border border-aqua-200 bg-aqua-100/40 p-6 sm:p-8">
                <p className="text-[15px] leading-loose text-ink-700">{content.workshop}</p>
              </div>
            </Reveal>
          </section>

          {/* ── สไลด์ Canva ─────────────────────────────────── */}
          <section id="slides" className="scroll-mt-28">
            <Reveal>
              <h2 className="text-2xl font-bold text-ink-800 sm:text-3xl">สไลด์ Canva</h2>
              <p className="mt-2 text-sm text-ink-400">
                สไลด์ที่ใช้สอนของ {GRADE_LABEL[grade]} — ถ้าสไลด์ไม่ขึ้น ให้กดปุ่มเปิดในแท็บใหม่ด้านล่าง
              </p>
            </Reveal>

            <Reveal delay={0.05} className="mt-6">
              <div className="overflow-hidden rounded-3xl border border-grape-100 bg-white shadow-soft">
                <div className="aspect-[16/9] w-full bg-grape-50">
                  <iframe
                    src={slides.embed}
                    title={`สไลด์ Canva — ${topic.title} (${GRADE_LABEL[grade]})`}
                    loading="lazy"
                    allowFullScreen
                    allow="fullscreen"
                    className="h-full w-full border-0"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-grape-100 p-4">
                  <p className="text-xs text-ink-400">
                    สไลด์ Canva บางชุดตั้งค่าไม่ให้ฝังในเว็บอื่น ถ้าเห็นเป็นพื้นที่ว่างให้เปิดในแท็บใหม่แทน
                  </p>
                  <a
                    href={slides.view}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex items-center gap-2 rounded-full bg-grape-500 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-grape-600 hover:shadow-lift"
                  >
                    เปิดสไลด์ในแท็บใหม่
                    <ExternalLinkIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          </section>

          {/* ── ก่อนหน้า / ถัดไป (คงระดับชั้นเดิม) ───────────── */}
          <nav aria-label="หัวข้อก่อนหน้าและถัดไป" className="grid gap-4 sm:grid-cols-2">
            {prev ? (
              <Link
                to={`/topic/${prev.slug}/${grade}`}
                className="focus-ring group flex min-w-0 items-center gap-3 rounded-2xl border border-grape-100 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-grape-300 hover:shadow-lift"
              >
                <ArrowLeftIcon className="h-5 w-5 shrink-0 text-grape-500 transition-transform duration-300 group-hover:-translate-x-1" />
                <span className="min-w-0">
                  <span className="block text-xs text-ink-400">
                    หัวข้อก่อนหน้า · {GRADE_LABEL[grade]}
                  </span>
                  <span className="block truncate text-sm font-semibold text-ink-700">{prev.title}</span>
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}

            {next && (
              <Link
                to={`/topic/${next.slug}/${grade}`}
                className="focus-ring group flex min-w-0 items-center justify-end gap-3 rounded-2xl border border-grape-100 bg-white p-5 text-right shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-grape-300 hover:shadow-lift"
              >
                <span className="min-w-0">
                  <span className="block text-xs text-ink-400">หัวข้อถัดไป · {GRADE_LABEL[grade]}</span>
                  <span className="block truncate text-sm font-semibold text-ink-700">{next.title}</span>
                </span>
                <ArrowRightIcon className="h-5 w-5 shrink-0 text-grape-500 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
          </nav>
        </main>
        </div>
      </div>
    </>
  )
}
