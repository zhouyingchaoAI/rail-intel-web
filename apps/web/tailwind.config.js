/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0c1424",
        slate: "#11203a",
        fog: "#d5e0f3",
        steel: "#4f6b92",
        pulse: "#3fb6ff",
        ember: "#ff8a4c",
        moss: "#4bd3a2",
      },
      boxShadow: {
        card: "0 20px 45px -35px rgba(15, 23, 42, 0.6)",
      },
    },
  },
  plugins: [],
};
