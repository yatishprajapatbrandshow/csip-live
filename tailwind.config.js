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
      backgroundImage: {
        'bgForm': "url('/images/845.jpg')",
        'pattern': "url('/images/pattern.svg')",
      },
      fontFamily: {
        'montserrat': ['"My Font"'],
        'montserrat2': ['"My Font2"'],
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
