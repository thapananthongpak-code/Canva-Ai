/**
 * รูปประกอบของแต่ละหัวข้อ
 * ────────────────────────────────────────────────────────────────
 * ไม่ต้องระบุชื่อไฟล์ในโค้ด แค่วางไฟล์รูปลงในโฟลเดอร์
 *   src/assets/images/<grade>/<topic>/
 * แล้วเว็บจะดึงรูปทั้งหมดในโฟลเดอร์นั้นมาแสดงเป็นแกลเลอรีให้เอง
 *
 * import.meta.glob ของ Vite ต้องเป็นข้อความคงที่ (เขียนแบบตัวแปรไม่ได้)
 * จึงกวาดรูปทั้งหมดมาก่อนครั้งเดียว แล้วค่อยกรองตามโฟลเดอร์ทีหลัง
 */
const imageModules = import.meta.glob(
  '../assets/images/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,avif,AVIF,gif,GIF,svg,SVG}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>

export interface TopicImage {
  /** ที่อยู่ไฟล์รูปหลัง build */
  src: string
  /** ชื่อไฟล์เต็ม เอาไว้ใช้เป็น key */
  fileName: string
  /** ชื่อไฟล์แบบอ่านง่าย ใช้เป็นคำอธิบายรูปและ alt */
  label: string
}

/** ตัดนามสกุลและเลขนำหน้า (เช่น "01-") ออก แล้วแทน - _ ด้วยเว้นวรรค */
function toLabel(fileName: string): string {
  return fileName
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+[-_.\s]*/, '')
    .replace(/[-_]+/g, ' ')
    .trim()
}

/** เรียงตามชื่อไฟล์แบบที่ "2" มาก่อน "10" */
const collator = new Intl.Collator('th', { numeric: true, sensitivity: 'base' })

/**
 * รูปทั้งหมดในโฟลเดอร์หนึ่ง ๆ เช่น getTopicImages('m3/topic1-canva-basics')
 * ถ้าโฟลเดอร์ยังว่างอยู่จะได้ array ว่าง (ไม่ error)
 */
export function getTopicImages(folder: string): TopicImage[] {
  const prefix = `../assets/images/${folder}/`

  return Object.entries(imageModules)
    .filter(([path]) => path.startsWith(prefix))
    .map(([path, src]) => {
      const fileName = path.slice(prefix.length)
      return { src, fileName, label: toLabel(fileName) }
    })
    .sort((a, b) => collator.compare(a.fileName, b.fileName))
}
