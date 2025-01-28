/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      rose: "#f1544e",
      green: "#45827d",
      roselight: "#f9afac",
      black: "#2a2a2a",
      white: "#ffffff",
      Ivory: "#FFFFF0",
      grey: "#e5e5e5",
    },
    extend: {
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
      fontFamily: {
        RedRose: ["Red Rose", "serif"],
        Poppins: ["Poppins", "serif"],
        StyleScript: ["Style Script", "serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

