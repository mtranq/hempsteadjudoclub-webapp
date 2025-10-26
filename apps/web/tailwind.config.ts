import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Theme: white, blue, gold
        navy: '#1E3A8A', // deep blue
        gold: '#F0B429', // gold
        brand: {
          primary: '#1E3A8A',
          accent: '#F0B429',
        }
      }
    },
  },
  plugins: [],
}
export default config
