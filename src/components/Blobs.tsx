/**
 * shape พื้นหลังทรง organic blob — เรียบ ไม่มีหน้าตา ไม่มี animation วนซ้ำ
 * วางไว้หลังเนื้อหาด้วย pointer-events-none เพื่อไม่ให้ขวางการคลิก
 */
type BlobTone = 'grape' | 'aqua' | 'mint'

const toneClass: Record<BlobTone, string> = {
  grape: 'bg-grape-300/60',
  aqua: 'bg-aqua-300/55',
  mint: 'bg-mint-300/55',
}

export interface BlobSpec {
  tone: BlobTone
  /** คลาสกำหนดตำแหน่งและขนาด เช่น "-top-24 left-[8%] h-72 w-72" */
  position: string
  /** เลือกรูปทรง blob (ทำให้แต่ละก้อนไม่ซ้ำกัน) */
  shape?: string
}

const shapes = [
  '42% 58% 61% 39% / 45% 39% 61% 55%',
  '63% 37% 33% 67% / 39% 62% 38% 61%',
  '38% 62% 55% 45% / 60% 42% 58% 40%',
  '55% 45% 38% 62% / 43% 63% 37% 57%',
]

export function Blobs({ blobs }: { blobs: BlobSpec[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {blobs.map((blob, index) => (
        <div
          key={index}
          className={`absolute blur-[38px] ${toneClass[blob.tone]} ${blob.position}`}
          style={{ borderRadius: blob.shape ?? shapes[index % shapes.length] }}
        />
      ))}
    </div>
  )
}
