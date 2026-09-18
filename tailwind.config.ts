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
        nova: {
          bg: "#F7F4FA", // Pearl Cloud
          surface: "#F0EBF4", // Mist Violet
          card: "#FFFFFF", // Pure Pearl
          border: "#DDD6E3", // Border
          divider: "rgba(35, 29, 43, 0.08)",
          text: {
            primary: "#231D2B", // Deep Plum
            secondary: "#655D6F",
            muted: "#8B8295",
          },
          green: {
            DEFAULT: "#2FAE63", // Luciferin Green
            hover: "#258C50",
            soft: "#E8F8EE",
            glow: "rgba(47, 174, 99, 0.25)",
            track: "rgba(47, 174, 99, 0.30)",
          },
          coral: {
            DEFAULT: "#E85F8E", // Quantum Coral Pink
            mid: "#EE6F72",
            orange: "#F28B5B",
            soft: "#FFF0F4",
            glow: "rgba(232, 95, 142, 0.25)",
          },
          warning: {
            DEFAULT: "#D99624",
            soft: "#FFF5DD",
          },
          error: {
            DEFAULT: "#D94C61",
            soft: "#FDECEF",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-space-grotesk)", "monospace"],
      },
      borderRadius: {
        input: "14px",
        btn: "14px",
        card: "20px",
        cardLg: "24px",
        sheet: "28px",
      },
      boxShadow: {
        card: "0 2px 8px -2px rgba(35, 29, 43, 0.05), 0 8px 24px -4px rgba(35, 29, 43, 0.08)",
        cardHover:
          "0 8px 20px -2px rgba(35, 29, 43, 0.08), 0 16px 32px -4px rgba(35, 29, 43, 0.12)",
        sheet:
          "0 -8px 32px -4px rgba(35, 29, 43, 0.12), 0 -2px 12px rgba(35, 29, 43, 0.04)",
        glowGreen: "0 0 20px rgba(47, 174, 99, 0.4)",
        glowCoral: "0 0 20px rgba(232, 95, 142, 0.4)",
        dock: "0 10px 30px -5px rgba(35, 29, 43, 0.15), 0 2px 8px rgba(35, 29, 43, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
