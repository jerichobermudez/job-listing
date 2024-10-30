/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'desaturated-dark-cyan': 'var(--desaturated-dark-cyan)',
        'light-grayish-cyan-bg': 'var(--light-grayish-cyan-bg)',
        'light-grayish-cyan-filter': 'var(--light-grayish-cyan-filter)',
        'dark-grayish-cyan': 'var(--dark-grayish-cyan)',
        'very-dark-grayish-cyan': 'var(--very-dark-grayish-cyan)',
      },
      fontFamily: {
        spartan: ['Spartan', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
