import Ionicons from '@expo/vector-icons/Ionicons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ProductCustomizeSheet } from 'components/ProductCustomizeSheet'
import type { Product } from 'types/product'
import { ICON_ON_DARK, ICON_MUTED, PRIMARY_ORANGE } from 'theme/styles/colors'

/** Mock: produtos por categoria */
const PRODUTOS_POR_CATEGORIA: Record<string, Product[]> = {
  pizzas: [
    {
      id: 'margherita',
      nome: 'Margherita',
      descricao: 'Molho de tomate, mussarela, manjericão fresco e azeite.',
      preco: 45.9,
      imagem: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200',
      customizavel: false,
    },
    {
      id: 'calabresa',
      nome: 'Calabresa Gourmet',
      descricao: 'Massa artesanal, molho de tomate, mussarela e calabresa selecionada.',
      preco: 42,
      imagem: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200',
      customizavel: true,
      customizacoes: [
        {
          id: 'borda',
          titulo: 'BORDA RECHEADA',
          tipo: 'single',
          obrigatorio: true,
          itens: [
            { id: 'sem', nome: 'Sem Borda', preco: 0 },
            { id: 'catupiry', nome: 'Borda de Catupiry', preco: 8 },
          ],
        },
        {
          id: 'extras',
          titulo: 'INGREDIENTES EXTRAS',
          tipo: 'multiple',
          itens: [
            { id: 'cebola', nome: 'Cebola Extra', preco: 2 },
            { id: 'azeitona', nome: 'Azeitonas Pretas', preco: 4.5 },
          ],
        },
      ],
    },
    {
      id: 'quatro-queijos',
      nome: 'Quatro Queijos',
      descricao: 'Mussarela, gorgonzola, parmesão e provolone.',
      preco: 52,
      imagem: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=200',
      customizavel: false,
    },
    {
      id: 'frango-catupiry',
      nome: 'Frango c/ Catupiry',
      descricao: 'Frango desfiado, catupiry cremoso e mussarela.',
      preco: 48,
      imagem: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=200',
      customizavel: true,
      customizacoes: [
        {
          id: 'borda',
          titulo: 'BORDA',
          tipo: 'single',
          obrigatorio: false,
          itens: [
            { id: 'sem', nome: 'Sem Borda', preco: 0 },
            { id: 'cheddar', nome: 'Borda Cheddar', preco: 6 },
          ],
        },
      ],
    },
  ],
  bebidas: [
    { id: 'refri', nome: 'Refrigerante', descricao: 'Lata 350ml.', preco: 6, customizavel: false },
    { id: 'suco', nome: 'Suco Natural', descricao: '500ml. Sabores: laranja, limão, maracujá.', preco: 12, customizavel: false },
  ],
  entradas: [
    { id: 'bruschetta', nome: 'Bruschetta', descricao: 'Pão, tomate, manjericão e azeite.', preco: 18, customizavel: false },
  ],
  sobremesas: [],
  vinhos: [],
  pratos: [],
}

function formatPrice(value: number) {
  return `R$ ${value.toFixed(2).replace('.', ',')}`
}

