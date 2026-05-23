/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        back: "#03506F",
        text: "#fff",
        midnight: "#121063",
        metal: "#565584",
        tahiti: "#3ab7bf",
        silver: "#ecebff",
        "bubble-gum": "#ff77e9",
        bermuda: "#78dcca",
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.1)",
        hover: "0 12px 24px rgba(0, 0, 0, 0.15)",
        dark: "0 4px 12px rgba(0, 0, 0, 0.3)",
        "dark-hover": "0 12px 24px rgba(0, 0, 0, 0.4)",
      },
      fontFamily: {
        display: ["Fredoka", "sans-serif"],
        body: ["Poppins", "sans-serif"],
      },
      transitionDuration: {
        250: "250ms",
      },
      borderRadius: {
        "2xl": "1rem",
      },
    },
  },
  plugins: [require("daisyui")],
};
