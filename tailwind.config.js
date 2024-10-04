/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    fontFamily: {
      gilBold: ['Gilroy-Bold', 'Gilroy-Bold'],
      gilLight: ['Gilroy-Light', 'Gilroy-Light'],
      gilMedium: ['Gilroy-Medium', 'Gilroy-Medium'],
      gilReg: ['Gilroy-Regular', 'Gilroy-Regular'],
      gilSemiBold: ['Gilroy-SemiBold', 'Gilroy-SemiBold'],
      gilThin: ['Gilroy-Thin', 'Gilroy-Thin'],
    },
  },
  plugins: [],
};
