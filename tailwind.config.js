/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: "#011F45",
        neutralLight: "#273F60",
        azure: "#007CFF",
      },
      backgroundImage: {
        bgBlueR: "url('./src/assets/bgBlue.png')",
      },
    },
  },
  plugins: [],
};
