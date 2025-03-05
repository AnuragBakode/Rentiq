/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      rose: "#f1544e",
      green: "#00FF00",
      red: "#FF0000",
      yellow: "#FFFF00",
      orange: "#FFA500",
      lightblue: "oklch(0.623 0.214 259.815)",
      blue: "#45b6fe",
      roselight: "#f9afac",
      black: "#2a2a2a",
      white: "#ffffff",
      Ivory: "#FFFFF0",
      grey: "#ECECEC",
      grey_light: "#FAFAFA",
      grey_medium: "#F5F5F5",
      grey_dark: "#333333",
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

