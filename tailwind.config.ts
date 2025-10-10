import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        // 이제 className="font-sans" 쓰면 Pretendard가 적용됨
        sans: [
          "var(--font-pretendard)",
          "system-ui",
          "Segoe UI",
          "Apple SD Gothic Neo",
          "Malgun Gothic",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        main: {
          DEFAULT: "#0079EA",

          100: "#D9E8FF",

          300: "#C1E1FF",
          600: "#0079EA",
        },
        ink: {
          DEFAULT: "#232323",
          900: "#232323",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
