/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-kelp': {
          '50': '#f4f7f2',
          '100': '#e5ecdf',
          '200': '#cad9c1',
          '300': '#a4bd98',
          '400': '#799c6b',
          '500': '#587f4a',
          '600': '#426437',
          '700': '#33502c',
          '800': '#2a4025',
          '900': '#21321d',
        },
        'pampas': {
          '50': '#f8f6f4',
          '100': '#f1ede7',
          '200': '#dfd6c9',
          '300': '#cbbaa6',
          '400': '#b59a82',
          '500': '#a5846a',
          '600': '#98745e',
          '700': '#7f5e4f',
          '800': '#684e44',
          '900': '#554139',
        },
      },
    },
  },
  plugins: [],
}