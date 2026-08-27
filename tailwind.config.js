/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── สีหลัก: ม่วงอ่อน / ฟ้าอมม่วง ────────────────────────────
        grape: {
          50: '#F6F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA', // สีหลักรอง
          500: '#8B5CF6', // สีหลัก
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
        },
        // ── สีรอง: ฟ้ามิ้นต์ ───────────────────────────────────────
        aqua: {
          100: '#E0FBFC',
          200: '#BAF5F7',
          300: '#8AECF0',
          400: '#5CE1E6', // สีรอง
          500: '#2CC9D0',
          600: '#159FA6',
        },
        // ── สีรอง: เขียวมิ้นต์ ─────────────────────────────────────
        mint: {
          100: '#DEFCEB',
          200: '#BBF7D6',
          300: '#8FEFC2',
          400: '#6EE7B7', // สีรอง
          500: '#34D399',
          600: '#10B981',
        },
        // ── พื้นหลัง / ตัวอักษร ────────────────────────────────────
        cream: '#FFFCF5',
        paper: '#FFFFFF',
        ink: {
          400: '#8B87A3',
          500: '#6B6785',
          600: '#4C4866',
          700: '#332F4A',
          800: '#241F38',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Thai"', '"Noto Sans Thai"', 'system-ui', 'sans-serif'],
        display: ['"IBM Plex Sans Thai"', '"Noto Sans Thai"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        blob: '42% 58% 61% 39% / 45% 39% 61% 55%',
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(109, 40, 217, 0.22)',
        lift: '0 22px 44px -18px rgba(109, 40, 217, 0.38)',
        note: '0 8px 20px -10px rgba(52, 211, 153, 0.45)',
      },
      keyframes: {
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'menu-in': {
          '0%': { opacity: '0', transform: 'translateY(-6px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        // ทุก animation เล่นครั้งเดียวจบ ไม่มีการขยับวนตลอดเวลา
        'slide-down': 'slide-down 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'menu-in': 'menu-in 0.18s ease-out both',
      },
    },
  },
  plugins: [],
}
