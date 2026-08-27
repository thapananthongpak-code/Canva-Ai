import type { TopicIconKey } from '../data/topics'

/**
 * ไอคอนประจำหัวข้อ — เส้นเรียบ ไม่มีหน้าตา ไม่ขยับเอง
 */
const paths: Record<TopicIconKey, React.ReactNode> = {
  // หัวข้อ 1 — เริ่มต้นสร้างสื่อนำเสนอด้วย Canva
  canva: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2.5" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7.5 12.5 10 10l2.2 2.2L16.5 8" />
    </>
  ),
  // หัวข้อ 2 — ประยุกต์ใช้ AI ใน Canva
  ai: (
    <>
      <path d="M11 3.5c.5 4 2.5 6 6.5 6.5-4 .5-6 2.5-6.5 6.5-.5-4-2.5-6-6.5-6.5 4-.5 6-2.5 6.5-6.5Z" />
      <path d="M18 15.5c.2 1.6.9 2.3 2.5 2.5-1.6.2-2.3.9-2.5 2.5-.2-1.6-.9-2.3-2.5-2.5 1.6-.2 2.3-.9 2.5-2.5Z" />
    </>
  ),
  // หัวข้อ 3 — เขียน Prompt เพื่อสร้างสื่อนำเสนอ
  prompt: (
    <>
      <path d="M20 15a3 3 0 0 1-3 3H9l-4.5 3.5V6a3 3 0 0 1 3-3h9.5a3 3 0 0 1 3 3Z" />
      <path d="M8.5 9.5h8M8.5 13h5" />
    </>
  ),
  // หัวข้อ 4 — เขียน Prompt เพื่อสร้าง Portfolio
  portfolio: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path d="M3 12.5h18M11 12.5v2.5h2v-2.5" />
    </>
  ),
}

export function TopicIcon({ icon, className = 'h-6 w-6' }: { icon: TopicIconKey; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[icon]}
    </svg>
  )
}
