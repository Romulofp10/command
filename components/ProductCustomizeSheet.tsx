import Ionicons from '@expo/vector-icons/Ionicons'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import type { CustomizacaoOpcao, Product } from 'types/product'
import { SHEET } from 'theme/styles/colors'

interface ProductCustomizeSheetProps {
  product: Product | null
  onClose: () => void
  onAdd: (params: { product: Product; quantidade: number; selecoes: Record<string, unknown> }) => void
}

function formatPrice(value: number) {
  return `R$ ${value.toFixed(2).replace('.', ',')}`
}

export function ProductCustomizeSheet({
  product,
  onClose,
  onAdd,
}: ProductCustomizeSheetProps) {
  const snapPoints = useMemo(() => ['60%', '90%'], [])
  const [quantidade, setQuantidade] = useState(1)
  const [selecoes, setSelecoes] = useState<Record<string, CustomizacaoOpcao[]>>({})
  const ref = useRef<React.ComponentRef<typeof BottomSheetModal>>(null)

  useEffect(() => {
    if (product) {
      const initial: Record<string, CustomizacaoOpcao[]> = {}
      product.customizacoes?.forEach((g) => {
        initial[g.id] = g.itens.map((i) => ({ ...i, selected: false, quantidade: 0 }))
      })
      setSelecoes(initial)
      setQuantidade(1)
      ref.current?.present()
    } else {
      ref.current?.dismiss()
    }
  }, [product])

  const handleClose = useCallback(() => {
    ref.current?.dismiss()
    onClose()
  }, [onClose])

  const handleSelectSingle = useCallback(
    ({ grupoId, itemId }: { grupoId: string; itemId: string }) => {
      if (!product?.customizacoes) return
      const grupo = product.customizacoes.find((g) => g.id === grupoId)
      if (!grupo || grupo.tipo !== 'single') return
      setSelecoes((prev) => ({
        ...prev,
        [grupoId]: grupo.itens.map((i) => ({
          ...i,
          selected: i.id === itemId,
          quantidade: i.quantidade ?? 0,
        })),
      }))
    },
    [product]
  )

  const handleChangeQuantity = useCallback(
    ({ grupoId, itemId, delta }: { grupoId: string; itemId: string; delta: number }) => {
      setSelecoes((prev) => {
        const grupoSelecoes = prev[grupoId] ?? []
        const next = grupoSelecoes.map((i) => {
          if (i.id !== itemId) return i
          const qty = Math.max(0, (i.quantidade ?? 0) + delta)
          return { ...i, quantidade: qty }
        })
        return { ...prev, [grupoId]: next }
      })
    },
    []
  )

  const totalPrice = useMemo(() => {
    if (!product) return 0
    let total = product.preco * quantidade
    product.customizacoes?.forEach((g) => {
      const items = selecoes[g.id] ?? g.itens
      items.forEach((i) => {
        if (g.tipo === 'single' && i.selected && i.preco) total += i.preco * quantidade
        if (g.tipo === 'multiple' && (i.quantidade ?? 0) > 0 && i.preco)
          total += (i.preco * (i.quantidade ?? 0)) * quantidade
      })
    })
    return total
  }, [product, quantidade, selecoes])

  const handleAdd = useCallback(() => {
    if (!product) return
    onAdd({
      product,
      quantidade,
      selecoes: selecoes as Record<string, unknown>,
    })
    handleClose()
  }, [product, quantidade, selecoes, onAdd, handleClose])

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose
      onDismiss={onClose}
      backgroundStyle={{ backgroundColor: SHEET.bg }}
      handleIndicatorStyle={{ backgroundColor: SHEET.muted }}
    >
      {product ? (
      <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Header: nome + preço base */}
        <View className="px-4 pb-4">
          <View className="flex-row items-start justify-between gap-2">
            <Text className="text-xl font-bold text-black flex-1">{product.nome}</Text>
            <View className="bg-blue-100 px-3 py-1 rounded-full">
              <Text className="text-sm font-semibold text-blue-600">
                {formatPrice(product.preco)}
              </Text>
            </View>
          </View>
          <Text className="text-sm text-gray-500 mt-1">{product.descricao}</Text>
        </View>

        {/* Grupos de customização */}
        {product.customizacoes?.map((grupo) => (
          <View key={grupo.id} className="px-4 mb-4">
            <View className="flex-row items-center gap-2 mb-2 flex-wrap">
              <Text className="text-sm font-bold text-black uppercase">{grupo.titulo}</Text>
              {grupo.obrigatorio && (
                <Text className="text-xs font-bold text-red-500">OBRIGATÓRIO</Text>
              )}
              {grupo.tipo === 'multiple' && (
                <View className="bg-gray-100 px-2 py-0.5 rounded">
                  <Text className="text-[10px] font-medium text-gray-600 uppercase">
                    Múltipla seleção
                  </Text>
                </View>
              )}
            </View>

            {grupo.itens.map((item) => {
              const current = selecoes[grupo.id]?.find((i) => i.id === item.id)
              return (
                <View
                  key={item.id}
                  className="flex-row items-center justify-between py-3 px-4 mb-2 bg-gray-50 rounded-xl"
                >
                  <View>
                    <Text className="text-base font-medium text-black">{item.nome}</Text>
                    <Text
                      className={`text-sm ${item.preco ? 'text-blue-600' : 'text-gray-500'}`}
                    >
                      {item.preco
                        ? `+ ${formatPrice(item.preco)}${grupo.tipo === 'multiple' ? '/un' : ''}`
                        : 'Grátis'}
                    </Text>
                  </View>

                  {grupo.tipo === 'single' ? (
                    <Pressable
                      onPress={() => handleSelectSingle({ grupoId: grupo.id, itemId: item.id })}
                      className="w-5 h-5 rounded-full border-2 items-center justify-center"
                      style={{
                        borderColor: current?.selected ? SHEET.accent : SHEET.muted,
                        backgroundColor: current?.selected ? SHEET.accent : 'transparent',
                      }}
                    >
                      {current?.selected && (
                        <View className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </Pressable>
                  ) : (
                    <View className="flex-row items-center gap-1">
                      <Pressable
                        onPress={() => handleChangeQuantity({ grupoId: grupo.id, itemId: item.id, delta: -1 })}
                        className="w-8 h-8 rounded-full items-center justify-center bg-gray-200"
                      >
                        <Text className="text-gray-600 font-bold">−</Text>
                      </Pressable>
                      <Text className="text-base font-semibold w-8 text-center">
                        {current?.quantidade ?? 0}
                      </Text>
                      <Pressable
                        onPress={() => handleChangeQuantity({ grupoId: grupo.id, itemId: item.id, delta: 1 })}
                        className="w-8 h-8 rounded-full items-center justify-center bg-blue-500"
                      >
                        <Text className="text-white font-bold">+</Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              )
            })}
          </View>
        ))}

        {/* Barra inferior: quantidade + total + botão */}
        <View className="px-4 pt-4 border-t border-gray-200">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-2">
              <Pressable
                onPress={() => setQuantidade((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-full items-center justify-center bg-gray-200"
              >
                <Text className="text-gray-600 font-bold text-lg">−</Text>
              </Pressable>
              <Text className="text-lg font-bold w-12 text-center">
                {String(quantidade).padStart(2, '0')}
              </Text>
              <Pressable
                onPress={() => setQuantidade((q) => q + 1)}
                className="w-10 h-10 rounded-full items-center justify-center bg-blue-500"
              >
                <Text className="text-white font-bold text-lg">+</Text>
              </Pressable>
            </View>
            <View>
              <Text className="text-xs text-gray-500">VALOR TOTAL</Text>
              <Text className="text-xl font-bold text-black">{formatPrice(totalPrice)}</Text>
            </View>
          </View>
          <Pressable
            onPress={handleAdd}
            className="flex-row items-center justify-center gap-2 py-4 rounded-xl bg-blue-500 active:opacity-90"
          >
            <Ionicons name="cart" size={22} color="#fff" />
            <Text className="text-lg font-bold text-white">Adicionar ao Pedido</Text>
          </Pressable>
        </View>
      </BottomSheetScrollView>
      ) : (
        <View className="flex-1 min-h-[200px]" />
      )}
    </BottomSheetModal>
  )
}

