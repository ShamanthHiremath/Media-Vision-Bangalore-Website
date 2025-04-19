// client/tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html",
    ],
    theme: {
      extend: {
        colors: {
          purple: {
            900: '#4a148c', // Primary dark purple
            800: '#6a1b9a', // Secondary purple
            700: '#7b1fa2', // Light purple
          }
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  
