import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7f9',
          100: '#ffe9f0',
          200: '#ffcfe0',
          300: '#ffa6c4',
          400: '#ff74a2',
          500: '#ff4d87',
          600: '#f43173',
          700: '#d71c5e',
          800: '#b0144d',
          900: '#930f41'
        }
      }
    }
  },
  plugins: []
} satisfies Config;
