/**
 * เนื้อหาคอร์ส "Canva พื้นฐาน และ Prompt"
 * ────────────────────────────────────────────────────────────────
 * ม.3 และ ม.6 เรียน "หัวข้อชื่อเดียวกันทั้ง 4 หัวข้อ" แต่เนื้อหาจริงคนละชุดกัน
 * จึงแยกเนื้อหาไว้ใน contentByGrade.m3 และ contentByGrade.m6
 */

export type Grade = 'm3' | 'm6'

export const GRADES: Grade[] = ['m3', 'm6']

/** ป้ายชื่อระดับชั้นสำหรับแสดงผลบนหน้าเว็บ */
export const GRADE_LABEL: Record<Grade, string> = {
  m3: 'ม.3',
  m6: 'ม.6',
}

/** ตรวจว่า string ที่มาจาก URL เป็น grade ที่ถูกต้องหรือไม่ */
export function isGrade(value: string | undefined): value is Grade {
  return value === 'm3' || value === 'm6'
}

export type TopicIconKey = 'canva' | 'ai' | 'prompt' | 'portfolio'

export interface TopicContent {
  /** คำโปรยสั้น ๆ ของหัวข้อนี้ในระดับชั้นนี้ */
  summary: string
  /** ประเด็นสำคัญที่เรียนไป */
  content: string[]
  /** กิจกรรม/เวิร์กช็อปที่ทำในคาบ */
  workshop: string
  /** ลิงก์สไลด์ Canva ของเนื้อหาชุดนี้ */
  canvaEmbedUrl: string
  /** อ้างอิงไปยังพี่ผู้สอนใน instructors.ts */
  instructorId: string
}

export interface Topic {
  id: string
  slug: string
  /** ชื่อเต็มของหัวข้อ (ใช้เหมือนกันทั้ง ม.3 และ ม.6) */
  title: string
  /** ชื่อย่อสำหรับแสดงบน navbar และการ์ดแคบ ๆ */
  shortTitle: string
  icon: TopicIconKey
  contentByGrade: Record<Grade, TopicContent>
}

/**
 * ลิงก์สไลด์ Canva รวมทั้งชุดของแต่ละระดับชั้น (ลิงก์จริง ใช้ได้เลย)
 * ใช้เป็นค่าเริ่มต้นของ canvaEmbedUrl ทุกหัวข้อใน grade เดียวกัน
 */
export const CANVA_DECK_URL: Record<Grade, string> = {
  m3: 'https://canva.link/fis5audaj2lw6am',
  m6: 'https://canva.link/243pmgdfnikhx0e',
}

/**
 * ลิงก์ canva.link ด้านบนเป็นลิงก์แบบ "เปิดเพื่อแก้ไข" (/edit) และ Canva ไม่ยอมให้
 * ฝังลิงก์นั้นใน iframe ของเว็บอื่น จึงเก็บลิงก์แบบ "ดูอย่างเดียว" ของสไลด์ชุดเดียวกันไว้ตรงนี้
 * แล้วให้ทั้ง iframe และปุ่มเปิดแท็บใหม่ในหน้าเนื้อหาใช้ลิงก์ดูอย่างเดียวแทน
 * (นักเรียนจะได้ไม่เผลอเข้าไปแก้สไลด์ต้นฉบับของพี่ผู้สอน)
 *
 * ถ้าเปลี่ยนสไลด์เป็นชุดใหม่ ให้แก้ CANVA_DECK_URL ด้านบน แล้วเพิ่มคู่ลิงก์ที่ตรงกันตรงนี้ด้วย
 */
const CANVA_RESOLVED: Record<string, { embed: string; view: string }> = {
  [CANVA_DECK_URL.m3]: {
    embed: 'https://www.canva.com/design/DAHQF6khVP4/EnJ7huIYza6zSN8t5HvI7g/view?embed',
    view: 'https://www.canva.com/design/DAHQF6khVP4/EnJ7huIYza6zSN8t5HvI7g/view',
  },
  [CANVA_DECK_URL.m6]: {
    embed: 'https://www.canva.com/design/DAHP0ajlcAY/QY7c5LmW_6abf4NIYb4k7A/view?embed',
    view: 'https://www.canva.com/design/DAHP0ajlcAY/QY7c5LmW_6abf4NIYb4k7A/view',
  },
}

/**
 * แปลง canvaEmbedUrl ของหัวข้อหนึ่ง ๆ เป็นลิงก์ที่ใช้จริงบนหน้าเว็บ
 * ลิงก์ไหนที่ยังไม่มีคู่ลิงก์ดูอย่างเดียว จะใช้ค่าเดิมไปก่อน
 */
