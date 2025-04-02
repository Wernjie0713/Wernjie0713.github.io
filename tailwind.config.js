/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#8efc64",
        neon: {
          purple: "#e421fc",
          pink: "#ff00ff",
          blue: "#00f0ff",
          magenta: "#fc00ff",
        },
        cyber: {
          dark: "#0c0c0e",
          grid: "#1a1a22",
          glow: "#f700ff40",
        },
        dark: "#010101",
        light: "#ccd6f6",
        lightest: "#e6f1ff",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        cyber: ['"Orbitron"', 'sans-serif'],
      },
      boxShadow: {
        'neon-purple': '0 0 5px #e421fc, 0 0 20px #e421fc',
        'neon-blue': '0 0 5px #00f0ff, 0 0 20px #00f0ff',
        'neon-green': '0 0 5px #8efc64, 0 0 20px #8efc64',
        'neon-magenta': '0 0 5px #fc00ff, 0 0 20px #fc00ff',
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(#1a1a22 1px, transparent 1px), linear-gradient(to right, #1a1a22 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
} 