/**
 * Paleta de cores da tela de login (verdes).
 * Usado em app/index.tsx e em telas que precisam da mesma identidade visual.
 */

/** Cor de ícones em telas com fundo escuro fixo (cardápio, menu, categoria) */
export const ICON_ON_DARK = '#fafafa'
/** Ícone de busca placeholder */
export const ICON_MUTED = '#9ca3af'
/** Cor primária laranja (destaque, customizável) */
export const PRIMARY_ORANGE = '#ec5b13'

/** Cores do BottomSheet de customização (design light fixo) */
export const SHEET = {
  bg: '#ffffff',
  accent: '#2563eb',
  muted: '#9ca3af',
} as const

export const VERDES = {
  /** Gradiente: verde médio (esquerda) → verde esmeralda (direita) */
  backgroundStart: '#3CB780',
  backgroundEnd: '#2C8A66',
  primary: '#10b981',
  primaryDark: '#059669',
  borderGreen: '#166534',
  textMuted: 'rgba(220,252,231,0.7)',
  placeholder: 'rgba(187,247,208,0.5)',
  link: 'rgba(220,252,231,0.6)',
  footer: 'rgba(220,252,231,0.4)',
} as const
