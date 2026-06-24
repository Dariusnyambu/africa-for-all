import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: "#6E8F80",
          50: "#F2F6F4",
          100: "#E1EBE6",
          200: "#C3D7CD",
          300: "#A0C0B2",
          400: "#85AB9A",
          500: "#6E8F80",
          600: "#587268",
          700: "#465A53",
          800: "#374742",
          900: "#2C3835",
        },
        sand: {
          DEFAULT: "#D9D0C3",
          50: "#FAF8F5",
          100: "#F3EFE8",
          200: "#E9E1D4",
          300: "#D9D0C3",
          400: "#C7B79A",
          500: "#B6A284",
          600: "#9A876C",
        },
        forest: {
          DEFAULT: "#2E4A3E",
          50: "#E8EDEB",
          100: "#C5D3CD",
          200: "#9FB6AB",
          300: "#6E8F80",
          400: "#4A6E5E",
          500: "#2E4A3E",
          600: "#253D33",
          700: "#1C2F28",
          800: "#13211C",
          900: "#0B1410",
        },
        highlight: "#C7B79A",
        background: "#FAFAF7",
        ink: "#1B1B1B",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "28px",
        xl3: "32px",
        xl4: "40px",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(27, 27, 27, 0.08)",
        softer: "0 8px 40px -8px rgba(27, 27, 27, 0.10)",
        glass: "0 8px 32px rgba(46, 74, 62, 0.12)",
        "glow-sage": "0 0 0 1px rgba(110, 143, 128, 0.15), 0 8px 24px rgba(110, 143, 128, 0.18)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.8s ease forwards",
        float: "float 6s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out 1.5s infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [],
};

export default config;
