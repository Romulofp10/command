import { Button } from 'components/Button'
import { TablesGrid } from 'components/TablesGrid'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const PRIMARY = '#10b981'
const NEUTRAL_DARK = '#1f2937'
const NEUTRAL_BORDER = '#e5e7eb'
const NEUTRAL_BG = '#f9fafb'

export default function HomeScreen() {
  const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: NEUTRAL_BG }} edges={['top']}>
      {/* Header: branco, ícone restaurante verde, título centralizado */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: '#ffffff',
          borderBottomWidth: 1,
          borderBottomColor: NEUTRAL_BORDER,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="restaurant" size={28} color={PRIMARY} />
        </View>
        <Text
          style={{
            flex: 1,
            fontSize: 18,
            fontWeight: '700',
            lineHeight: 22,
            letterSpacing: -0.2,
            color: NEUTRAL_DARK,
            textAlign: 'center',
          }}
        >
          Gestão de Mesas
        </Text>
        <View style={{ width: 40, height: 40 }} />
      </View>
      <View className="flex items-center justify-center py-4">
        <Button
          text="Abrir Nova Comanda"
          size="medium"
          onPress={() => router.push('/new-order')}
        />
      </View>
      <TablesGrid />
    </SafeAreaView>
  )
}
