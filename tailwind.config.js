/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx}',
    './app/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './context/**/*.{js,ts,tsx}',
    './theme/**/*.{js,ts,tsx}',
  ],
  darkMode: 'class', // necessário para toggle manual light/dark com NativeWind
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        button: 'var(--color-button)',
        'button-foreground': 'var(--color-button-foreground)',
        'green-min': 'var(--color-green-min)',
        'green-min-pressed': 'var(--color-green-min-pressed)',
        'green-min-foreground': 'var(--color-green-min-foreground)',
        'green-medium': 'var(--color-green-medium)',
        'green-medium-pressed': 'var(--color-green-medium-pressed)',
        'green-medium-foreground': 'var(--color-green-medium-foreground)',
        'green-big': 'var(--color-green-big)',
        'green-big-pressed': 'var(--color-green-big-pressed)',
        'green-big-foreground': 'var(--color-green-big-foreground)',
      },
    },
  },
  plugins: [],
};
