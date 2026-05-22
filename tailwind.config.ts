import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050a16",
        deep: "#0a1438",
        navy: "#143078",
        blue: "#2563eb",
        azure: "#3b82f6",
        glow: "#60a5fa",
        mist: "#93c5fd",
        sky: "#7dd3fc",
        cream: "#f5f0e8",
        parchment: "#ede7d5",
        gold: "#c9a84c",
        "gold-light": "#e8c97a",
        "text-main": "#e8f0ff",
        "text-dim": "#a8c4f0",
        "text-muted": "#5a7ab8",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-josefin)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(59,130,246,0.35) 0%, rgba(37,99,235,0.15) 40%, transparent 70%)",
        "section-blue":
          "linear-gradient(180deg, transparent 0%, rgba(37,99,235,0.12) 50%, transparent 100%)",
        "card-glass":
          "linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(37,99,235,0.08) 100%)",
        "price-glow":
          "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(96,165,250,0.2) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "float-pulse": "floatPulse 2.5s ease-in-out infinite",
        "scroll-line": "scrollPulse 2s ease infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        floatPulse: {
          "0%, 100%": { boxShadow: "0 4px 20px rgba(37,211,102,0.4)" },
          "50%": { boxShadow: "0 6px 32px rgba(37,211,102,0.65)" },
        },
        scrollPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
