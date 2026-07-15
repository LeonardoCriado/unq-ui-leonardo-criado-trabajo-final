const STORAGE_KEY = 'word-chain-theme-v1'

export const THEMES = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neón, violeta y contraste alto',
  },
  {
    id: 'matrix-terminal',
    name: 'Matrix terminal',
    description: 'Fondo negro y verde intenso',
  },
  {
    id: 'arcade-modern',
    name: 'Arcade moderno',
    description: 'Vintage brillante y limpio',
  },
  {
    id: 'classic',
    name: 'Clásico',
    description: 'Paleta original del juego',
  },
  {
    id: 'duolingo',
    name: 'Duolingo',
    description: 'Verde vivo y contraste amable',
  },
  {
    id: 'nintendo',
    name: 'Nintendo',
    description: 'Más lúdico y colorido',
  },
]

export const DEFAULT_THEME = THEMES[0].id

export function normalizeTheme(theme) {
  return THEMES.some((entry) => entry.id === theme) ? theme : DEFAULT_THEME
}

export function loadTheme() {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME
  }

  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY)
    return normalizeTheme(storedTheme)
  } catch {
    return DEFAULT_THEME
  }
}

export function saveTheme(theme) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, normalizeTheme(theme))
}