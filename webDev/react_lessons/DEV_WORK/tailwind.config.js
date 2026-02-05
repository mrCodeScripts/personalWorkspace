/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // <- all React source files
  ],
  theme: {
    extend: {
      keyframes: {
        "scale-in": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "show-in": {
          "0%": {opacity: "0"},
          "100%": {opacity: "1"}
        },
        "slide-in": {
          "0%": {transform: "translateX(50%)", opacity: "0"},
          "100%": {transform: "translateX(0$)", opacity: "1"}
        },
      },
      animation: {
        "scale-in": "scale-in 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards",
        "show-in": "show-in 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards",
        "slide-in": "slide-in 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards",
      },
    },
  },
  plugins: [],
}

