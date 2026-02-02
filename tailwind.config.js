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
        // Chromatic Explosion Color Palette
        electric: {
          purple: '#A855F7',
          'purple-400': '#C084FC',
        },
        cyber: {
          pink: '#EC4899',
          'pink-400': '#F472B6',
        },
        neon: {
          cyan: '#06B6D4',
          'cyan-400': '#22D3EE',
        },
        vivid: {
          blue: '#3B82F6',
          'blue-400': '#60A5FA',
        },
        lime: {
          green: '#84CC16',
          'green-400': '#A3E635',
        },
        orange: {
          burst: '#F97316',
          'burst-400': '#FB923C',
        },
        yellow: {
          glow: '#EAB308',
          'glow-400': '#FACC15',
        },
        // Dark base colors
        dark: {
          primary: '#0A0A0F',
          secondary: '#0F0F1E',
          tertiary: '#1A1A2E',
        }
      },
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif'],
        orbitron: ['Orbitron', 'monospace'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'matrix': 'matrix 20s linear infinite',
        'orbit': 'orbit 20s linear infinite',
        'rainbow': 'rainbow 3s ease-in-out infinite',
        'chromatic': 'chromatic 4s ease-in-out infinite',
        'aurora': 'aurora 8s ease-in-out infinite',
        'particle-float': 'particle-float 6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 5s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(236, 72, 153, 0.8), 0 0 40px rgba(6, 182, 212, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
        rainbow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        chromatic: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '25%': { filter: 'hue-rotate(90deg)' },
          '50%': { filter: 'hue-rotate(180deg)' },
          '75%': { filter: 'hue-rotate(270deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        aurora: {
          '0%': { transform: 'translateX(-100%) translateY(-100%)' },
          '25%': { transform: 'translateX(100%) translateY(-100%)' },
          '50%': { transform: 'translateX(100%) translateY(100%)' },
          '75%': { transform: 'translateX(-100%) translateY(100%)' },
          '100%': { transform: 'translateX(-100%) translateY(-100%)' },
        },
        'particle-float': {
          '0%': { transform: 'translate(0px, 0px) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -30px) rotate(120deg)' },
          '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' },
          '100%': { transform: 'translate(0px, 0px) rotate(360deg)' },
        },
        'gradient-shift': {
          '0%': { background: 'linear-gradient(45deg, #A855F7, #EC4899, #06B6D4)' },
          '25%': { background: 'linear-gradient(45deg, #EC4899, #06B6D4, #3B82F6)' },
          '50%': { background: 'linear-gradient(45deg, #06B6D4, #3B82F6, #84CC16)' },
          '75%': { background: 'linear-gradient(45deg, #3B82F6, #84CC16, #F97316)' },
          '100%': { background: 'linear-gradient(45deg, #84CC16, #F97316, #A855F7)' },
        },
      },
      backgroundImage: {
        'gradient-rainbow': 'linear-gradient(90deg, #A855F7, #EC4899, #06B6D4, #3B82F6, #84CC16, #F97316, #EAB308)',
        'gradient-sunset': 'linear-gradient(135deg, #F97316, #EC4899, #A855F7)',
        'gradient-ocean': 'linear-gradient(135deg, #06B6D4, #3B82F6, #A855F7)',
        'gradient-neon': 'linear-gradient(135deg, #EC4899, #22D3EE, #60A5FA)',
      },
      boxShadow: {
        'rainbow': '0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(236, 72, 153, 0.3), 0 0 60px rgba(6, 182, 212, 0.2)',
        'chromatic': '0 0 30px rgba(168, 85, 247, 0.6), 0 0 60px rgba(236, 72, 153, 0.4), 0 0 90px rgba(6, 182, 212, 0.3)',
        'aurora': '0 0 40px rgba(6, 182, 212, 0.8), 0 0 80px rgba(59, 130, 246, 0.6), 0 0 120px rgba(132, 204, 22, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
