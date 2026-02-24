import type { Config } from "tailwindcss";
// @ts-ignore
import daisyui from "daisyui";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // custom: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"], // global sans
        jetBrains: ["var(--font-jetbrains)"],
        cuprum: ["var(--font-cuprum)"],
      },
      // keyframes: {
      //   formBottomToTop: {
      //     "0%": { transform: "translateY(40px)" },
      //     "100%": { transform: "translateY(0)" },
      //   },
      //   formTopToBottom: {
      //     "0%": { transform: "translateY(0)" },
      //     "100%": { transform: "translateY(40px)" },
      //   },
      //   hideShow: {
      //     "0%": { opacity: "0" },
      //     "100%": { opacity: "1" },
      //   },
      // },
      animation: {
        formBottomToTop:
          "formBottomToTop 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        hideShow: "hideShow 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        formTopToBottom:
          "formTopToBottom 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },

  plugins: [daisyui(), animate],
  // @ts-ignore
  // daisyui: {
  //   themes: [
  //     {
  //       pubmarket: {
  //         primary: "#f43f5e",
  //         secondary: "#fbbf24",
  //         accent: "#22d3ee",
  //         neutral: "#f3f4f6",

  //         "base-100": "#ffffff",
  //         "base-200": "#e5e7eb",
  //         "base-content": "#1f2937",

  //         info: "#3b82f6",
  //         success: "#16a34a",
  //         warning: "#facc15",
  //         error: "#ef4444",
  //       },
  //     },
  //   ],
  // },
};

export default config;
