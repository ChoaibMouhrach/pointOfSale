/* eslint-disable linebreak-style */
/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts ,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#1C1C1E",
        "dark-gray": "#212121",
        "dark-text": "#E8EAF6",
        white: "#FFFFFF",
        "light-text": "#424242",
        "light-gray": "#E8EAF6",
        danger: "#EF5350",
        "light-danger": "rgb(239,83,80,0.8)",
        success: "#66BB6A",
        "light-success": "rgb(102,187,106,0.8)",
        primary: "#3F51B5",
        "light-primary": "rgb(63,81,181,0.8)",
        "blue-gray": "#90A4AE",
        semiblack: "rgba(0 ,0 ,0 ,0.5)",
      },
    },
  },
  plugins: [],
};
