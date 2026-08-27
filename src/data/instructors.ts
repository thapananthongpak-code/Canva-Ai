/**
 * พี่ผู้สอนทั้ง 8 คน (ทีม ม.3 จำนวน 4 คน + ทีม ม.6 จำนวน 4 คน)
 * ────────────────────────────────────────────────────────────────
 * แต่ละคนรับผิดชอบ 1 ใน 4 หัวข้อ โดย id ต้องตรงกับ instructorId ใน topics.ts
 * (รูปแบบ id: "<grade>-<topicId>" เช่น "m3-topic1")
 *
 * รูปพี่ผู้สอนอยู่ที่ src/assets/instructors/<id>.jpg แล้ว import เข้ามาข้างล่าง
 * (ย่อขนาดสำหรับเว็บไว้แล้ว ไฟล์ต้นฉบับความละเอียดเต็มอยู่ที่ img-m3/ และ img-m6/)
 *
 * ช่องที่ยังไม่มีข้อมูลจริงจะมีคอมเมนต์ // TODO: กำกับไว้
 * ช่องติดต่อไหนไม่มี ให้เว้นเป็นสตริงว่าง '' แล้วเว็บจะแสดงไอคอนนั้นเป็นสีจางแบบกดไม่ได้ให้เอง
 */

import type { Grade } from './topics'

import photoM3Topic1 from '../assets/instructors/m3-topic1.jpg'
import photoM3Topic2 from '../assets/instructors/m3-topic2.jpg'
import photoM3Topic3 from '../assets/instructors/m3-topic3.jpg'
import photoM3Topic4 from '../assets/instructors/m3-topic4.jpg'
import photoM6Topic1 from '../assets/instructors/m6-topic1.jpg'
import photoM6Topic3 from '../assets/instructors/m6-topic3.jpg'
import photoM6Topic4 from '../assets/instructors/m6-topic4.jpg'
/** รูปแทนชั่วคราวสำหรับคนที่ยังไม่ส่งรูปมา (เก็บในโปรเจกต์ ไม่ต้องพึ่งเน็ต) */
import photoPending from '../assets/instructors/pending.svg'

export interface InstructorContact {
  /** ลิงก์ LINE เช่น https://line.me/ti/p/~ หรือ LINE ID */
  line: string
  facebook: string
  instagram: string
  email: string
}

export interface Instructor {
  id: string
  name: string
  grade: Grade
  topicId: string
  photoUrl: string
  bio: string
  contact: InstructorContact
}

