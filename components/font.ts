import localFont from "next/font/local";

// Example: Configure your local font
export const customFont = localFont({
    src: [
        {
            path: "../public/fonts/impact/impact.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/impact/impact.ttf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-custom",
});
