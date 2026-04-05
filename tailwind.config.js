/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cormorant Garamond'", 'Georgia', 'serif'],
        sans:    ["'DM Sans'", 'system-ui', 'sans-serif'],
      },
      colors: {
        ink:    '#111110',
        bg:     '#FAFAF8',
        accent: '#2C4A3E',
      },
    },
  },
  plugins: [],
};
