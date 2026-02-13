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
        // Padrão verde/branco (TopBar, TabBar, etc.)
        verdes: {
          'bg-start': '#3CB780',
          'bg-end': '#2C8A66',
          primary: '#10b981',
          'primary-dark': '#059669',
          'border-green': '#166534',
          'circle-notification': '#449074',
          'circle-logo': '#DEAC76',
        },
        // Design Gestão de Mesas (HTML ref)
        primary: '#ec5b13',
        'background-light': '#f8f6f6',
        'background-dark': '#181311',
        'card-dark': '#271f1c',
        'border-dark': '#392e28',
        'muted': '#b9a69d',
      },
      boxShadow: {
        'tab-bar': '0 -4px 20px rgba(0,0,0,0.12)',
        'tab-bar-strong': '0 -4px 24px rgba(0,0,0,0.18)',
        'tab-circle': '0 4px 12px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
};
