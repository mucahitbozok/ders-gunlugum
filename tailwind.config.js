/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#36a5f7',
          500: '#0c87e8',
          600: '#026bc4',
          700: '#03569f',
          800: '#074983',
          900: '#0c3d6e',
          950: '#082749',
        },
        edu: {
          teal: '#0d9488',
          amber: '#d97706',
          emerald: '#059669',
          purple: '#7c3aed',
          rose: '#e11d48'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
