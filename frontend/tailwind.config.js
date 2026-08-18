/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f9f9f9',
        surface: '#f9f9f9',
        'surface-container': '#eeeeee',
        'surface-container-low': '#f3f3f3',
        'surface-container-lowest': '#ffffff',
        'surface-container-high': '#e8e8e8',
        'surface-container-highest': '#e2e2e2',
        primary: '#000000',
        'on-primary': '#ffffff',
        secondary: '#5e5e5e',
        'on-secondary': '#ffffff',
        'on-surface': '#1a1c1c',
        'on-surface-variant': '#4c4546',
        'outline': '#7e7576',
        'outline-variant': '#cfc4c5',
        'luxury-gold': '#D4AF37'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}