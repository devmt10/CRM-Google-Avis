/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
       'google-green': '#34A853',
        'google-blue': '#4285F4',
        'google-gray': '#5F6368',
        'google-red': '#EA4335',
        'google-green-dark': '#2F9747',
        'google-blue-dark': '#3A78D8',
        'google-gray-dark': '#54575C',
        'google-red-dark': '#D13A2D',
      },
    },
  },
  plugins: [],
};

// Google palette comme demandé par Alexandre