export default function CategoriaScreen() {
  const { id, mesa, comanda } = useLocalSearchParams<{
    id: string
    mesa?: string
    comanda?: string
  }>()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [busca, setBusca] = useState('')
  const [itensCarrinho, setItensCarrinho] = useState(3) // mock
  const [productToCustomize, setProductToCustomize] = useState<Product | null>(null)

  const produtos = PRODUTOS_POR_CATEGORIA[id] ?? []
  const filtered =
    busca.trim() === ''
      ? produtos
      : produtos.filter(
          (p) =>
            p.nome.toLowerCase().includes(busca.toLowerCase()) ||
            p.descricao.toLowerCase().includes(busca.toLowerCase())
        )

  const handleProductPress = useCallback((product: Product) => {
    if (product.customizavel) {
      setProductToCustomize(product)
    } else {
      // Adiciona direto (mock)
      setItensCarrinho((c) => c + 1)
    }
  }, [])

  const handleAddFromSheet = useCallback(() => {
    setItensCarrinho((c) => c + 1)
  }, [])

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
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </Text>
          <Text className="text-[11px] font-medium text-primary mt-0.5">Lista de Produtos</Text>
        </View>
        <Pressable
          onPress={() =>
            router.push({
              pathname: '/checkout',
              params: { mesa, comanda },
            })
          }
          className="relative w-10 h-10 items-center justify-center"
        >
          <Ionicons name="cart" size={24} color={ICON_ON_DARK} />
          {itensCarrinho > 0 && (
            <View className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-primary items-center justify-center">
              <Text className="text-[10px] font-bold text-white">{itensCarrinho}</Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* Busca */}
      <View className="px-4 py-3">
        <View className="flex-row items-center gap-2 rounded-xl bg-card-dark px-4 py-3">
          <Ionicons name="search" size={20} color={ICON_MUTED} />
          <TextInput
            value={busca}
            onChangeText={setBusca}
            placeholder="Buscar no cardápio..."
            placeholderTextColor={ICON_MUTED}
            className="flex-1 text-base text-white"
          />
        </View>
      </View>

      {/* Lista de produtos */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((product) => (
          <Pressable
            key={product.id}
            onPress={() => handleProductPress(product)}
            className="flex-row items-center gap-3 py-4 border-b border-border-dark active:opacity-90"
          >
            <Image
              source={{ uri: product.imagem ?? 'https://via.placeholder.com/80' }}
              className="w-20 h-20 rounded-lg bg-card-dark"
              resizeMode="cover"
            />
            <View className="flex-1 min-w-0">
              <Text className="text-base font-bold text-white" numberOfLines={2}>
                {product.nome}
              </Text>
              {product.customizacoes?.some((g) => g.obrigatorio) && (
                <Text className="text-xs font-bold text-red-500 mt-0.5">OBRIGATÓRIO</Text>
              )}
              {product.customizavel && (
                <View className="flex-row items-center gap-1 mt-1">
                  <Ionicons name="options" size={14} color={PRIMARY_ORANGE} />
                  <Text className="text-xs font-semibold text-primary">CUSTOMIZÁVEL</Text>
                </View>
              )}
              <Text className="text-sm text-muted mt-0.5" numberOfLines={2}>
                {product.descricao}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-base font-bold text-primary">{formatPrice(product.preco)}</Text>
              <Pressable
                onPress={() => handleProductPress(product)}
                className="mt-2 w-10 h-10 rounded-full bg-primary items-center justify-center active:opacity-90"
              >
                <Text className="text-white text-xl font-bold">+</Text>
              </Pressable>
            </View>
          </Pressable>
        ))}

        {filtered.length === 0 && (
          <Text className="text-muted text-center py-12">Nenhum produto encontrado</Text>
        )}
      </ScrollView>

      {/* FAB Footer: mesa, itens, Finalizar */}
      <View
        className="absolute left-0 right-0 bottom-0 flex-row items-center justify-between px-4 border-t border-border-dark bg-background-dark"
        style={{ paddingTop: 12, paddingBottom: insets.bottom + 12 }}
      >
        <View>
          <Text className="text-sm text-muted">
            {mesa ? `Mesa ${String(mesa).padStart(2, '0')}` : 'Mesa'}
          </Text>
          <Text className="text-base font-bold text-white">{itensCarrinho} Itens Selecionados</Text>
        </View>
        <Pressable
          onPress={() =>
            router.push({
              pathname: '/checkout',
              params: { mesa, comanda },
            })
          }
          className="flex-row items-center gap-2 rounded-xl bg-primary px-5 py-3 active:opacity-90"
        >
          <Text className="text-base font-bold text-white">Finalizar</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </Pressable>
      </View>

      {/* BottomSheet de customização */}
      <ProductCustomizeSheet
        product={productToCustomize}
        onClose={() => setProductToCustomize(null)}
        onAdd={handleAddFromSheet}
      />
    </View>
  )
}
