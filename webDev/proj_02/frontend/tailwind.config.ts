import type { Config } from "tailwindcss";
// @ts-ignore
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};

export default config;
