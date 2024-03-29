/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}'
  ],
  plugins: [],
  prefix: 'tw-',
  theme: {
    extend: {
      animation: {
        fade: 'fadeIn .5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: 0
          },
          to: {
            opacity: 1
          },
        },
      },
      width: {
        '100': '400px',
        '112': '448px',
        '120': '480px',
        '125': '500px',
        '140': '560px',
        '150': '600px',
        '170': '680px',
        '232': '928px',
        '300': '1200px',
        '49/100': '49%',
        '9/10': '90%'
      }
    }
  }
};
