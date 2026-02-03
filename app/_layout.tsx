import '../global.css'
import { View } from 'react-native'
import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'context/ThemeContext'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <View style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
          </Stack>
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}