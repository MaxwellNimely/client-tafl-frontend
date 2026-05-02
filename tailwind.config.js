/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',  // all relevant source files
    './public/index.html'               // Vite entry HTML
  ],
  theme: {
    extend: {
      // Optional: add custom colors, spacing, etc.
    },
  },
  plugins: [
    require('daisyui'),                 // enable DaisyUI
  ],
  daisyui: {
    themes: ['light', 'dark'],          // DaisyUI themes available
    darkTheme: 'dark',                  // default dark theme (optional)
    base: true,
    styled: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: '',
  },
};
