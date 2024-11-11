/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './talks/**/*.{html,js,css}',
    './css/**/*.scss',
    './**/*.html',
    './talks/**/*.{html,md}',
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
