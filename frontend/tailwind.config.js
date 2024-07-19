import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dgray-100': '#f2f2f4',
        'dgray-200': '#caccce',
        'dgray-300': '#959ba5',
        'dgray-400': '#80848e',
        'dgray-500': '#404348',
        'dgray-600': '#313338',
        'dgray-700': '#2b2d31',
        'dgray-800': '#222429',
        'dgray-900': '#1f1e22',
        'dmention': '#444136',
        'dmention-border': '#f1b133',
        'dyellow': '#f1b332',
        'dblue': '#5964f2',
        'dblue-active': '#4653c4',
        'dgreen': '#23a55a',
        'dred': '#f23e42',
      },
      
    },
  },
  plugins: [daisyui, 
      function({ addUtilities }) {
        const newUtilities = {
          '.no-drag': {
            'user-drag': 'none',
            '-webkit-user-drag': 'none',
            'user-select': 'none',
            '-moz-user-select': 'none',
            '-webkit-user-select': 'none',
            '-ms-user-select': 'none',
          },
        }
        addUtilities(newUtilities)
      }
    ],
};

