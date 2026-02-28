import '../global.css'
import { View } from 'react-native'
import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'context/ThemeContext'

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
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
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}