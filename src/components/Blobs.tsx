/**
 * ของตกแต่งพื้นหลัง — มีสองแบบ
 *   blob   : ก้อนสีทรงอิสระ เบลอนุ่ม ๆ ใช้ไล่สีให้พื้นที่โล่งไม่ว่างเปล่า
 *   bubble : ฟองกลมคมชัด ใช้แต้มสีสันให้หน้าเว็บมีชีวิตชีวา
 *
 * ทั้งสองแบบอยู่นิ่ง ไม่ขยับเอง วางด้วย absolute หลังเนื้อหา
 * และครอบด้วย pointer-events-none เพื่อไม่ให้ขวางการคลิก
 */
type BlobTone = 'grape' | 'aqua' | 'mint'

const blobTone: Record<BlobTone, string> = {
  grape: 'bg-grape-300/35',
  aqua: 'bg-aqua-300/30',
  mint: 'bg-mint-300/30',
}

const bubbleTone: Record<BlobTone, string> = {
  grape: 'bg-grape-200/60',
  aqua: 'bg-aqua-200/60',
  mint: 'bg-mint-200/60',
}

const ringTone: Record<BlobTone, string> = {
  grape: 'border-grape-300/60',
  aqua: 'border-aqua-300/70',
  mint: 'border-mint-300/70',
}

export interface BlobSpec {
  tone: BlobTone
  /** คลาสกำหนดตำแหน่งและขนาด เช่น "-top-24 left-[8%] h-72 w-72" */
  position: string
  /**
   * blob   — ก้อนเบลอทรงอิสระ (ค่าเริ่มต้น)
   * bubble — ฟองกลมทึบ
   * ring   — ฟองกลมแบบมีแต่เส้นขอบ
   */
  kind?: 'blob' | 'bubble' | 'ring'
  /** เลือกรูปทรงเองได้ (เฉพาะแบบ blob) */
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
      {blobs.map((blob, index) => {
        const kind = blob.kind ?? 'blob'

        if (kind === 'bubble') {
          return (
            <div
              key={index}
              className={`absolute rounded-full ${bubbleTone[blob.tone]} ${blob.position}`}
            />
          )
        }

        if (kind === 'ring') {
          return (
            <div
              key={index}
              className={`absolute rounded-full border-2 ${ringTone[blob.tone]} ${blob.position}`}
            />
          )
        }

        return (
          <div
            key={index}
            className={`absolute blur-[38px] ${blobTone[blob.tone]} ${blob.position}`}
            style={{ borderRadius: blob.shape ?? shapes[index % shapes.length] }}
          />
        )
      })}
    </div>
  )
}
