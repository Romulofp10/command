import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { VERDES } from 'theme/styles/colors'

const GARCONS = [
  { value: '', label: 'Escolha um profissional' },
  { value: 'giovanni', label: 'Giovanni Rossi' },
  { value: 'marco', label: 'Marco Silva' },
  { value: 'lucia', label: 'Lucia Bianchi' },
  { value: 'paulo', label: 'Paulo Souza' },
] as const

export default function LoginScreen() {
  const insets = useSafeAreaInsets()
  const [garcom, setGarcom] = useState('')
  const [pin, setPin] = useState('')
  const [selectOpen, setSelectOpen] = useState(false)

  const garcomLabel = GARCONS.find((g) => g.value === garcom)?.label ?? GARCONS[0].label

  const gradientBg = [VERDES.backgroundStart, VERDES.backgroundEnd] as [string, string]
  const btnGradient = [VERDES.primary, VERDES.primaryDark] as [string, string]

  return (
    <LinearGradient
      colors={gradientBg}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            maxWidth: 480,
            width: '100%',
            alignSelf: 'center',
            paddingHorizontal: 24,
            paddingTop: insets.top + 48,
            paddingBottom: insets.bottom + 24,
          }}
        >
          <View className="mb-12 items-center">
            <View
              className="mb-2 h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: `${VERDES.primary}33` }}
            >
              <Text className="text-3xl">🍴</Text>
            </View>
            <Text className="text-center text-3xl font-bold tracking-tight" style={{ color: '#fff' }}>
              Bella Italia
            </Text>
          </View>

          <View className="mb-8">
            <Text className="text-center text-[28px] font-bold leading-tight" style={{ color: '#fff' }}>
              Login do Garçom
            </Text>
            <Text className="mt-2 text-center text-sm" style={{ color: VERDES.textMuted }}>
              Acesse o sistema para gerenciar seus pedidos
            </Text>
          </View>

          <View className="flex-1 gap-6">
            <View className="gap-2">
              <Text className="pb-2 text-base font-medium leading-normal" style={{ color: VERDES.textMuted }}>
                Selecione seu nome
              </Text>
              <Pressable
                onPress={() => setSelectOpen(true)}
                style={{
                  height: 56,
                  borderWidth: 1,
                  borderColor: `${VERDES.primary}4D`,
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 16,
                }}
              >
                <Text style={{ color: garcom ? '#fff' : VERDES.placeholder, fontSize: 16 }}>
                  {garcomLabel}
                </Text>
                <Text style={{ color: VERDES.textMuted, fontSize: 16 }}>▼</Text>
              </Pressable>
            </View>

            <View className="gap-2">
              <Text className="pb-2 text-base font-medium leading-normal" style={{ color: VERDES.textMuted }}>
                PIN de Acesso
              </Text>
              <TextInput
                value={pin}
                onChangeText={setPin}
                placeholder="0000"
                placeholderTextColor={VERDES.placeholder}
                maxLength={4}
                keyboardType="number-pad"
                secureTextEntry
                style={{
                  height: 56,
                  borderWidth: 1,
                  borderColor: `${VERDES.primary}4D`,
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  fontSize: 20,
                  fontWeight: '700',
                  letterSpacing: 8,
                  color: '#ffffff',
                  textAlign: 'center',
                }}
              />
            </View>

            <View className="pt-6">
              <Pressable
                className="overflow-hidden rounded-full shadow-lg active:opacity-90"
                style={{ height: 56 }}
                onPress={() => router.push('/(authenticated)')}
              >
                <LinearGradient
                  colors={btnGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                >
                  <Text className="text-lg font-bold tracking-wide text-white">
                    Entrar
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>

            <Pressable className="mt-4 items-center">
              <Text className="text-sm font-medium" style={{ color: VERDES.link }}>
                Esqueceu seu código PIN?
              </Text>
            </Pressable>
          </View>

          <View className="mt-auto flex flex-col items-center pt-10 opacity-40">
            <View
              className="mb-2 h-1 w-16 rounded-full"
              style={{ backgroundColor: `${VERDES.borderGreen}80` }}
            />
            <Text className="text-[10px] uppercase tracking-widest" style={{ color: VERDES.footer }}>
              v1.0.0 • Grove System
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>

      <Modal
        visible={selectOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectOpen(false)}
      >
        <Pressable
          className="flex-1 justify-end bg-black/50"
          onPress={() => setSelectOpen(false)}
        >
          <Pressable className="max-h-[70%]" onPress={(e) => e.stopPropagation()}>
            <LinearGradient
              colors={gradientBg}
              style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingBottom: insets.bottom + 16 }}
            >
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: `${VERDES.primary}4D`,
                  paddingVertical: 12,
                }}
              >
                <Text className="text-center text-lg font-semibold" style={{ color: '#fff' }}>
                  Selecione seu nome
                </Text>
              </View>
              <ScrollView className="max-h-72 px-4 pt-2">
                {GARCONS.filter((g) => g.value).map((item) => (
                  <Pressable
                    key={item.value}
                    onPress={() => {
                      setGarcom(item.value)
                      setSelectOpen(false)
                    }}
                    className="py-4 active:opacity-70"
                  >
                    <Text className="text-base" style={{ color: '#fff' }}>{item.label}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </LinearGradient>
          </Pressable>
        </Pressable>
      </Modal>
    </LinearGradient>
  )
}
