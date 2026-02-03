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
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Ícone do estabelecimento: círculo bege com borda verde + ícone padrão */}
        <View
          style={{
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            borderRadius: CIRCLE_SIZE / 2,
            backgroundColor: '#DEAC76',
            borderWidth: 2,
            borderColor: VERDES.backgroundStart,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="restaurant" size={ESTABLISHMENT_ICON_SIZE} color="#fff" />
        </View>

        {/* Título e unidade */}
        <View style={{ flex: 1, marginLeft: 12, marginRight: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }} numberOfLines={1}>
            {Information.title}
          </Text>
          <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 2 }} numberOfLines={1}>
            {Information.unit}
          </Text>
        </View>

        {/* Ícone de notificação: sino em círculo verde */}
        <Pressable
          style={({ pressed }) => ({
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            borderRadius: CIRCLE_SIZE / 2,
            backgroundColor: '#449074',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.8 : 1,
          })}
        >
       <View className='flex-col'>
       <Ionicons name="notifications" size={NOTIFICATION_ICON_SIZE} color="#fff" />
       </View>
        </Pressable>
      </View>
    </LinearGradient>
  )
}
