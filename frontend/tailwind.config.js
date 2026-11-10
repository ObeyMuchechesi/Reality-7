/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#0B132B',
          deep: '#060B1A',
          soft: '#121C3A',
        },
        // Sampled from the gold "7" in the group's wordmark
        gold: {
          DEFAULT: '#EFBC4C',
          light: '#FAC959',
          bright: '#FFE9B0',
          deep: '#C08F2B',
          ink: '#6E4E13',
        },
        cream: '#F4F1DE',
        earth: '#8B5E3C',
        sage: '#5A7D7C',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'Times New Roman', 'serif'],
        body: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.34em',
      },
      boxShadow: {
        glow: '0 18px 50px -18px rgba(239, 188, 76, 0.55)',
        plate: '0 40px 90px -45px rgba(0, 0, 0, 0.9)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
};
