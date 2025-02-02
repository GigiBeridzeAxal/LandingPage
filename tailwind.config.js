/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        appBlue: '#1141C1',
        bermuda: '#78dcca',
        headerColor: '#181818',
        primaryColor: '#F05919',
      },
      boxShadow: {
        'custom-3d':
          'inset 0px -4px 0px rgba(240, 89, 25, 0.3), 0px 4px 6px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
