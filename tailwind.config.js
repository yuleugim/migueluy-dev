const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      display: ['Comfortaa', ...defaultTheme.fontFamily.serif],
      body: ['Space Mono', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      typography: theme => ({
        DEFAULT: {
          css: {
            fontFamily: `${theme('fontFamily.body')}`,
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
