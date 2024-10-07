/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-img": "url('./public/bg.webp')",
        "custom-img-1": "url('./public/bg1.jpg')",
        "custom-img-2": "url('./public/bg2.jpg')",
        "custom-img-3": "url('./public/bg3.jpg')",
      },
    },
  },
  plugins: [],
};
