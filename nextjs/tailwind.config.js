// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // App Router のファイル
    "./components/**/*.{js,ts,jsx,tsx}", // コンポーネント
    "./features/**/*.{js,ts,jsx,tsx}", // 機能
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("@tailwindcss/typography")],
};
