import { Button } from 'components/Button'
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
  useWindowDimensions,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const GRID_PADDING = 16
const GRID_GAP = 16
const NUM_COLUMNS = 2

const GREEN_ACCENT = '#22c55e'
const BG_DARK = '#181311'
const BORDER_DARK = '#392e28'
const MUTED = '#b9a69d'

const CATEGORIAS = [
  {
    id: 'pizzas',
    nome: 'Pizzas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5y_-5m0bVUFxe_1irb7r_VJoqt_6RkSRUykMLxwCHxHTT826yJcjR7W15b0mRVrMCOvZ161QEu-EIZR3K4GDNCuHZirZ_WXAYq6U2DSUHBaGp7Mhgcv8-u2EIwKIeDYHonFLat1aOTTQemKDqJB_xkJ6x2z7c7cH162cEmkHZ0a_FA_IF4BClOA9dg8Q_NrI_1Q9HzrcoXXNsdK1wWrxDNgtZQwZlyEe90XreAcaT3KcpxjOkwvU5kiDEPsC4CdtWVX1cB5Jg1eo',
  },
  {
    id: 'bebidas',
    nome: 'Bebidas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwcSL4egX4DbqoXrXlEkKaSAXyq-IIUz6P-LpteP-uq0FMG3DcEOkpuGS0QiRatDxkDA54enuu8rZnAv57GSNfK5r1Osy0Xc5d42CzQF_n975FAwkz7_hYOhchtzpu-o4H3E-ZJvcYCV7ea9dQJRLIkbdvGC-GJAylo6YGnOTNyozivvDl23K668-KZCIdAR9ZQVz2sZlQW3Wg6HKQwE96WLZNWsPSRM4HnW3BqQNeRkXnMznfhp5XsT8opM1PDXxs9oZHXlnOYeM',
  },
  {
    id: 'entradas',
    nome: 'Entradas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjQaqlnYAql6vUG3-wz9TYJ9QsJZ99pjFqroJf6rDLAw5uceK8g6GWXK_igZafpreavvWjrJmN0aFSXR8UzlYJsrF3Le5W9cxr3LkGvcg9lzfe_r-ImcCy4SS3lnB1kKO_lIhgj12sKwWyEkgtH7yuV78VY-l_RzSSmIXdAWbWXdWqNIItZRVMQ73Pc9dqmM9cAiR_pjwdOTudIu1XBZaXn-0-viRbDzUI7SfoTCnLKx6S9F4q4i5ZUzWznd6VXAY0g9tDdPAF2FE',
  },
  {
    id: 'sobremesas',
    nome: 'Sobremesas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcVdH6HlWHsQZCppDhSgd-5RVa7al5mhOdMDqKtE62dLuk_4boZDZpgHvud6tZlsulBhaEKAP2xoiQDJvTET5IIJwGY_ouM8SYX_n3atqHRhfl8b2qmEyt0K7DDi9WWkQcR2t6R_72S9KPtM8FDOYU80KCt_MtmXAzOzx9VNNKFFmmRmirNhrUeTX-MGiD2ObsuOGa2higBTco7qNj13UsDwXwi-WNFSnMElQ2L-L91NkGfwq1NX8ahwyQjKG_lFwO_xXVyLa58vM',
  },
  {
    id: 'vinhos',
    nome: 'Vinhos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVkqcqHNROkqwp3y08ZbSymCXQPba4L1wYgelsBUWj_xIYA_oJXnzaaE1AQiJQrR43REECj8hSurdJcvB5g2vyD3Ca7qsms7hPA-uvIacjtMvkxZ6JtPVqWftPyxLoLwoJP4-SxKpXrCRsaAsKRJlSA0erO4q6WPtWVmyYq9gHiXq9HA5ITOTrBNT8ai_T3ks4Ip037zXj9F2ElQLN_ke61M8dNJFouSt6CLG8auOeONKqG52cyQ8YF1elDC_OATltwkqU_X3Zhl8',
  },
  {
    id: 'pratos',
    nome: 'Pratos Principais',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOxcEXt9UY-u-ZD9vxNGjfkvg3qBuJ8N7g8oxxEa-5VBoXz59OzH3SN7cgFw0LvaXML7iZ2OaYtNWkQEze2kYbCCqJUTWQa-W7pcQdY0Ih93vm_fAJxlgSpr42eE9yHKR-lK8Mp1UFiL-3AmK8d2agZMVGuSZa2CVSmVqSCg5Pj2pc5W_pKdqHqKegcQQoGZQJI8VKvHUTWDru-aB0dgMARzDJ9fuQI5_R4WjZBnPKKBOwEQvruldishUePMk6e1osnHf0dEBh-GY',
  },
]

export default function MenuScreen() {
  const { width } = useWindowDimensions()
  const { mesa, comanda, nova } = useLocalSearchParams<{
    mesa?: string
    comanda?: string
    nova?: string
  }>()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [itensCarrinho] = useState(3) // mock

  // Grid 2 colunas, tamanhos iguais: cada card = quadrado
  const cardSize =
    (width - GRID_PADDING * 2 - GRID_GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS

  const mesaLabel = mesa ? `Mesa ${mesa.padStart(2, '0')}` : 'Mesa'
  const garcomLabel = 'Garçom: Roberto'

  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 8,
            paddingBottom: 12,
            paddingHorizontal: 16,
          },
        ]}
      >
        <Pressable onPress={() => router.back()} style={styles.headerBtn}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Comanda #{comanda ?? '—'}</Text>
          <Text style={styles.headerSubtitle}>
            {mesaLabel.toUpperCase()} • {garcomLabel.toUpperCase()}
          </Text>
        </View>
      
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Adicionando à Comanda</Text>
          <Text style={styles.sectionSubtitle}>
            Selecione uma categoria para ver os itens
          </Text>
        </View>

        <View style={[styles.grid, { padding: GRID_PADDING, gap: GRID_GAP }]}>
          {CATEGORIAS.map((cat) => (
            <Pressable
              key={cat.id}
              style={({ pressed }) => [
                styles.cardWrap,
                { width: cardSize, height: cardSize },
                pressed && { opacity: 0.9 },
              ]}
              onPress={() => {}}
            >
              <ImageBackground
                source={{ uri: cat.image }}
                style={styles.cardImage}
                imageStyle={styles.cardImageInner}
              >
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.85)']}
                  style={[StyleSheet.absoluteFillObject, { borderRadius: 12 }]}
                />
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {cat.nome}
                </Text>
              </ImageBackground>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* FAB Revisar Pedido — usa Button com padrão verde */}
      <View
        style={[
          styles.fabWrap,
          {
            paddingBottom: insets.bottom + 24,
          },
        ]}
      >
        <Button
          text={`Revisar Pedido (${itensCarrinho})`}
          size="medium"
          onPress={() => {}}
          style={styles.fabButton}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_DARK,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BG_DARK,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_DARK,
  },
  headerBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    color: GREEN_ACCENT,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  scroll: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: MUTED,
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardWrap: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  cardImage: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  cardImageInner: {
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.2,
  },
  fabWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
  fabButton: {
    borderRadius: 28,
    minWidth: undefined,
    paddingHorizontal: 24,
    height: 56,
  },
})