export const instructors: Instructor[] = [
  // ═══════════════════════════════════════════════════════════════
  // ทีมพี่ผู้สอน ม.3
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'm3-topic1',
    name: 'พี่ไตเติ้ล',
    grade: 'm3',
    topicId: 'topic1',
    photoUrl: photoM3Topic1,
    bio: 'พี่ผู้สอนหัวข้อการเริ่มต้นสร้างสื่อนำเสนอด้วย Canva ของทีม ม.3', // TODO: คำแนะนำตัวสั้น ๆ จริง
    contact: {
      line: '', // TODO: ลิงก์/ไอดี LINE
      facebook: '', // TODO: ลิงก์ Facebook
      instagram: '', // TODO: ลิงก์ Instagram
      email: '', // TODO: อีเมล
    },
  },
  {
    id: 'm3-topic2',
    name: 'พี่อาร์ท',
    grade: 'm3',
    topicId: 'topic2',
    photoUrl: photoM3Topic2,
    bio: 'พี่ผู้สอนหัวข้อการประยุกต์ใช้ AI ใน Canva ของทีม ม.3', // TODO: คำแนะนำตัวสั้น ๆ จริง
    contact: {
      line: '', // TODO: ลิงก์/ไอดี LINE
      facebook: '', // TODO: ลิงก์ Facebook
      instagram: '', // TODO: ลิงก์ Instagram
      email: '', // TODO: อีเมล
    },
  },
  {
    id: 'm3-topic3',
    name: 'พี่อีฟ',
    grade: 'm3',
    topicId: 'topic3',
    photoUrl: photoM3Topic3,
    bio: 'พี่ผู้สอนหัวข้อการเขียน Prompt ด้วย ChatGPT เพื่อสร้างสื่อนำเสนอ ของทีม ม.3', // TODO: คำแนะนำตัวสั้น ๆ จริง
    contact: {
      line: '', // TODO: ลิงก์/ไอดี LINE
      facebook: '', // TODO: ลิงก์ Facebook
      instagram: '', // TODO: ลิงก์ Instagram
      email: '', // TODO: อีเมล
    },
  },
  {
    id: 'm3-topic4',
    name: 'พี่โฟม',
    grade: 'm3',
    topicId: 'topic4',
    photoUrl: photoM3Topic4,
    bio: 'พี่ผู้สอนหัวข้อการเขียน Prompt ด้วย ChatGPT เพื่อสร้าง Portfolio ของทีม ม.3', // TODO: คำแนะนำตัวสั้น ๆ จริง
    contact: {
      line: '', // TODO: ลิงก์/ไอดี LINE
      facebook: '', // TODO: ลิงก์ Facebook
      instagram: '', // TODO: ลิงก์ Instagram
      email: '', // TODO: อีเมล
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ทีมพี่ผู้สอน ม.6
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'm6-topic1',
    name: 'พี่ปลื้ม',
    grade: 'm6',
    topicId: 'topic1',
    photoUrl: photoM6Topic1,
    bio: 'พี่ผู้สอนหัวข้อการเริ่มต้นสร้างสื่อนำเสนอด้วย Canva ของทีม ม.6', // TODO: คำแนะนำตัวสั้น ๆ จริง
    contact: {
      line: '', // TODO: ลิงก์/ไอดี LINE
      facebook: '', // TODO: ลิงก์ Facebook
      instagram: '', // TODO: ลิงก์ Instagram
      email: '', // TODO: อีเมล
    },
  },
  {
    id: 'm6-topic2',
    // TODO: กรอกชื่อพี่ผู้สอน (ยังไม่ได้รับไฟล์รูปของหัวข้อนี้)
    name: 'พี่ [ชื่อเล่น] — ม.6 หัวข้อที่ 2',
    grade: 'm6',
    topicId: 'topic2',
    // TODO: วางรูปที่ src/assets/instructors/m6-topic2.jpg แล้ว import มาแทนบรรทัดนี้
    photoUrl: photoPending,
    bio: 'พี่ผู้สอนหัวข้อการประยุกต์ใช้ AI ใน Canva ของทีม ม.6', // TODO: คำแนะนำตัวสั้น ๆ จริง
    contact: {
      line: '', // TODO: ลิงก์/ไอดี LINE
      facebook: '', // TODO: ลิงก์ Facebook
      instagram: '', // TODO: ลิงก์ Instagram
      email: '', // TODO: อีเมล
    },
  },
  {
    id: 'm6-topic3',
    name: 'พี่บี้',
    grade: 'm6',
    topicId: 'topic3',
    photoUrl: photoM6Topic3,
    bio: 'พี่ผู้สอนหัวข้อการเขียน Prompt ด้วย ChatGPT เพื่อสร้างสื่อนำเสนอ ของทีม ม.6', // TODO: คำแนะนำตัวสั้น ๆ จริง
    contact: {
      line: '', // TODO: ลิงก์/ไอดี LINE
      facebook: '', // TODO: ลิงก์ Facebook
      instagram: '', // TODO: ลิงก์ Instagram
      email: '', // TODO: อีเมล
    },
  },
  {
    id: 'm6-topic4',
    name: 'พี่อิง',
    grade: 'm6',
    topicId: 'topic4',
    photoUrl: photoM6Topic4,
    bio: 'พี่ผู้สอนหัวข้อการเขียน Prompt ด้วย ChatGPT เพื่อสร้าง Portfolio ของทีม ม.6', // TODO: คำแนะนำตัวสั้น ๆ จริง
    contact: {
      line: '', // TODO: ลิงก์/ไอดี LINE
      facebook: '', // TODO: ลิงก์ Facebook
      instagram: '', // TODO: ลิงก์ Instagram
      email: '', // TODO: อีเมล
    },
  },
]

/** พี่ผู้สอนทั้งหมดของทีมใดทีมหนึ่ง (เรียงตามลำดับหัวข้อ) */
export function getInstructorsByGrade(grade: Grade): Instructor[] {
  return instructors.filter((instructor) => instructor.grade === grade)
}

/** พี่ผู้สอนคนเดียวจาก id ที่อ้างอิงใน topics.ts */
export function getInstructorById(id: string): Instructor | undefined {
  return instructors.find((instructor) => instructor.id === id)
}
