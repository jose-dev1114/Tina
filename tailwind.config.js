/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand color palette
        'peach': {
          50: '#fef9f7',
          100: '#fef2ee',
          200: '#fde4dc',
          300: '#FCD8CD', // Primary brand color
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
          200: '#FEEBF6', // Primary brand color
          300: '#fdd9ed',
          400: '#fcc7e4',
          500: '#fab5db',
          600: '#f7a3d2',
          700: '#f391c9',
          800: '#ee7fc0',
          900: '#e86db7',
        },
        'lavender': {
          50: '#faf8fe',
          100: '#f5f1fd',
          200: '#EBD6FB', // Primary brand color
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
        }
      },
      backgroundImage: {
        'organic-gradient': 'linear-gradient(135deg, #FCD8CD 0%, #FEEBF6 50%, #EBD6FB 100%)',
        'peach-gradient': 'linear-gradient(135deg, #FCD8CD 0%, #FEEBF6 100%)',
        'blush-gradient': 'linear-gradient(135deg, #FEEBF6 0%, #EBD6FB 100%)',
        'lavender-gradient': 'linear-gradient(135deg, #EBD6FB 0%, #FCD8CD 100%)',
        'brand-gradient': 'linear-gradient(135deg, #FCD8CD 0%, #FEEBF6 50%, #EBD6FB 100%)',
      }
    },
  },
  plugins: [],
};
