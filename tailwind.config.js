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
        'hexagon-mesh': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'50\' height=\'40\' viewBox=\'0 0 50 40\'%3E%3Cpath d=\'M10 0 L25 0 L35 20 L25 40 L10 40 L0 20 Z\' fill=\'none\' stroke=\'%23e421fc10\' transform=\'translate(0, 0)\' /%3E%3C/svg%3E")',
        'noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'thread-pattern': 'linear-gradient(to bottom right, rgba(228, 33, 252, 0.1) 1px, transparent 1px), linear-gradient(to bottom left, rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.3' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'data-flow': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'thread-drift': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(10px, 10px) rotate(5deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0deg)' },
        },
      },
      animation: {
        scan: 'scan 3s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'data-flow': 'data-flow 10s linear infinite',
        'thread-drift': 'thread-drift 15s ease-in-out infinite',
      },
      backgroundSize: {
        'thread': '50px 50px',
      },
    },
  },
  plugins: [],
} 