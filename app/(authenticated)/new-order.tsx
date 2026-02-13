import { Button } from 'components/Button'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useState } from 'react'
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

/** Cores do padrão (alinhado ao index e theme) */
const PRIMARY = '#22c55e'
const NEUTRAL_BG = '#f9fafb'
const NEUTRAL_BORDER = '#e5e7eb'
const NEUTRAL_DARK = '#1f2937'
const SLATE_500 = '#64748b'
const SLATE_400 = '#94a3b8'
const SLATE_300 = '#cbd5e1'
const SLATE_700 = '#334155'
const SLATE_100 = '#f1f5f9'
const SCREEN_BG = '#F2F2F7'

const MAX_PESSOAS = 20

const MESAS_OPCOES = [
  { value: '', label: 'Selecionar Mesa' },
  { value: 'm1', label: 'Mesa 01 - Salão Principal' },
  { value: 'm2', label: 'Mesa 02 - Salão Principal' },
  { value: 'm3', label: 'Mesa 03 - Terraço' },
  { value: 'm4', label: 'Mesa 04 - Terraço' },
  { value: 'm5', label: 'Mesa 05 - VIP' },
  { value: 'm6', label: 'Balcão 01' },
]

export default function NewOrderScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [mesa, setMesa] = useState('')
  const [cliente, setCliente] = useState('')
  const [pessoas, setPessoas] = useState(2)
  const [mesaModalVisible, setMesaModalVisible] = useState(false)

  const mesaLabel = MESAS_OPCOES.find((o) => o.value === mesa)?.label ?? 'Selecionar Mesa'

  return (
    <View style={{ flex: 1, backgroundColor: SCREEN_BG }}>
      {/* Header */}
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#ffffff' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            height: 56,
            borderBottomWidth: 1,
            borderBottomColor: NEUTRAL_BORDER,
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
          >
            <Ionicons name="chevron-back" size={24} color={PRIMARY} />
            <Text style={{ fontSize: 16, fontWeight: '500', color: PRIMARY }}>Voltar</Text>
          </Pressable>
          <Text
            style={{
              flex: 1,
              fontSize: 18,
              fontWeight: '600',
              color: NEUTRAL_DARK,
              textAlign: 'center',
            }}
          >
            Nova Comanda
          </Text>
          <View style={{ width: 72, alignItems: 'flex-end' }}>
            <Pressable
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: SLATE_100,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="help-circle-outline" size={22} color={SLATE_400} />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 24,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Mesa / Localização */}
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: '700',
              letterSpacing: 0.5,
              color: SLATE_500,
              marginLeft: 4,
              marginBottom: 8,
              textTransform: 'uppercase',
            }}
          >
            Mesa / Localização
          </Text>
          <Pressable
            onPress={() => setMesaModalVisible(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 56,
              backgroundColor: '#ffffff',
              borderRadius: 16,
              paddingLeft: 48,
              paddingRight: 40,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <View
              style={{
                position: 'absolute',
                left: 16,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="restaurant-outline" size={22} color={SLATE_400} />
            </View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                fontWeight: '500',
                color: mesa ? NEUTRAL_DARK : SLATE_300,
              }}
              numberOfLines={1}
            >
              {mesaLabel}
            </Text>
            <Ionicons name="chevron-down" size={20} color={SLATE_400} />
          </Pressable>
        </View>

        {/* Identificação do Cliente */}
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: '700',
              letterSpacing: 0.5,
              color: SLATE_500,
              marginLeft: 4,
              marginBottom: 8,
              textTransform: 'uppercase',
            }}
          >
            Identificação do Cliente
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 56,
              backgroundColor: '#ffffff',
              borderRadius: 16,
              paddingLeft: 48,
              paddingRight: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <View
              style={{
                position: 'absolute',
                left: 16,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="person-outline" size={22} color={SLATE_400} />
            </View>
            <TextInput
              value={cliente}
              onChangeText={setCliente}
              placeholder="Nome ou número da comanda"
              placeholderTextColor={SLATE_300}
              style={{
                flex: 1,
                fontSize: 16,
                fontWeight: '500',
                color: NEUTRAL_DARK,
                paddingVertical: 0,
              }}
            />
          </View>
        </View>

        {/* Quantidade de Pessoas */}
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: '700',
              letterSpacing: 0.5,
              color: SLATE_500,
              marginLeft: 4,
              marginBottom: 8,
              textTransform: 'uppercase',
            }}
          >
            Quantidade de Pessoas
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#ffffff',
              borderRadius: 16,
              padding: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.04,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <Pressable
              onPress={() => setPessoas((p) => Math.max(1, p - 1))}
              style={({ pressed }) => ({
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: SLATE_100,
                borderWidth: 1,
                borderColor: SLATE_100,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Ionicons name="remove" size={22} color={SLATE_400} />
            </Pressable>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
              {(() => {
                const left = Math.max(1, pessoas - 1)
                const right = Math.min(MAX_PESSOAS, pessoas + 1)
                const numeros = Array.from({ length: right - left + 1 }, (_, i) => left + i)
                return numeros.map((n) => (
                  <Pressable
                    key={n}
                    onPress={() => setPessoas(n)}
                    style={{ alignItems: 'center' }}
                  >
                    <Text
                      style={{
                        fontSize: n === pessoas ? 28 : 18,
                        fontWeight: n === pessoas ? '700' : '500',
                        color: n === pessoas ? NEUTRAL_DARK : SLATE_300,
                      }}
                    >
                      {n}
                    </Text>
                    {n === pessoas && (
                      <View
                        style={{
                          width: 16,
                          height: 4,
                          backgroundColor: PRIMARY,
                          borderRadius: 2,
                          marginTop: 4,
                        }}
                      />
                    )}
                  </Pressable>
                ))
              })()}
            </View>
            <Pressable
              onPress={() => setPessoas((p) => Math.min(MAX_PESSOAS, p + 1))}
              style={({ pressed }) => ({
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: SLATE_100,
                borderWidth: 1,
                borderColor: SLATE_100,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Ionicons name="add" size={22} color={PRIMARY} />
            </Pressable>
          </View>
          <Text
            style={{
              fontSize: 11,
              color: SLATE_400,
              fontWeight: '500',
              fontStyle: 'italic',
              textAlign: 'center',
              marginTop: 8,
            }}
          >
            Obrigatório para controle de taxa de serviço
          </Text>
        </View>

        {/* Card Verificação Automática */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 16,
            backgroundColor: '#ffffff',
            borderWidth: 1,
            borderColor: SLATE_100,
            borderRadius: 16,
            padding: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.04,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: SLATE_100,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="information-circle-outline" size={24} color={SLATE_400} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: SLATE_700,
              }}
            >
              Verificação Automática
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: SLATE_500,
                marginTop: 4,
                lineHeight: 18,
              }}
            >
              Após abrir, o catálogo será carregado para você adicionar os primeiros itens do
              pedido.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer com Button */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: insets.bottom + 16,
          backgroundColor: SCREEN_BG,
          borderTopWidth: 1,
          borderTopColor: NEUTRAL_BORDER,
        }}
      >
        <Button
          text="Abrir Comanda e Iniciar"
          size="big"
          onPress={() => {}}
          style={{ width: '100%', minWidth: undefined, borderRadius: 16, height: 64 }}
        />
        <View
          style={{
            width: 128,
            height: 6,
            borderRadius: 3,
            backgroundColor: SLATE_300,
            opacity: 0.5,
            alignSelf: 'center',
            marginTop: 24,
          }}
        />
      </View>

      {/* Modal seleção de mesa */}
      <Modal
        visible={mesaModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMesaModalVisible(false)}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'flex-end',
          }}
          onPress={() => setMesaModalVisible(false)}
        >
          <Pressable
            style={{
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingBottom: insets.bottom + 16,
              maxHeight: '70%',
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <View
              style={{
                width: 40,
                height: 4,
                borderRadius: 2,
                backgroundColor: SLATE_300,
                alignSelf: 'center',
                marginTop: 12,
                marginBottom: 8,
              }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: NEUTRAL_DARK,
                textAlign: 'center',
                marginBottom: 16,
              }}
            >
              Selecionar Mesa
            </Text>
            <ScrollView style={{ maxHeight: 320 }}>
              {MESAS_OPCOES.map((opt) => (
                <Pressable
                  key={opt.value || 'empty'}
                  onPress={() => {
                    setMesa(opt.value)
                    setMesaModalVisible(false)
                  }}
                  style={{
                    paddingVertical: 14,
                    paddingHorizontal: 20,
                    backgroundColor: mesa === opt.value ? SLATE_100 : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: mesa === opt.value ? '600' : '400',
                      color: opt.value ? NEUTRAL_DARK : SLATE_400,
                    }}
                  >
                    {opt.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  )
}
