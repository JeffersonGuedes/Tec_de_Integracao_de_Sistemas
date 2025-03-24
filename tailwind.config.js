/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4D9EFA',
        'primary-hover': '#4DFAE8',
        'secondary': '#4DD5FA',
        'tertiary': '#4DFAAD',
        'quaternary': '#4D68FA',
        'quinary': '#04C6FA',
        'success': '#3ad29f',
        'warning': '#eea303',
        'danger': '#dc3545',
        'danger-hover': '#e35d6a',
      },
    },
  },
  plugins: [],
};
