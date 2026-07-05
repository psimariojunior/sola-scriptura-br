import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4a3728',
          50: '#f7f3f0',
          100: '#efe7df',
          200: '#dcc9b8',
          300: '#c5a68c',
          400: '#b08a6a',
          500: '#9a7354',
          600: '#7d5c42',
          700: '#5f4533',
          800: '#4a3728',
          900: '#3a2b1f',
        },
        gold: { DEFAULT: '#c4a265', light: '#d4b87a', dark: '#a68a4f' },
        burgundy: { DEFAULT: '#8b2252', light: '#a33368', dark: '#6e1a40' },
        parchment: { DEFAULT: '#f5f0e8', dark: '#e8dfd2' },
        ink: { DEFAULT: '#2c1810', light: '#4a3728' },
        background: '#f9f6f1',
        foreground: '#2c1810',
        card: { DEFAULT: '#ffffff', foreground: '#2c1810' },
        muted: { DEFAULT: '#f0ebe3', foreground: '#7a6e62' },
        border: '#e2d9cd',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Spectral', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
