/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand color palette - Beautiful lavender & cream
        'primary': {
          50: '#FFFBF5', // Warm off-white
          100: '#F7EFE5', // Soft beige
          200: '#EBD6FB', // Light lavender
          300: '#C0C9EE', // Soft lavender
          400: '#A2AADB', // Medium lavender
          500: '#898AC4', // Deeper lavender
          600: '#7A7AB8',
          700: '#6B6CAC',
          800: '#5C5DA0',
          900: '#4D4E94',
        },
        'accent': {
          50: '#FFFBF5',
          100: '#F7EFE5',
          200: '#EBD6FB',
          300: '#C0C9EE',
          400: '#A2AADB',
          500: '#898AC4',
          600: '#7A7AB8',
          700: '#6B6CAC',
          800: '#5C5DA0',
          900: '#4D4E94',
        },
        'peach': {
          50: '#fef9f7',
          100: '#fef2ee',
          200: '#fde4dc',
          300: '#FCD8CD',
          400: '#fac2b0',
          500: '#f7a68a',
          600: '#f28a64',
          700: '#eb6d3e',
          800: '#d85a2a',
          900: '#b84a22',
        },
        'blush': {
          50: '#fefbfd',
          100: '#fef7fb',
          200: '#FEEBF6',
          300: '#fdd9ed',
          400: '#fcc7e4',
          500: '#fab5db',
          600: '#f7a3d2',
          700: '#f391c9',
          800: '#ee7fc0',
          900: '#e86db7',
        },
        'pink': {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        'lavender': {
          50: '#faf8fe',
          100: '#f5f1fd',
          200: '#EBD6FB',
          300: '#ddbaf8',
          400: '#cf9ef5',
          500: '#c182f2',
          600: '#b366ef',
          700: '#a54aec',
          800: '#972ee9',
          900: '#8912e6',
        },
        'ethereal': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'orbit': 'orbit 20s linear infinite',
        'orbit-reverse': 'orbit-reverse 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        orbit: {
          '0%': {
            transform: 'rotate(0deg) translateX(140px) rotate(0deg)',
            left: '50%',
            top: '50%'
          },
          '100%': {
            transform: 'rotate(360deg) translateX(140px) rotate(-360deg)',
            left: '50%',
            top: '50%'
          },
        },
        'orbit-reverse': {
          '0%': { transform: 'rotate(0deg) translateX(140px) rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg) translateX(140px) rotate(360deg)' },
        }
      },
      backgroundImage: {
        'organic-gradient': 'linear-gradient(180deg, #FFFBF5 0%, #F7EFE5 40%, #C0C9EE 100%)',
        'peach-gradient': 'linear-gradient(180deg, #FFFBF5 0%, #EBD6FB 100%)',
        'blush-gradient': 'linear-gradient(180deg, #F7EFE5 0%, #C0C9EE 100%)',
        'lavender-gradient': 'linear-gradient(180deg, #C0C9EE 0%, #A2AADB 100%)',
        'brand-gradient': 'linear-gradient(180deg, #FFFBF5 0%, #F7EFE5 30%, #A2AADB 100%)',
        'pink-gradient': 'linear-gradient(180deg, #FFFBF5 0%, #EBD6FB 50%, #C0C9EE 100%)',
        'rose-pink-gradient': 'linear-gradient(180deg, #EBD6FB 0%, #C0C9EE 50%, #A2AADB 100%)',
        'soft-pink-gradient': 'linear-gradient(180deg, #FFFBF5 0%, #F7EFE5 100%)',
      }
    },
  },
  plugins: [],
};
