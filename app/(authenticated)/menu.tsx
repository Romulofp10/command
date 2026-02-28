import Ionicons from '@expo/vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ImageBackground,
  StyleSheet,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ICON_ON_DARK } from 'theme/styles/colors'

const CATEGORIAS = [
  { id: 'pizzas', nome: 'Pizzas', quantidade: 12, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5y_-5m0bVUFxe_1irb7r_VJoqt_6RkSRUykMLxwCHxHTT826yJcjR7W15b0mRVrMCOvZ161QEu-EIZR3K4GDNCuHZirZ_WXAYq6U2DSUHBaGp7Mhgcv8-u2EIwKIeDYHonFLat1aOTTQemKDqJB_xkJ6x2z7c7cH162cEmkHZ0a_FA_IF4BClOA9dg8Q_NrI_1Q9HzrcoXXNsdK1wWrxDNgtZQwZlyEe90XreAcaT3KcpxjOkwvU5kiDEPsC4CdtWVX1cB5Jg1eo' },
  { id: 'bebidas', nome: 'Bebidas', quantidade: 28, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwcSL4egX4DbqoXrXlEkKaSAXyq-IIUz6P-LpteP-uq0FMG3DcEOkpuGS0QiRatDxkDA54enuu8rZnAv57GSNfK5r1Osy0Xc5d42CzQF_n975FAwkz7_hYOhchtzpu-o4H3E-ZJvcYCV7ea9dQJRLIkbdvGC-GJAylo6YGnOTNyozivvDl23K668-KZCIdAR9ZQVz2sZlQW3Wg6HKQwE96WLZNWsPSRM4HnW3BqQNeRkXnMznfhp5XsT8opM1PDXxs9oZHXlnOYeM' },
  { id: 'entradas', nome: 'Entradas', quantidade: 8, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjQaqlnYAql6vUG3-wz9TYJ9QsJZ99pjFqroJf6rDLAw5uceK8g6GWXK_igZafpreavvWjrJmN0aFSXR8UzlYJsrF3Le5W9cxr3LkGvcg9lzfe_r-ImcCy4SS3lnB1kKO_lIhgj12sKwWyEkgtH7yuV78VY-l_RzSSmIXdAWbWXdWqNIItZRVMQ73Pc9dqmM9cAiR_pjwdOTudIu1XBZaXn-0-viRbDzUI7SfoTCnLKx6S9F4q4i5ZUzWznd6VXAY0g9tDdPAF2FE' },
  { id: 'sobremesas', nome: 'Sobremesas', quantidade: 14, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcVdH6HlWHsQZCppDhSgd-5RVa7al5mhOdMDqKtE62dLuk_4boZDZpgHvud6tZlsulBhaEKAP2xoiQDJvTET5IIJwGY_ouM8SYX_n3atqHRhfl8b2qmEyt0K7DDi9WWkQcR2t6R_72S9KPtM8FDOYU80KCt_MtmXAzOzx9VNNKFFmmRmirNhrUeTX-MGiD2ObsuOGa2higBTco7qNj13UsDwXwi-WNFSnMElQ2L-L91NkGfwq1NX8ahwyQjKG_lFwO_xXVyLa58vM' },
  { id: 'vinhos', nome: 'Vinhos', quantidade: 22, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVkqcqHNROkqwp3y08ZbSymCXQPba4L1wYgelsBUWj_xIYA_oJXnzaaE1AQiJQrR43REECj8hSurdJcvB5g2vyD3Ca7qsms7hPA-uvIacjtMvkxZ6JtPVqWftPyxLoLwoJP4-SxKpXrCRsaAsKRJlSA0erO4q6WPtWVmyYq9gHiXq9HA5ITOTrBNT8ai_T3ks4Ip037zXj9F2ElQLN_ke61M8dNJFouSt6CLG8auOeONKqG52cyQ8YF1elDC_OATltwkqU_X3Zhl8' },
  { id: 'pratos', nome: 'Pratos Principais', quantidade: 18, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOxcEXt9UY-u-ZD9vxNGjfkvg3qBuJ8N7g8oxxEa-5VBoXz59OzH3SN7cgFw0LvaXML7iZ2OaYtNWkQEze2kYbCCqJUTWQa-W7pcQdY0Ih93vm_fAJxlgSpr42eE9yHKR-lK8Mp1UFiL-3AmK8d2agZMVGuSZa2CVSmVqSCg5Pj2pc5W_pKdqHqKegcQQoGZQJI8VKvHUTWDru-aB0dgMARzDJ9fuQI5_R4WjZBnPKKBOwEQvruldishUePMk6e1osnHf0dEBh-GY' },
]

export default function MenuScreen() {
  const { mesa, comanda } = useLocalSearchParams<{
    mesa?: string
    comanda?: string
    nova?: string
  }>()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [itensCarrinho] = useState(3) // mock

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
          <Ionicons name="chevron-back" size={24} color={ICON_ON_DARK} />
        </Pressable>
        <View className="flex-1 items-center">
          <Text className="text-lg font-bold text-white">Comanda #{comanda ?? '—'}</Text>
          <Text className="text-[11px] font-medium text-green-medium mt-0.5 tracking-wide uppercase">
            {mesa ? `Mesa ${mesa.padStart(2, '0')}` : 'Mesa'} • Garçom: Roberto
          </Text>
        </View>
        <Pressable className="w-10 h-10 items-center justify-center">
          <Ionicons name="search" size={22} color={ICON_ON_DARK} />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4 pt-6 pb-2">
          <Text className="text-xl font-bold text-white tracking-tight">
            Adicionando à Comanda
          </Text>
          <Text className="text-sm text-muted mt-1">
            Selecione uma categoria para ver os itens
          </Text>
        </View>

        {/* Grid 2 colunas — imagens quadradas, bordas arredondadas */}
        <View className="flex-row flex-wrap gap-4 px-4 pt-2">
          {CATEGORIAS.map((cat) => (
            <Pressable
              key={cat.id}
              className="w-[47%] aspect-square rounded-xl overflow-hidden active:opacity-90"
              onPress={() =>
                router.push({
                  pathname: `/categoria/${cat.id}`,
                  params: { mesa, comanda },
                })
              }
            >
              <ImageBackground
                source={{ uri: cat.image }}
                className="flex-1 justify-end p-4"
                imageStyle={{ borderRadius: 12 }}
              >
                <LinearGradient
                  colors={['transparent', 'transparent', 'rgba(0,0,0,0.75)']}
                  locations={[0, 0.55, 1]}
                  style={[StyleSheet.absoluteFillObject, { borderRadius: 12 }]}
                />
                <Text className="text-base font-bold text-white tracking-tight" numberOfLines={2}>
                  {cat.nome}
                </Text>
                <Text className="text-sm text-white/80 mt-0.5">
                  {cat.quantidade} itens disponíveis
                </Text>
              </ImageBackground>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* FAB Carrinho — botão redondo com ícone de sacola + badge */}
      <View
        className="absolute left-0 right-0 bottom-0 px-5 items-end"
        style={{ paddingBottom: insets.bottom + 24 }}
      >
        <Pressable
          onPress={() =>
            router.push({
              pathname: '/checkout',
              params: { mesa, comanda },
            })
          }
          className="w-14 h-14 rounded-full items-center justify-center bg-fab active:opacity-90"
          style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 8 }}
        >
          <Ionicons name="cart" size={26} color={ICON_ON_DARK} />
          {itensCarrinho > 0 && (
            <View className="absolute -top-1 -right-1 min-w-[20px] h-5 rounded-full bg-red-500 items-center justify-center px-1">
              <Text className="text-xs font-bold text-white">
                  {itensCarrinho > 99 ? '99+' : itensCarrinho}
              </Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  )
}
