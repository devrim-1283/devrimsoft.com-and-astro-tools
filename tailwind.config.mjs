/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f7f8f9',
          100: '#e3e5e8',
          200: '#c9cdd3',
          300: '#a3a9b3',
          400: '#7f8694',
          500: '#616876',
          600: '#4a505c',
          700: '#363b45',
          800: '#24282f',
          900: '#16191e',
          950: '#0c0d10',
        },
        accent: {
          50: '#fdf8ed',
          100: '#f9edcc',
          200: '#f3d994',
          300: '#ecc25c',
          400: '#e5ab33',
          500: '#d4982b',
          600: '#b87a1f',
          700: '#965c1c',
          800: '#7b4a1e',
          900: '#663d1e',
          950: '#3a1f0d',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
