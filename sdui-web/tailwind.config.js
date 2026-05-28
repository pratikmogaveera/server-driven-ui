/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./data/**/*.json", // Scans all JSON files in the data folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}