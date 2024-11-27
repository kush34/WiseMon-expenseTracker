/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0 25px 25px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        customFont: ["monda"],
        // Add more custom font families as needed
      },
      backgroundImage: {
        'bgImg': "url('/src/assets/bg-home.png')",
      },
    },
  },
  plugins: [],
}

