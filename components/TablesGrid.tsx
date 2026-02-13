import { TableCard } from 'components/TableCard'
import { useRouter } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'

const NEUTRAL_DARK = '#1f2937'
const GRAY_500 = '#6b7280'
const NEUTRAL_BG = '#f9fafb'

const TABLES_MOCK = [
  { id: '01', name: 'Mesa 01', status: 'livre' as const, commandIds: [] },
  { id: '02', name: 'Mesa 02', status: 'ocupada' as const, commandIds: ['12', '15'] },
  { id: '03', name: 'Mesa 03', status: 'ocupada' as const, commandIds: ['08'] },
  { id: '04', name: 'Mesa 04', status: 'livre' as const, commandIds: [] },
  { id: '05', name: 'Mesa 05', status: 'livre' as const, commandIds: [] },
  { id: '06', name: 'Mesa 06', status: 'ocupada' as const, commandIds: ['21'] },
]

export function TablesGrid() {
  const router = useRouter()

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: NEUTRAL_BG }}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            lineHeight: 22,
            letterSpacing: -0.2,
            color: NEUTRAL_DARK,
          }}
        >
          Status do Salão
        </Text>
        <Text style={{ fontSize: 14, color: GRAY_500, marginTop: 2 }}>
          Selecione uma mesa para gerenciar
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 16,
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {TABLES_MOCK.map((table) => (
          <View key={table.id} style={{ width: '47%' }}>
            <TableCard
              tableName={table.name}
              status={table.status}
              commandIds={table.commandIds.length > 0 ? table.commandIds : undefined}
              onPress={() => router.push(`/table/${table.id}`)}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
