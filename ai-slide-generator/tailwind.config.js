/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <- this is critical
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

