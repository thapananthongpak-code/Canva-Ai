import { NavLink } from 'react-router-dom'
import { GRADES, GRADE_LABEL } from '../data/topics'
import type { Grade } from '../data/topics'

/**
 * ตัวสลับดูเนื้อหาระหว่าง ม.3 / ม.6 ของหัวข้อเดียวกัน
 * เป็นลิงก์จริง (NavLink) เพื่อให้ URL เปลี่ยนตามและ refresh แล้วยังอยู่หน้าเดิม
 */
export function GradeSwitch({
  buildPath,
  current,
  label = 'ดูเนื้อหาของ',
}: {
  buildPath: (grade: Grade) => string
  current: Grade
  label?: string
}) {
  return (
    <div className="inline-flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-ink-400">{label}</span>
      <div
        className="inline-flex rounded-full border border-grape-200 bg-white/80 p-1 shadow-soft"
        role="tablist"
        aria-label="เลือกระดับชั้น"
      >
        {GRADES.map((grade) => (
          <NavLink
            key={grade}
            to={buildPath(grade)}
            role="tab"
            aria-selected={grade === current}
            replace
            className={`focus-ring rounded-full px-5 py-1.5 text-sm transition-all duration-200 ${
              grade === current
                ? 'bg-gradient-to-r from-grape-500 to-grape-400 font-bold text-white shadow-soft'
                : 'font-medium text-ink-500 hover:bg-grape-50 hover:text-grape-600'
            }`}
          >
            {GRADE_LABEL[grade]}
          </NavLink>
        ))}
      </div>
    </div>
  )
}
