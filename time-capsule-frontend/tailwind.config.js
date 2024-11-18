/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        bodyBg: '#f4f4f4',
        bodyText: '#333',
      },
    },
  },
  plugins: [],
}
