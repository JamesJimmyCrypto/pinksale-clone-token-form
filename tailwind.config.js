/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tan: "#fff",
        ban: "#EBF2F4",
        
        greey: "#c9c9c4",
        primary: "#C1D45D",
        primaryBg: "#F9FBEF",
        secondary: "#F3BA2F",
        secondaryBg: "#FEF8EA",
        accent: "#8F92A1",
        accentBg: "#F6F6F6",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
  variants: {
    scrollbar: ["rounded"],
  },
};
