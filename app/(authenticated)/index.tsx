import { Button } from 'components/Button'
import { TablesGrid } from 'components/TablesGrid'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'
import { useTheme } from 'context/ThemeContext'
import { Container } from 'components/Container'

const PRIMARY = '#10b981'

export default function HomeScreen() {
  const router = useRouter()
  const { isDark } = useTheme()

  return (
    <Container>
      <View
        className={`flex-row items-center justify-between px-4 py-4 border-b ${
          isDark
            ? 'bg-background border-neutral-800'
            : 'bg-white border-neutral-200'
        }`}
      >
        <View className="w-10 h-10 rounded-full items-center justify-center">
          <Ionicons name="restaurant" size={28} color={PRIMARY} />
        </View>
        <Text
          className={`flex-1 text-lg font-bold text-center tracking-tight ${
            isDark ? 'text-foreground' : 'text-neutral-900'
          }`}
        >
          Gestão de Mesas
        </Text>
        <View className="w-10 h-10" />
      </View>

      <View className="items-center justify-center py-4">
        <Button
          text="Abrir Nova Comanda"
          size="medium"
          onPress={() => router.push('/new-order')}
        />
      </View>

      <TablesGrid />
    </Container>
  )
}
