/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export const content = [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
  extend: {
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      'logo': "url('/logo-stroke.png')"
    },
    fontFamily: {
      'vesper': ['"Vesper Libre"']
    }
  },
  colors: {
    ...colors,
    fontColor: colors.gray[400],
  },
};
export const variants = {
  extend: {
    placeholderOpacity: ['focus'],
  },
};
export const plugins = [];
