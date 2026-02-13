import Ionicons from '@expo/vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'
import { Pressable, Text, View } from 'react-native'
import { VERDES } from 'theme/styles/colors'

const Information = {
  title: 'Restaurante Bella Italia',
  unit: 'Unidade 1',
}

const NOTIFICATION_ICON_SIZE = 22
const ESTABLISHMENT_ICON_SIZE = 24
const CIRCLE_SIZE = 40

export function TopBar() {
  return (
    <LinearGradient
      colors={[VERDES.backgroundStart, VERDES.backgroundEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ paddingVertical: 12, paddingHorizontal: 16 }}
    >
      <View className="flex-row items-center justify-between">
        {/* Ícone do estabelecimento: círculo (padrão verde + branco) */}
        <View
          className="w-10 h-10 rounded-full border-2 items-center justify-center bg-verdes-circle-logo border-verdes-bg-start"
          style={{ borderColor: VERDES.backgroundStart }}
        >
          <Ionicons name="restaurant" size={ESTABLISHMENT_ICON_SIZE} color="#fff" />
        </View>

        {/* Título e unidade */}
        <View className="flex-1 mx-3">
          <Text className="text-base font-bold text-white" numberOfLines={1}>
            {Information.title}
          </Text>
          <Text className="text-[13px] text-white/85 mt-0.5" numberOfLines={1}>
            {Information.unit}
          </Text>
        </View>

        {/* Botão notificação: verde padrão, branco no ícone */}
        <Pressable
          className="w-10 h-10 rounded-full items-center justify-center bg-verdes-circle-notification active:opacity-80"
        >
          <Ionicons name="notifications" size={NOTIFICATION_ICON_SIZE} color="#fff" />
        </Pressable>
      </View>
    </LinearGradient>
  )
}
