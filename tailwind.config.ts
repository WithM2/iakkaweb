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

          100: "#E8F4FF",

          300: "#C1E1FF",
          600: "#0079EA",
          800: "#0053A1",
        },
        ink: {
          DEFAULT: "#FFFFFF",
          400: "#BDBDBD",
          900: "#232323",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
