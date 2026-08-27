import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GRADES, GRADE_LABEL, getTopicBySlug, topics } from '../data/topics'
import { getInstructorsByGrade } from '../data/instructors'
import { useFavorites, parseFavoriteKey } from '../hooks/useFavorites'
import { Blobs } from '../components/Blobs'
import { TopicCard } from '../components/TopicCard'
import { TopicIcon } from '../components/TopicIcon'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { ArrowRightIcon, BookmarkIcon, SparkIcon } from '../components/Icons'

/* จังหวะการโผล่ของ hero ตอนโหลดหน้า — เล่นครั้งเดียวแล้วนิ่ง */
const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const heroItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

export function HomePage() {
  const { favorites } = useFavorites()

  const pinned = favorites
    .map(parseFavoriteKey)
    .flatMap((entry) => {
      if (!entry) return []
      const topic = getTopicBySlug(entry.slug)
      return topic ? [{ topic, grade: entry.grade }] : []
    })

  return (
    <>
      {/* ══════════════ Hero ══════════════ */}
      <section className="relative overflow-hidden pb-8 pt-14 sm:pt-20">
        <Blobs
          blobs={[
            { tone: 'grape', position: '-top-20 -left-16 h-72 w-72' },
            { tone: 'aqua', position: 'top-10 right-[-4rem] h-80 w-80' },
            { tone: 'mint', position: 'bottom-[-6rem] left-1/3 h-64 w-64' },
          ]}
        />

        <motion.div
          className="container-page max-w-3xl text-center"
          variants={heroContainer}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={heroItem}
            className="inline-flex items-center gap-2 rounded-full border border-grape-200 bg-white/80 px-4 py-1.5 text-xs font-semibold text-grape-600 shadow-soft"
          >
            <SparkIcon className="h-3.5 w-3.5" />
            คลังทบทวนหลังเรียน · ไม่ใช่หน้าประชาสัมพันธ์คอร์ส
          </motion.span>

          <motion.h1
            variants={heroItem}
            className="mt-6 text-3xl font-bold leading-tight text-ink-800 sm:text-5xl"
          >
            สรุปเนื้อหาคอร์ส
            <br className="hidden sm:block" />{' '}
            <span className="text-gradient">Canva พื้นฐาน และ Prompt</span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-500 sm:text-lg"
          >
            รวมสรุป 4 หัวข้อที่เรียนไป พร้อมตัวอย่าง เคล็ดลับจากพี่ผู้สอน และสไลด์ Canva
            ให้กลับมาอ่านทบทวนเมื่อไหร่ก็ได้ — ทุกหัวข้อมีทั้งเวอร์ชัน{' '}
            <span className="font-semibold text-grape-600">ม.3</span> และ{' '}
            <span className="font-semibold text-aqua-600">ม.6</span> เพราะเนื้อหาที่เรียนคนละชุดกัน
          </motion.p>

          <motion.div variants={heroItem} className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href="#topics"
              className="focus-ring group inline-flex items-center gap-2 rounded-full bg-grape-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-grape-600 hover:shadow-lift"
            >
              เริ่มอ่านทบทวน
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            {GRADES.map((grade) => (
              <Link
                key={grade}
                to={`/instructors/${grade}`}
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-grape-200 bg-white/80 px-6 py-3 text-sm font-semibold text-ink-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-grape-300 hover:text-grape-700 hover:shadow-soft"
              >
                ทีมพี่ผู้สอน {GRADE_LABEL[grade]}
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════ หัวข้อที่ปักหมุดไว้ ══════════════ */}
      {pinned.length > 0 && (
        <section className="container-page pt-14">
          <Reveal className="rounded-3xl border border-mint-200 bg-mint-100/40 p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-lg font-bold text-ink-800">
              <BookmarkIcon className="h-5 w-5 text-mint-600" filled />
              หัวข้อที่ปักหมุดไว้
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              บันทึกไว้ในเครื่องนี้เท่านั้น กดปุ่มปักหมุดในหน้าเนื้อหาเพื่อเพิ่ม/เอาออก
            </p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {pinned.map(({ topic, grade }) => (
                <li key={`${topic.slug}-${grade}`}>
                  <Link
                    to={`/topic/${topic.slug}/${grade}`}
                    className="focus-ring inline-flex items-center gap-2 rounded-full border border-mint-300 bg-white px-4 py-2 text-sm font-medium text-ink-600 transition-all duration-200 hover:-translate-y-0.5 hover:text-mint-600 hover:shadow-note"
                  >
                    <TopicIcon icon={topic.icon} className="h-4 w-4 text-mint-500" />
                    {topic.shortTitle}
                    <span className="rounded-full bg-mint-100 px-2 py-0.5 text-[11px] font-semibold text-mint-600">
                      {GRADE_LABEL[grade]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}

      {/* ══════════════ การ์ด 4 หัวข้อ ══════════════ */}
      <section id="topics" className="relative scroll-mt-28 pt-20">
        <Blobs
          blobs={[
            { tone: 'grape', position: 'top-24 right-[-5rem] h-72 w-72' },
            { tone: 'mint', position: 'bottom-4 left-[-4rem] h-56 w-56' },
          ]}
        />
        <div className="container-page">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-grape-500">4 หัวข้อที่เรียนไป</p>
            <h2 className="mt-3 max-w-2xl text-2xl font-bold leading-snug text-ink-800 sm:text-3xl">
              เลือกหัวข้อที่อยากทบทวน แล้วสลับดูเวอร์ชัน ม.3 / ม.6 ได้ในหน้าเนื้อหา
            </h2>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((topic, index) => (
              <RevealItem key={topic.id} className="h-full">
                <TopicCard topic={topic} index={index} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ══════════════ อธิบายเนื้อหา 2 เวอร์ชัน ══════════════ */}
      <section className="relative overflow-hidden pt-24">
        <Blobs
          blobs={[
            { tone: 'aqua', position: 'top-10 left-[42%] h-64 w-64' },
            { tone: 'grape', position: 'bottom-[-4rem] right-[6%] h-52 w-52' },
          ]}
        />
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-aqua-600">
                ทำไมมีสองเวอร์ชัน
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-snug text-ink-800 sm:text-3xl">
                หัวข้อชื่อเดียวกัน แต่เนื้อหาที่เรียนจริงคนละชุด
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-500">
                ทีม ม.3 และทีม ม.6 สอนคนละประเด็น ใช้ตัวอย่างคนละแบบ และมีสไลด์คนละชุด
                เว็บนี้จึงเก็บทั้งสองเวอร์ชันไว้ครบ ไม่ต้องกลัวอ่านผิดชุด
                กดปุ่มสลับระดับชั้นที่ด้านบนของหน้าเนื้อหาได้ตลอดเวลา
              </p>
            </Reveal>

            <RevealGroup className="grid gap-4 sm:grid-cols-2">
              {GRADES.map((grade) => {
                const team = getInstructorsByGrade(grade)
                const isM3 = grade === 'm3'
                return (
                  <RevealItem key={grade}>
                    <Link
                      to={`/instructors/${grade}`}
                      className={`focus-ring group block h-full rounded-3xl border p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift ${
                        isM3
                          ? 'border-grape-100 bg-grape-50/50 hover:border-grape-300'
                          : 'border-aqua-200 bg-aqua-100/40 hover:border-aqua-300'
                      }`}
                    >
                      <span
                        className={`text-3xl font-bold ${isM3 ? 'text-grape-500' : 'text-aqua-600'}`}
                      >
                        {GRADE_LABEL[grade]}
                      </span>
                      <p className="mt-3 text-sm leading-relaxed text-ink-500">
                        เนื้อหา 4 หัวข้อของทีม {GRADE_LABEL[grade]} สอนโดยพี่ผู้สอน {team.length} คน
                      </p>
                      <span
                        className={`mt-5 flex items-center gap-2 text-sm font-semibold ${
                          isM3 ? 'text-grape-600' : 'text-aqua-600'
                        }`}
                      >
                        ดูทีมพี่ผู้สอน
                        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </span>
                    </Link>
                  </RevealItem>
                )
              })}
            </RevealGroup>
          </div>
        </div>
      </section>
    </>
  )
}
