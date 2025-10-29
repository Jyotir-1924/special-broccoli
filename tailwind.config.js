
export const content = [
  "./pages*.{js,ts,jsx,tsx,mdx}",
  "./components*.{js,ts,jsx,tsx,mdx}",
  "./app*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      primary: {
        orange: "#ff751f",
        black: "#000000",
      },
    },
  },
};
export const plugins = [
  require('@tailwindcss/typography'),
];