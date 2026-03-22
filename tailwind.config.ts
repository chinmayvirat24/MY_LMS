import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: "#f4f8ff",
        ink: "#020617",
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af"
        }
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 54px rgba(2, 6, 23, 0.1)",
        card: "0 16px 34px rgba(15, 23, 42, 0.09)",
        halo: "0 0 0 6px rgba(37, 99, 235, 0.12)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(37,99,235,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
