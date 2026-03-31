import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        primary: {
          DEFAULT: "#6366f1",
          hover: "#4f46e5",
          light: "#e0e7ff",
        },
        stone: {
          background: "#e7e5e4",
          surface: "#f5f5f4",
        },
      },
      borderRadius: {
        DEFAULT: "1.25rem",
        sm: "0.625rem",
        lg: "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
