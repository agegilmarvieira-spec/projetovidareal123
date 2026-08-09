import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0a0b",
          900: "#111113",
          800: "#1a1a1d",
          700: "#242428",
          600: "#333338",
          500: "#4a4a52",
          400: "#71717a",
          300: "#a1a1aa",
          200: "#d4d4d8",
          100: "#f4f4f5",
          50: "#fafafa",
        },
        signal: {
          DEFAULT: "#ff4d2e",
          dim: "#e0431f",
          glow: "#ff7a52",
        },
        ok: "#34d399",
        warn: "#fbbf24",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Inter",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      letterSpacing: { tightest: "-0.04em" },
      borderRadius: { xl2: "1.25rem" },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 24px -8px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
