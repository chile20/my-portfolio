/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  },
  plugins: [
    // Add focus-visible plugin
    function({ addUtilities }) {
      addUtilities({
        '.focus-ring': {
          '@apply focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 dark:focus-visible:ring-accent-400': {},
        },
        '.focus-ring-inset': {
          '@apply focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-500 dark:focus-visible:ring-accent-400': {},
        },
      });
    },
  ],
};
