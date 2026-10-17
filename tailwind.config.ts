import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: "#d8ad7a",
          DEFAULT: "#c39663",
          dark: "#a57947",
          deep: "#8d6438",
        },
        luxury: {
          black: "#0a0708",
          dark: "#0f0708",
          charcoal: "#181719",
          card: "#202022",
          navy: "#152833",
          cream: "#f9f6f3",
          lightGray: "#f7f7f7",
          border: "rgba(255, 255, 255, 0.1)",
          goldBorder: "rgba(195, 150, 99, 0.35)",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Ivy Mode", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Work Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 20px 50px rgba(0, 0, 0, 0.35)",
        glow: "0 0 35px rgba(195, 150, 99, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
