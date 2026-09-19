import type { Config } from "tailwindcss"

const withAlpha = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`

export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: withAlpha("--ink"),
        mist: withAlpha("--mist"),
        line: withAlpha("--line"),
        card: withAlpha("--card-bg"),
        green: {
          DEFAULT: withAlpha("--green"),
          deep: withAlpha("--green-deep"),
          light: withAlpha("--green-light"),
        },
        amber: {
          DEFAULT: withAlpha("--amber"),
          deep: withAlpha("--amber-deep"),
        },
      },
    },
  },
  plugins: [],
} satisfies Config