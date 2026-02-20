import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            /* Tailwind v4는 브레이크포인트를 globals.css @theme에서 사용합니다 */
            maxWidth: {
                container: "1280px",
            },
            animation: {
                marquee: 'marquee var(--duration) linear infinite',
            },
            keyframes: {
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(calc(-100% - var(--gap)))' }
                }
            }
        },
    },
    plugins: [],
};
export default config;
