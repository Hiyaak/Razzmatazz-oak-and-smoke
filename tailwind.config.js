/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'], // 👈 Added custom font
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};

 
