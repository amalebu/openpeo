import defaultTheme from 'tailwindcss/defaultTheme';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {  
      fontFamily: {
      sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'primary': {
                    400: '#bd4b00',
                    500: '#b14e0b',
                    600: '#3a1904',
                },
        'secondary': '#a4c2d5',
        'mate': '#ffffff',
      }
    },
  },
  plugins: [],
}

