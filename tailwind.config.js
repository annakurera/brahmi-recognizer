/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        parchment: '#faf8f5',
        ivory: '#f3efe8',
        charcoal: '#2d2d2d',
        stone: {
          400: '#8a8a8a',
          500: '#6f6f6f',
          600: '#5c5c5c',
        },
        uop: {
          blue: '#1e3a5f',
          gold: '#c9a227',
        },
        success: {
          border: '#3d7a6a',
          bg: '#eef6f3',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 40px rgba(45, 45, 45, 0.08)',
        card: '0 8px 28px rgba(30, 58, 95, 0.08)',
      },
    },
  },
  plugins: [],
}
