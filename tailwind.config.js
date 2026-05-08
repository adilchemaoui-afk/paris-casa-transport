module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'moroccan-red': '#8B1A1A',
        'moroccan-red-light': '#A52A2A',
        'moroccan-green': '#1B5E20',
        'moroccan-gold': '#C9A227',
        'moroccan-gold-light': '#D4AF37',
        'cream': '#F5F0E8',
        'warm-gray': '#E8E0D4',
        'deep-brown': '#3E2723',
        'zellige-teal': '#00695C',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
