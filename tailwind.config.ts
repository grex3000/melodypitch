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
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        bg: {
          base: "var(--bg-base)",
          "surface-1": "var(--bg-surface-1)",
          "surface-2": "var(--bg-surface-2)",
          "surface-3": "var(--bg-surface-3)",
          overlay: "var(--bg-overlay)",
        },
        fg: {
          "1": "var(--fg-1)",
          "2": "var(--fg-2)",
          "3": "var(--fg-3)",
          "4": "var(--fg-4)",
          inverse: "var(--fg-inverse)",
        },
        border: {
          subtle: "var(--border-subtle)",
          default: "var(--border-default)",
          strong: "var(--border-strong)",
          focus: "var(--border-focus)",
        },
        accent: {
          gold: {
            DEFAULT: "var(--accent-gold)",
            muted: "var(--accent-gold-muted)",
            hover: "var(--accent-gold-hover)",
            dim: "var(--accent-gold-dim)",
          },
          teal: {
            DEFAULT: "var(--accent-teal)",
            muted: "var(--accent-teal-muted)",
            hover: "var(--accent-teal-hover)",
            dim: "var(--accent-teal-dim)",
          },
        },
        success: {
          DEFAULT: "var(--color-success)",
          muted: "var(--color-success-muted)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          muted: "var(--color-warning-muted)",
        },
        error: {
          DEFAULT: "var(--color-error)",
          muted: "var(--color-error-muted)",
        },
        info: {
          DEFAULT: "var(--color-info)",
          muted: "var(--color-info-muted)",
        },
        status: {
          pending: "var(--status-pending)",
          reviewing: "var(--status-reviewing)",
          interested: "var(--status-interested)",
          passed: "var(--status-passed)",
          archived: "var(--status-archived)",
        },
      },
      spacing: {
        "1": "var(--space-1)",
        "2": "var(--space-2)",
        "3": "var(--space-3)",
        "4": "var(--space-4)",
        "5": "var(--space-5)",
        "6": "var(--space-6)",
        "8": "var(--space-8)",
        "10": "var(--space-10)",
        "12": "var(--space-12)",
        "16": "var(--space-16)",
        "24": "var(--space-24)",
        "32": "var(--space-32)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        pill: "var(--radius-pill)",
      },
      fontSize: {
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        base: "var(--text-base)",
        md: "var(--text-md)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
        "4xl": "var(--text-4xl)",
        "5xl": "var(--text-5xl)",
      },
      lineHeight: {
        tight: "var(--leading-tight)",
        snug: "var(--leading-snug)",
        normal: "var(--leading-normal)",
        loose: "var(--leading-loose)",
      },
      letterSpacing: {
        tight: "var(--tracking-tight)",
        normal: "var(--tracking-normal)",
        wide: "var(--tracking-wide)",
        wider: "var(--tracking-wider)",
        label: "var(--tracking-label)",
      },
      fontWeight: {
        light: "var(--weight-light)",
        normal: "var(--weight-regular)",
        medium: "var(--weight-medium)",
        semibold: "var(--weight-semibold)",
        bold: "var(--weight-bold)",
        extrabold: "var(--weight-extrabold)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        modal: "var(--shadow-modal)",
        focus: "var(--shadow-focus)",
        "glow-gold": "var(--shadow-glow-gold)",
        "glow-teal": "var(--shadow-glow-teal)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        in: "var(--ease-in)",
        inout: "var(--ease-inout)",
      },
      zIndex: {
        base: "var(--z-base)",
        raised: "var(--z-raised)",
        dropdown: "var(--z-dropdown)",
        sticky: "var(--z-sticky)",
        overlay: "var(--z-overlay)",
        modal: "var(--z-modal)",
        toast: "var(--z-toast)",
      },
    },
  },
  plugins: [],
};

export default config;
