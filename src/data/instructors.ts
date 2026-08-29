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
 */

import type { Grade } from './topics'
import { getTopicsForGrade } from './topics'

import photoM3Topic1 from '../assets/instructors/m3-topic1.jpg'
import photoM3Topic2 from '../assets/instructors/m3-topic2.jpg'
import photoM3Topic3 from '../assets/instructors/m3-topic3.jpg'
import photoM3Topic4 from '../assets/instructors/m3-topic4.jpg'
import photoM6Topic1 from '../assets/instructors/m6-topic1.jpg'
import photoM6Topic2 from '../assets/instructors/m6-topic2.jpg'
import photoM6Topic3 from '../assets/instructors/m6-topic3.jpg'
import photoM6Topic4 from '../assets/instructors/m6-topic4.jpg'

export interface Instructor {
  id: string
  name: string
  grade: Grade
  topicId: string
  photoUrl: string
  bio: string
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
  },
  {
    id: 'm3-topic2',
    name: 'พี่อาร์ท',
    grade: 'm3',
    topicId: 'topic2',
    photoUrl: photoM3Topic2,
    bio: 'พี่ผู้สอนหัวข้อการประยุกต์ใช้ AI ใน Canva ของทีม ม.3', // TODO: คำแนะนำตัวสั้น ๆ จริง
  },
  {
    id: 'm3-topic3',
    name: 'พี่อีฟ',
    grade: 'm3',
    topicId: 'topic3',
    photoUrl: photoM3Topic3,
    bio: 'พี่ผู้สอนหัวข้อการเขียน Prompt ด้วย ChatGPT เพื่อสร้างสื่อนำเสนอ ของทีม ม.3', // TODO: คำแนะนำตัวสั้น ๆ จริง
  },
  {
    id: 'm3-topic4',
    name: 'พี่โฟม',
    grade: 'm3',
    topicId: 'topic4',
    photoUrl: photoM3Topic4,
    bio: 'พี่ผู้สอนหัวข้อการเขียน Prompt ด้วย ChatGPT เพื่อสร้าง Portfolio ของทีม ม.3', // TODO: คำแนะนำตัวสั้น ๆ จริง
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
  },
  {
    id: 'm6-topic2',
    name: 'พี่กาก้า',
    grade: 'm6',
    topicId: 'topic2',
    photoUrl: photoM6Topic2,
    bio: 'พี่ผู้สอนหัวข้อการประยุกต์ใช้ AI ใน Canva ของทีม ม.6', // TODO: คำแนะนำตัวสั้น ๆ จริง
  },
  {
    id: 'm6-topic3',
    name: 'พี่ไอวี่',
    grade: 'm6',
    topicId: 'topic3',
    photoUrl: photoM6Topic3,
    bio: 'พี่ผู้สอนหัวข้อการเขียน Prompt ด้วย ChatGPT เพื่อสร้างสื่อนำเสนอ ของทีม ม.6', // TODO: คำแนะนำตัวสั้น ๆ จริง
  },
  {
    id: 'm6-topic4',
    name: 'พี่อิง',
    grade: 'm6',
    topicId: 'topic4',
    photoUrl: photoM6Topic4,
    bio: 'พี่ผู้สอนหัวข้อการเขียน Prompt ด้วย ChatGPT เพื่อสร้าง Portfolio ของทีม ม.6', // TODO: คำแนะนำตัวสั้น ๆ จริง
  },
]

/**
 * พี่ผู้สอนทั้งหมดของทีมใดทีมหนึ่ง
 * เรียงตามลำดับกิจกรรมในสไลด์ของทีมนั้น (ม.3 กับ ม.6 เรียงไม่เหมือนกัน)
 */
export function getInstructorsByGrade(grade: Grade): Instructor[] {
  const order = getTopicsForGrade(grade).map((topic) => topic.id)
  return instructors
    .filter((instructor) => instructor.grade === grade)
    .sort((a, b) => order.indexOf(a.topicId) - order.indexOf(b.topicId))
}

/** พี่ผู้สอนคนเดียวจาก id ที่อ้างอิงใน topics.ts */
export function getInstructorById(id: string): Instructor | undefined {
  return instructors.find((instructor) => instructor.id === id)
}
