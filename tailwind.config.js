/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["TT Smalls", "sans-serif"],
      },
      backgroundColor: {
        main: "#292930",
        black: "#303038",
        secondary: "#6764F1",
        purple: "rgba(103, 100, 241, 1)",
      },
      textColor: {
        default: "#9C9CB0",
        selected: "#6764F1",
        white: "#F5F5F5",
        gray: "#6B6B7B",
        yellow: "#EFB62B",
        black: "#292930",
        purple: "#6764F1",
      },
      borderColor: {
        default: "rgba(245, 245, 245, 0.08)",
        buttons: "rgba(245, 245, 245, 0.16)",
        purple: "rgba(103, 100, 241, 1)",
        black: "#303038",
        light: "rgb(238, 231, 43)",
      },
      fill: {
        purple: "rgba(103, 100, 241, 1)",
      },
      ringColor: {
        purple: "rgba(103, 100, 241, 1)",
      },

      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
    },
  },
  plugins: [],

  // plugins: [require("@tailwindcss/forms")],
};
