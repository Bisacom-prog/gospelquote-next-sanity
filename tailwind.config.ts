import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#102A43',
        accent: '#D4AF37',
        cream: '#FAF7F2'
      },
      fontFamily: {
        heading: ["'Playfair Display'", 'serif'],
        body: ['Poppins', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 12px 40px rgba(0,0,0,0.10)'
      }
    }
  },
  plugins: []
} satisfies Config;
