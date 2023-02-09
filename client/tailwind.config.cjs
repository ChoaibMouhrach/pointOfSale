/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#1C1C1E",
        "dark-text": "#E8EAF6",
        "dark-gray": "#212121",
        white: "#FFFFFF",
        "light-text": "#424242",
        "light-gray": "#E8EAF6",
        "danger": "#EF5350",
        "success": "#66BB6A",
        "blue-gray": "#90A4AE",
        primary: "#3F51B5",
      }
    },
  },
  plugins: [],
}
