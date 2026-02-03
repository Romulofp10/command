'use client'

import {
  createContext,
  useCallback,
  useContext,
  type ReactNode,
} from 'react'
import { View } from 'react-native'
import { useColorScheme, vars } from 'nativewind'
import { colorPreset } from 'theme/colors'

/** Valores aceitos ao definir o tema (system = seguir preferência do dispositivo) */
export type ColorScheme = 'light' | 'dark' | 'system'

/** Preset de cores (background, foreground, button) para uso em StyleSheet ou componentes que precisam do valor bruto */
export { colorPreset } from 'theme/colors'

type ThemeContextValue = {
  /** Tema efetivo atual: 'light' ou 'dark' */
  colorScheme: 'light' | 'dark'
  setColorScheme: (scheme: ColorScheme) => void
  toggleColorScheme: () => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme()

  const resolved: 'light' | 'dark' = colorScheme === 'dark' ? 'dark' : 'light'
  const isDark = resolved === 'dark'
  const themeVars = vars(colorPreset[resolved])

  const setTheme = useCallback(
    (scheme: ColorScheme) => {
      setColorScheme(scheme)
    },
    [setColorScheme],
  )

  const value: ThemeContextValue = {
    colorScheme: resolved,
    setColorScheme: setTheme,
    toggleColorScheme,
    isDark,
  }

  return (
    <ThemeContext.Provider value={value}>
      <View style={themeVars} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
