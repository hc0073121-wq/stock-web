/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        profit: "#f87171",
        loss: "#60a5fa",
        dark: {
          900: "#111827",
          800: "#1f2937",
          700: "#374151",
        },
      },

      fontFamily: {
        pretendard: [
          "Pretendard",
          "sans-serif",
        ],
      },

      borderRadius: {
        xl2: "1rem",
      },

      boxShadow: {
        card:
          "0 10px 25px rgba(0,0,0,0.25)",
      },
    },
  },

  plugins: [],
};