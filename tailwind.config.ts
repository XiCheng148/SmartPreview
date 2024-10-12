export default {
  content: [
    './public/index.html',
    './components/**/*.{vue,js,ts,jsx,tsx,html}',
    './entrypoints/**/*.{vue,js,ts,jsx,tsx,html}',
  ],
  plugins: [require('daisyui')],
  daisyui: {
    // themes: ['night', 'cupcake'],
  },
};
