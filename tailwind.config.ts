/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/components/*.tsx', './src/screens/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        OpenSansLight: ['OpenSansLight'],
        OpenSansRegular: ['OpenSansRegular'],
        OpenSansSemiBold: ['OpenSansSemiBold'],
        OpenSansBold: ['OpenSansBold']
      },
      colors: {
        primary: {
          green: '#257C2E',
          black: '#000000',
          white: '#FFFFFF',
          red: '#CE2E33'
        },
        secondary: {
          green: '#00420C',
          black: '#5C5E60',
          white: '#EEEFF1'
        }
      }
    }
  },
  plugins: []
};
