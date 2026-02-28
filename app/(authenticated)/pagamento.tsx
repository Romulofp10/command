import Ionicons from '@expo/vector-icons/Ionicons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ICON_ON_DARK } from 'theme/styles/colors'

type FormaPagamento = 'dinheiro' | 'credito' | 'debito' | 'pix'

const FORMAS: { id: FormaPagamento; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'dinheiro', label: 'Dinheiro', icon: 'wallet' },
  { id: 'credito', label: 'Cartão de Crédito', icon: 'card' },
  { id: 'debito', label: 'Cartão de Débito', icon: 'card' },
  { id: 'pix', label: 'PIX', icon: 'qr-code' },
]

function formatPrice(value: number) {
  return `R$ ${value.toFixed(2).replace('.', ',')}`
}

const TOTAL_MOCK = 245.9
const TAXA_PERCENT = 10

export default function PagamentoScreen() {
  const { mesa, comanda } = useLocalSearchParams<{ mesa?: string; comanda?: string }>()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [forma, setForma] = useState<FormaPagamento>('dinheiro')
  const [valorRecebido, setValorRecebido] = useState('250')

  const valorNum = parseFloat(valorRecebido.replace(',', '.')) || 0
  const troco = valorNum - TOTAL_MOCK

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
          <Text className="text-[11px] font-medium text-green-medium mt-0.5 uppercase">
            Atendimento Ativo
          </Text>
        </View>
        <Text className="text-base font-bold text-white">#{comanda ?? '—'}</Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Total da Comanda */}
        <View className="mb-6">
          <Text className="text-xs font-bold text-muted uppercase mb-2">
            Total da Comanda
          </Text>
          <Text className="text-3xl font-bold text-white">{formatPrice(TOTAL_MOCK)}</Text>
          <View className="flex-row gap-2 mt-2">
            <View className="rounded-lg bg-card-dark px-2 py-1">
              <Text className="text-xs font-medium text-green-medium">4 Itens</Text>
            </View>
            <View className="rounded-lg bg-card-dark px-2 py-1">
              <Text className="text-xs font-medium text-white">
                Taxa {TAXA_PERCENT}% Inclusa
              </Text>
            </View>
          </View>
        </View>

        {/* Forma de Pagamento */}
        <Text className="text-sm font-bold text-white mb-3">Forma de Pagamento</Text>
        {FORMAS.map((f) => (
          <Pressable
            key={f.id}
            onPress={() => setForma(f.id)}
            className="flex-row items-center gap-3 py-4 px-4 mb-2 rounded-xl bg-card-dark active:opacity-90"
          >
            <View
              className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                forma === f.id ? 'border-green-medium bg-green-medium' : 'border-muted'
              }`}
            >
              {forma === f.id && <View className="w-2 h-2 rounded-full bg-white" />}
            </View>
            <Ionicons
              name={f.icon}
              size={22}
              color={forma === f.id ? '#22c55e' : ICON_ON_DARK}
            />
            <Text className={`text-base font-medium ${forma === f.id ? 'text-white' : 'text-muted'}`}>
              {f.label}
            </Text>
          </Pressable>
        ))}

        {/* Valor Recebido (quando Dinheiro) */}
        {forma === 'dinheiro' && (
          <View className="mt-4 p-4 rounded-xl bg-card-dark">
            <Text className="text-xs font-bold text-muted uppercase mb-2">
              Valor Recebido
            </Text>
            <TextInput
              value={valorRecebido}
              onChangeText={setValorRecebido}
              placeholder="0,00"
              placeholderTextColor={ICON_ON_DARK}
              keyboardType="decimal-pad"
              className="text-xl font-bold text-white py-2"
            />
            {troco >= 0 && (
              <View className="mt-2 pt-2 border-t border-border-dark">
                <Text className="text-sm text-muted">Troco a devolver:</Text>
                <Text className="text-lg font-bold text-green-medium">{formatPrice(troco)}</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Botão Finalizar */}
      <View
        className="absolute left-0 right-0 bottom-0 px-4 border-t border-border-dark bg-background-dark"
        style={{ paddingTop: 12, paddingBottom: insets.bottom + 12 }}
      >
        <Pressable
          onPress={() => {}}
          className="flex-row items-center justify-center gap-2 py-4 rounded-xl bg-green-medium active:opacity-90"
        >
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
          <Text className="text-base font-bold text-white">
            Finalizar e Fechar Mesa
          </Text>
        </Pressable>
        <View className="flex-row items-center justify-center gap-2 mt-3">
          <Ionicons name="lock-closed" size={14} color={ICON_ON_DARK} />
          <Text className="text-xs text-muted">Processamento Seguro</Text>
        </View>
      </View>
    </View>
  )
}
