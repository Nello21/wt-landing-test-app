import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config = {
    darkMode: ["class"],
    content: ["./src/**/*.{ts,tsx}"],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        colors: {
            gray: {
                light: "#E3E3E3",
                dark: "#616161",
                gray: colors.gray,
            },
            blue: {
                dark: "#003362",
                light: "#AED8FF",
                gray: colors.blue,
            },
            white: colors.white,
            black: colors.black,
            red: colors.red,
            yellow: colors.yellow,
        },
        extend: {
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
