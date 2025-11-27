/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1e40af",
          dark: "#1e3a8a",
          light: "#60a5fa",
        },
        accent: "#f97316",
        muted: "#94a3b8",
        background: "#0f172a",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px rgba(15, 23, 42, 0.08)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

