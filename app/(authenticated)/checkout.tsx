import Ionicons from '@expo/vector-icons/Ionicons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ICON_ON_DARK } from 'theme/styles/colors'

/** Mock: itens do carrinho */
const ITENS_MOCK = [
  { id: '1', nome: 'Pizza Margherita', qty: 1, preco: 45, obs: 'Sem cebola, bem assada', imagem: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=80' },
  { id: '2', nome: 'Coca-Cola 350ml', qty: 2, preco: 8, obs: 'Com gelo e limão', imagem: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=80' },
  { id: '3', nome: 'Batata Frita G', qty: 1, preco: 22, obs: 'Acompanha maionese da casa', imagem: 'https://images.unsplash.com/photo-1573089892796-17322d2a3c78?w=80' },
]

function formatPrice(value: number) {
  return `R$ ${value.toFixed(2).replace('.', ',')}`
}

export default function CheckoutScreen() {
  const { mesa, comanda } = useLocalSearchParams<{ mesa?: string; comanda?: string }>()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [observacao, setObservacao] = useState('')

  const subtotal = ITENS_MOCK.reduce((acc, i) => acc + i.preco * i.qty, 0)
  const total = subtotal

  return (
    <View className="flex-1 bg-background-dark">
      {/* Header */}
      <View
        className="flex-row items-center border-b border-border-dark"
        style={{
          paddingTop: insets.top + 8,
          paddingBottom: 12,
          paddingHorizontal: 16,
        }}
      >
        <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <Ionicons name="arrow-back" size={24} color={ICON_ON_DARK} />
        </Pressable>
        <View className="flex-1 items-center">
          <Text className="text-lg font-bold text-white">
            {mesa ? `Mesa ${String(mesa).padStart(2, '0')}` : 'Mesa'}
          </Text>
          <Text className="text-[11px] font-medium text-green-medium mt-0.5">
            Comanda #{comanda ?? '—'}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Ionicons name="person" size={18} color={ICON_ON_DARK} />
          <Text className="text-xs font-medium text-muted">Garçom: Ricardo</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Itens Selecionados */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-base font-bold text-white">Itens Selecionados</Text>
          <View className="rounded-lg bg-green-medium px-3 py-1">
            <Text className="text-xs font-bold text-white">{ITENS_MOCK.length} ITENS</Text>
          </View>
        </View>

        {ITENS_MOCK.map((item) => (
          <View
            key={item.id}
            className="flex-row items-center gap-3 py-3 mb-3 rounded-xl bg-card-dark px-4"
          >
            <Image
              source={{ uri: item.imagem }}
              className="w-14 h-14 rounded-full bg-border-dark"
              resizeMode="cover"
            />
            <View className="flex-1 min-w-0">
              <Text className="text-base font-bold text-white" numberOfLines={1}>
                {item.nome}
              </Text>
              <Text className="text-sm font-medium text-green-medium">
                {item.qty}x - {formatPrice(item.preco * item.qty)}
              </Text>
              {item.obs && (
                <Text className="text-xs text-muted mt-0.5" numberOfLines={2}>
                  {item.obs}
                </Text>
              )}
            </View>
            <Pressable className="w-10 h-10 items-center justify-center active:opacity-70">
              <Ionicons name="trash-outline" size={22} color={ICON_ON_DARK} />
            </Pressable>
          </View>
        ))}

        {/* Resumo de Valores */}
        <View className="mt-6 mb-4">
          <Text className="text-sm font-bold text-white uppercase mb-3">
            Resumo de Valores
          </Text>
          <View className="flex-row justify-between py-2">
            <Text className="text-base text-white">Subtotal</Text>
            <Text className="text-base text-white">{formatPrice(subtotal)}</Text>
          </View>
          <View className="flex-row justify-between py-2 border-t border-border-dark">
            <Text className="text-base font-bold text-white">Total do Pedido</Text>
            <Text className="text-base font-bold text-green-medium">{formatPrice(total)}</Text>
          </View>
        </View>

        {/* Observação Geral */}
        <View className="mb-4">
          <Text className="text-sm font-bold text-white mb-2">Observação Geral</Text>
          <TextInput
            value={observacao}
            onChangeText={setObservacao}
            placeholder="Ex: Cliente com pressa, trazer bebidas primeiro..."
            placeholderTextColor={ICON_ON_DARK}
            className="rounded-xl bg-card-dark px-4 py-3 text-base text-white"
            style={{ opacity: 0.9 }}
            multiline
            numberOfLines={3}
          />
        </View>
      </ScrollView>

      {/* Barra inferior */}
      <View
        className="absolute left-0 right-0 bottom-0 flex-row gap-3 px-4 border-t border-border-dark bg-background-dark"
        style={{ paddingTop: 12, paddingBottom: insets.bottom + 12 }}
      >
        <Pressable
          onPress={() => {}}
          className="flex-1 flex-row items-center justify-center gap-2 py-4 rounded-xl bg-green-medium active:opacity-90"
        >
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
          <Text className="text-base font-bold text-white">
            Confirmar e Enviar para Cozinha
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push({ pathname: '/pagamento', params: { mesa, comanda } })}
          className="w-14 h-14 rounded-xl bg-card-dark items-center justify-center active:opacity-80"
        >
          <Ionicons name="cart" size={24} color={ICON_ON_DARK} />
        </Pressable>
      </View>
    </View>
  )
}
