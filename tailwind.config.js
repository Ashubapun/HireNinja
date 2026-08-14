/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1C2A3A',
          light: '#2A3D54',
          muted: 'rgba(28, 42, 58, 0.08)',
          '50': '#F0F3F6',
          '100': '#D6DDE5',
          '200': '#ADBBC8',
          '800': '#1C2A3A',
          '900': '#111D29',
        },
        amber: {
          DEFAULT: '#F5A623',
          light: '#FBBF4A',
          dark: '#D4891A',
          '50': '#FFF8EC',
          '100': '#FEECC8',
          '400': '#F5A623',
          '500': '#D4891A',
        },
        canvas: {
          DEFAULT: '#F4F6F8',
          dark: '#E8ECF0',
        },
        highway: {
          DEFAULT: '#6B7B8D',
          dark: '#4A5A6A',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'DM Sans', 'sans-serif'],
        display: ['DM Sans', 'Manrope', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(28, 42, 58, 0.08), 0 1px 4px rgba(28, 42, 58, 0.04)',
        'card-hover': '0 24px 48px rgba(28, 42, 58, 0.12), 0 8px 16px rgba(28, 42, 58, 0.06)',
        'amber': '0 0 0 2px rgba(245, 166, 35, 0.4), 0 8px 24px rgba(245, 166, 35, 0.2)',
        'navy': '0 8px 32px rgba(28, 42, 58, 0.24)',
      },
    },
  },
  plugins: [],
};