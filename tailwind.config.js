/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-img": "url('./src/assets/bg.webp')",
        "custom-img-1": "url('./src/assets/bg1.jpg')",
        "custom-img-2": "url('./src/assets/bg2.jpg')",
        "custom-img-3": "url('./src/assets/bg3.jpg')",
      },
    },
  },
  plugins: [],
};
