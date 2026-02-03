/**
 * Schema de cores do app (preset).
 * Apenas cores usadas pelo componente Button (3 tons: min, medium, big)
 * e cores base (background, foreground) para o resto do app.
 */

export const colorPreset = {
  light: {
    '--color-background': '#ffffff',
    '--color-foreground': '#171717',
    '--color-button': '#262626',
    '--color-button-foreground': '#fafafa',
    '--color-green-min': '#86efac',
    '--color-green-min-pressed': '#4ade80',
    '--color-green-min-foreground': '#171717',
    '--color-green-medium': '#22c55e',
    '--color-green-medium-pressed': '#16a34a',
    '--color-green-medium-foreground': '#ffffff',
    '--color-green-big': '#166534',
    '--color-green-big-pressed': '#14532d',
    '--color-green-big-foreground': '#ffffff',
  },
  dark: {
    '--color-background': '#0a0a0a',
    '--color-foreground': '#fafafa',
    '--color-button': '#fafafa',
    '--color-button-foreground': '#171717',
    '--color-green-min': '#86efac',
    '--color-green-min-pressed': '#4ade80',
    '--color-green-min-foreground': '#171717',
    '--color-green-medium': '#22c55e',
    '--color-green-medium-pressed': '#16a34a',
    '--color-green-medium-foreground': '#ffffff',
    '--color-green-big': '#166534',
    '--color-green-big-pressed': '#14532d',
    '--color-green-big-foreground': '#ffffff',
  },
} as const

export type ColorScheme = keyof typeof colorPreset