export function getCanvaLinks(url: string): { embed: string; view: string } {
  return CANVA_RESOLVED[url] ?? { embed: url, view: url }
}

export const topics: Topic[] = [
  // ═══════════════════════════════════════════════════════════════
  // หัวข้อที่ 1 — การเริ่มต้นสร้างสื่อนำเสนอด้วย Canva
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'topic1',
    slug: 'canva-basics',
    title: 'การเริ่มต้นสร้างสื่อนำเสนอด้วย Canva',
    shortTitle: 'เริ่มต้น Canva',
    icon: 'canva',
    contentByGrade: {
      m3: {
        summary:
          'การทำความรู้จักกับแพลตฟอร์ม Canva และการเรียนรู้เครื่องมือพื้นฐานเพื่อนำมาใช้ออกแบบและสร้างสรรค์ผลงานนำเสนอแนะนำตัวเองเบื้องต้น',
        content: [
          'Canva เป็นเครื่องมือออนไลน์อเนกประสงค์สำหรับออกแบบสไลด์',
          'รู้จักแถบเครื่องมือหลัก: ไฟล์, การแก้ไข, ปุ่มย้อนกลับ/ไปข้างหน้า, การปรับขนาดสไลด์',
          'เครื่องมือพื้นฐาน 4 อย่าง: Templates (เทมเพลตสำเร็จรูป), Elements (องค์ประกอบ/กราฟิก), Text (กล่องข้อความ), Uploads (นำเข้าไฟล์)',
        ],
        workshop:
          'สร้างพรีเซนต์แนะนำตัวเองอย่างง่าย โดยวางแผน 4 ข้อก่อนออกแบบ — ทำเรื่องอะไร / นำเสนอให้ใคร / สไตล์แบบไหน / โทน-ข้อจำกัดแบบไหน',
        canvaEmbedUrl: CANVA_DECK_URL.m3,
        instructorId: 'm3-topic1',
      },
      m6: {
        summary:
          'การยกระดับทักษะการทำสไลด์ โดยเน้นการจัดวางเลย์เอาต์ร่วมกับเครื่องมือตกแต่งภาพและลูกเล่นที่น่าสนใจ',
        content: [
          'ก้าวข้ามเครื่องมือพื้นฐาน มุ่งเน้นใช้ AI จัดสไลด์และปรับสไลด์เดิมให้มีคุณภาพดีขึ้น',
          'Transition คือเอฟเฟกต์การเปลี่ยนหน้าสไลด์ ที่เกิดขึ้นในช่วงรอยต่อระหว่างที่สไลด์หนึ่งกำลังจะหายไป และสไลด์ถัดไปกำลังจะปรากฏขึ้น',
          'Animation คือการกำหนดการเคลื่อนไหวให้กับชิ้นงานภายในสไลด์ ไม่ว่าจะเป็นข้อความ รูปภาพ ไอคอน หรือรูปทรงต่าง ๆ',
          'จำง่าย ๆ ว่า Transition ทำงานที่รอยต่อ “ระหว่างหน้า” ส่วน Animation ทำงานกับชิ้นงาน “ภายในหน้าเดียวกัน” จึงใช้คู่กันได้',
        ],
        workshop:
          'ปรับปรุงสไลด์เดิมให้มีคุณภาพขึ้น แล้วใส่ Transition ระหว่างหน้าและ Animation ให้องค์ประกอบภายในหน้า เพื่อให้พรีเซนต์ออกมาดูเป็นมืออาชีพ',
        canvaEmbedUrl: CANVA_DECK_URL.m6,
        instructorId: 'm6-topic1',
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // หัวข้อที่ 2 — การประยุกต์ใช้ AI ใน Canva
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'topic2',
    slug: 'canva-ai',
    title: 'การประยุกต์ใช้ AI ใน Canva',
    shortTitle: 'AI ใน Canva',
    icon: 'ai',
    contentByGrade: {
      m3: {
        summary:
          'การประยุกต์ใช้เครื่องมือ AI ใน Canva เพื่อเป็นผู้ช่วยสร้างสไลด์และออกแบบกราฟิกอย่างสร้างสรรค์',
        content: [
          'รู้จักและทดลองเครื่องมือ AI 3 ตัว',
          'Magic Design — จัดเลย์เอาต์ทั้งชุดอัตโนมัติจากคำสั่งสั้น ๆ',
          'Magic AI / Magic Write / Magic Media — ช่วยเขียนข้อความ และสร้างภาพกราฟิกใหม่จากคำสั่ง',
          'Magic Layers — ลบพื้นหลัง จัดระดับชั้นภาพ ตัดต่อองค์ประกอบ',
        ],
        workshop: 'ทดลองใช้เครื่องมือ AI ทั้ง 3 แบบเพื่อพัฒนาสไลด์ของตัวเอง',
        canvaEmbedUrl: CANVA_DECK_URL.m3,
        instructorId: 'm3-topic2',
      },
      m6: {
        summary:
          'การประยุกต์ใช้ Canva AI ใน Canva for Education เพื่อเป็นผู้ช่วยจัดเลย์เอาต์ เขียนเนื้อหา และค้นหาองค์ประกอบให้เหมาะกับสไลด์',
        content: [
          'ขั้นตอนเรียกใช้เมนู Canva AI โดยป้อน Prompt อธิบายความต้องการแล้วเลือกแบบมาแก้ไขต่อ',
          'เลือกเครื่องมือให้ตรงสถานการณ์: Magic Design (คิด Layout ไม่ออก), Magic Write (คิดคำอธิบาย/คำโปรยไม่ออก — เขียน Bio, คำอธิบายผลงาน, สโลแกน), Magic Media (สร้างรูปใหม่), Magic Layers (จัดองค์ประกอบ/ลบพื้นหลัง)',
          'คำสั่งย่อยของ Magic Write: ขยายความ (Expand), ทำให้กระชับ (Shorten), ปรับโทนภาษา (Change tone)',
        ],
        workshop: 'ฝึกใช้คำสั่งย่อยของ Magic Write ปรับแก้ข้อความในสไลด์จริง',
        canvaEmbedUrl: CANVA_DECK_URL.m6,
        instructorId: 'm6-topic2',
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // หัวข้อที่ 3 — การเขียน Prompt ด้วย ChatGPT เพื่อสร้างสื่อนำเสนอ
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'topic3',
    slug: 'prompt-presentation',
    title: 'การเขียน Prompt ด้วย ChatGPT เพื่อสร้างสื่อนำเสนอ',
    shortTitle: 'Prompt สื่อนำเสนอ',
    icon: 'prompt',
    contentByGrade: {
      m3: {
        summary:
          'การปูพื้นฐานความเข้าใจเรื่องคำสั่ง (Prompt) และเปรียบเทียบความแตกต่างของการเขียนคำสั่ง ChatGPT เพื่อให้ได้ผลลัพธ์สื่อนำเสนอที่ต้องการ',
        content: [
          'Prompt คือคำสั่งที่ป้อนให้ Generative AI ทำสิ่งที่ต้องการ',
          'Prompt แบบทั่วไป (ไม่ชัดเจน) มักให้ผลลัพธ์ไม่ตรงประเด็น ต้องแก้หลายรอบ',
          'Prompt แบบละเอียด ช่วยให้ได้เนื้อหาตรงประเด็น ตรงใจ ประหยัดเวลา',
        ],
        workshop:
          'ฝึกเขียน Prompt เทียบตัวอย่าง “สั่งสั้น” เช่น “เขียนวิธีการประหยัดไฟ” กับ “สั่งละเอียด” เช่น “ช่วยเขียนวิธีการประหยัดไฟในห้องเรียน สำหรับนักเรียนชั้น ม.3 ใช้ข้อความสั้น ๆ”',
        canvaEmbedUrl: CANVA_DECK_URL.m3,
        instructorId: 'm3-topic3',
      },
      m6: {
        summary:
          'การเรียนรู้ทฤษฎีของ Generative AI และสูตรสำเร็จของการสร้าง Prompt ที่มีประสิทธิภาพสูงเพื่อร่างกรอบแนวคิดสื่อนำเสนอ',
        content: [
          'Generative AI คือปัญญาประดิษฐ์ที่สร้างข้อความ/รูปภาพ/โค้ดจากคำสั่ง',
          'ChatGPT คือโมเดลภาษาขนาดใหญ่ที่ตอบคล้ายมนุษย์จากการเดาคำถัดไปตามบริบท',
          'สูตร Prompt คุณภาพสูง RTCF: Role (บทบาทของ AI), Task (งานที่สั่งให้ทำ), Context (บริบท/ข้อมูลแวดล้อม), Format (รูปแบบผลลัพธ์ที่ต้องการ)',
        ],
        workshop: 'เขียน Prompt แนะนำตัวเองแบบครบสูตร RTCF',
        canvaEmbedUrl: CANVA_DECK_URL.m6,
        instructorId: 'm6-topic3',
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // หัวข้อที่ 4 — การเขียน Prompt ด้วย ChatGPT เพื่อสร้าง Portfolio
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'topic4',
    slug: 'prompt-portfolio',
    title: 'การเขียน Prompt ด้วย ChatGPT เพื่อสร้าง Portfolio',
    shortTitle: 'Prompt Portfolio',
    icon: 'portfolio',
    contentByGrade: {
      m3: {
        summary:
          'การใช้ ChatGPT ช่วยเขียนเนื้อหา Portfolio สำหรับยื่นเข้าเรียนต่อ ม.4 ตั้งแต่องค์ประกอบที่ต้องมีในเล่ม ไปจนถึงการเขียน Prompt ให้ได้ข้อความที่ใช้ได้จริง',
        content: [
          'Portfolio หรือแฟ้มสะสมผลงาน รวบรวมข้อมูลส่วนตัว การศึกษา ผลงาน ทักษะ กิจกรรม และเกียรติบัตรไว้ในเล่มเดียว',
          '6 องค์ประกอบหลักที่ต้องมี — หน้าปก, คำนำ, ประวัติส่วนตัว, ประวัติการศึกษา, กิจกรรม/ผลงาน, เกียรติบัตร โดยความยาวไม่เกิน 10 หน้า (ไม่รวมปก)',
          'หน้าปกต้องมีชื่อ-นามสกุล ชื่อโรงเรียนเดิม สายการเรียนที่ต้องการสมัคร และรูปหน้าตรงชุดนักเรียนที่เห็นใบหน้าชัด',
          'เกียรติบัตรเรียงตามความสำคัญ ระดับนานาชาติ > ชาติ > จังหวัด > เขตพื้นที่ > โรงเรียน พร้อมระบุชื่อรางวัลและวันที่ได้รับ',
          'Prompt ที่กว้างเกินไป เช่น “ช่วยทำพอร์ตยื่นเข้า ม.4 ให้หน่อย เอาแบบสวย ๆ” จะได้ผลลัพธ์กลาง ๆ ต้องระบุบทบาท เป้าหมาย สายการเรียน และความยาวลงไปด้วย',
        ],
        workshop:
          'เขียน Prompt ขอให้ ChatGPT ช่วยร่างจุดมุ่งหมาย (Statement of Purpose) และเนื้อหาแต่ละหมวด แล้วนำไปจัดหน้า Portfolio ใน Canva',
        canvaEmbedUrl: CANVA_DECK_URL.m3,
        instructorId: 'm3-topic4',
      },
      m6: {
        summary:
          'ขั้นตอนการเตรียมข้อมูลส่วนตัวและการสร้าง Prompt ที่มีโครงสร้างคุณภาพ รวมถึงเทคนิคจัดองค์ประกอบ Portfolio ทั้งเล่ม',
        content: [
          'ข้อมูลที่ต้องเตรียมก่อนเขียนพอร์ต — ชื่อ, จุดเด่น, ความสนใจ, เป้าหมาย, ผลงาน/กิจกรรม',
          'เทียบ Bad Prompt (กว้างเกินไป เช่น “เขียนประวัติส่วนตัวใส่พอร์ตให้หน่อย”) กับ Good Prompt (มีโครงสร้าง ระบุบทบาท + เป้าหมาย + ความยาว)',
          'หลักคุมโทนสี 3-Color Rule: สีหลัก 60% สีรอง 30% สีเน้น 10%',
        ],
        workshop:
          'ร่าง Prompt ใน ChatGPT → เลือก Portfolio Template ใน Canva ที่ตรงบุคลิก → จัดเลย์เอาต์คุมสีไม่เกิน 3 สี → Export เป็นไฟล์ PDF',
        canvaEmbedUrl: CANVA_DECK_URL.m6,
        instructorId: 'm6-topic4',
      },
    },
  },
]

/** หาหัวข้อจาก slug ที่มาจาก URL */
export function getTopicBySlug(slug: string | undefined): Topic | undefined {
  return topics.find((topic) => topic.slug === slug)
}

/** ลำดับหัวข้อ ใช้ทำปุ่มก่อนหน้า/ถัดไป */
export function getTopicNeighbors(slug: string) {
  const index = topics.findIndex((topic) => topic.slug === slug)
  return {
    prev: index > 0 ? topics[index - 1] : undefined,
    next: index >= 0 && index < topics.length - 1 ? topics[index + 1] : undefined,
    index,
  }
}
