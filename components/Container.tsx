import { useTheme } from 'context/ThemeContext'
import { vars } from 'nativewind'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'
import { colorPreset } from 'theme/colors'

export const Container = ({
  children,
  className,
  style,
  ...props
}: SafeAreaViewProps) => {
  const { colorScheme, isDark } = useTheme()
  const themeVars = vars(colorPreset[colorScheme])
  return (
    <SafeAreaView
      className={`flex-1 bg-background ${isDark ? 'dark' : 'light'} ${className ?? ''}`}
      style={[themeVars, style]}
      {...props}
    >
      {children}
    </SafeAreaView>
  )
}