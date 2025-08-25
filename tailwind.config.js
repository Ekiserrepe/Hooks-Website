/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'xahau-blue': '#183FB7',
        'xahau-blue-light': '#7592F7',
        'xahau-dark': '#0C1637',
        'xahau-card': '#3D4256',
        'xahau-light': '#F5F7FF',
        'xahau-light-card': '#EBEDF9'
      },
      fontFamily: {
        'mono': ['Source Code Pro', 'monospace'],
        'pixel': ['Press Start 2P', 'cursive']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
  darkMode: 'class'
}