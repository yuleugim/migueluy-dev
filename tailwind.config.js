const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      display: `Comfortaa, ${defaultTheme.fontFamily.serif.join(', ')}`,
      body: `Space Mono, ${defaultTheme.fontFamily.mono.join(', ')}`,
    },
    extend: {
      colors: {
        nord: {
          0: '#2E3440',
          1: '#3B4252',
          2: '#434C5E',
          3: '#4C566A',
          4: '#D8DEE9',
          5: '#E5E9F0',
          6: '#ECEFF4',
          7: '#8FBCBB',
          8: '#88C0D0',
          9: '#81A1C1',
          10: '#5E81AC',
          11: '#BF616A',
          12: '#D08770',
          13: '#EBCB8B',
          14: '#A3BE8C',
          15: '#B48EAD',
        },
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            fontFamily: theme('fontFamily.body'),
            '--tw-prose-body': theme('colors.nord[0]'),
            '--tw-prose-headings': theme('colors.nord[9]'),
            '--tw-prose-links': theme('colors.nord[0]'),
            '--tw-prose-bold': theme('colors.nord[0]'),
            '--tw-prose-counters': theme('colors.nord[1]'),
            '--tw-prose-bullets': theme('colors.nord[1]'),
            '--tw-prose-invert-body': theme('colors.nord[6]'),
            '--tw-prose-invert-headings': theme('colors.nord[9]'),
            '--tw-prose-invert-links': theme('colors.nord[6]'),
            '--tw-prose-invert-bold': theme('colors.nord[6]'),
            '--tw-prose-invert-counters': theme('colors.nord[5]'),
            '--tw-prose-invert-bullets': theme('colors.nord[5]'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
