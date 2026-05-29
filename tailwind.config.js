/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './main.js',
    './talks/**/*.{html,js,css,md}',
    './css/**/*.scss',
    './js/**/*.js',
  ],
  theme: {
    extend: {},
  },
  safelist: ['btn-secondary'],
  daisyui: {
    themes: ['synthwave'],
  },
  plugins: [require('daisyui')],
};
