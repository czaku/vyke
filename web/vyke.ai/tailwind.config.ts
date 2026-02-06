import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space)', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#00d4aa',
          light: '#00e6b8',
          glow: 'rgba(0, 212, 170, 0.3)',
        },
        surface: '#141414',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
