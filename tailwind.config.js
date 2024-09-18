import defaultTheme from 'tailwindcss/defaultTheme';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {  fontFamily: {
      sans: ['Poppins', ...defaultTheme.fontFamily.sans],
  },},
  },
  plugins: [],
}

