import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'
import { BackToTopButton } from './components/BackToTopButton'
import { HomePage } from './pages/HomePage'
import { TopicPage } from './pages/TopicPage'
import { InstructorsPage } from './pages/InstructorsPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <ScrollToTop />
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* หน้าเนื้อหา — ไม่ระบุระดับชั้นให้ใช้ ม.3 เป็นค่าเริ่มต้น */}
          <Route path="/topic/:slug/:grade" element={<TopicPage />} />
          <Route path="/topic/:slug" element={<TopicPage />} />

          {/* หน้าพี่ผู้สอน — แยกกันคนละหน้าตามทีม */}
          <Route path="/instructors/:grade" element={<InstructorsPage />} />
          <Route path="/instructors" element={<Navigate to="/instructors/m3" replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
      <BackToTopButton />
    </div>
  )
}
