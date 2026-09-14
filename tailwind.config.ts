import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,vue}',
    './components/**/*.{js,ts,vue}',
    './pages/**/*.{js,ts,vue}',
    './layouts/**/*.{js,ts,vue}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Zero11 Brand Colors — sampled from the official logo
        'zero11-red': {
          50: '#FCEDEE',
          100: '#F9D7D8',
          200: '#F2A6A9',
          300: '#E96D71',
          400: '#E1383E',
          500: '#DF2B31',
          600: '#CC1F25', // Primary brand red
          700: '#A91A1F',
          800: '#851418',
          900: '#620F12',
          950: '#470B0D',
        },
        'zero11-orange': {
          50: '#FDF2EC',
          100: '#FCE2D5',
          200: '#F7BEA1',
          300: '#F29463',
          400: '#EE6D2B',
          500: '#EF7B3F',
          600: '#ED6823', // Accent orange
          700: '#D65511',
          800: '#B0460E',
          900: '#8A370B',
          950: '#6E2B09',
        },
        'zero11-black': '#0A0A0A',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
