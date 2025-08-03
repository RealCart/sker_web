/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", ""],
    theme: {
        extend: {
            colors: {
                green: "#37C063",
                dark: "#252525",
                white: "#FFF",
                dark_gray: "#98ADBD",
                gray_001: "#98ADBD",
                gray_002: "#CBDBE7",
                gray_003: "#D5E4F0",
                gray_004: "#E4F1FB",
                background: "#F3F3F3",
                blue: "#1388FF",
                red: "#F55353",
                blue_light: "#DBEFFF",
                green_light: "#C6F5D5",
                red_light: "#FFE3E3",
                shadow: "#BED4E6",
                shadow2: "#BED4E6",
                hover_green: "#37B15E",
                hover_dark: "#505050",
                hover_gray_002: "#D2E1EE",

                // new colors

                orange: "#FF4F00",
                yellow: "#FFEC2D",
            },
            fontSize: {
                regular_10: "10px",
                regular_12: "12px",
                regular_14: "14px",
                regular_16: "16px",
                regular_18: "18px",
            },
        },
        borderRadius: {
            border_7: "7px",
            border_10: "10px",
            border_12: "12px",
            border_16: "16px",
            border_20: "20px",
            none: "0",
            sm: "0.125rem",
            DEFAULT: "0.25rem",
            DEFAULT: "4px",
            md: "0.375rem",
            lg: "0.5rem",
            full: "9999px",
            large: "12px",
        },
    },
    plugins: [],
};
