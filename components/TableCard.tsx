import Ionicons from '@expo/vector-icons/Ionicons'
import { Pressable, Text, View } from 'react-native'

export type TableStatus = 'livre' | 'ocupada'

export interface TableCardProps {
  /** Nome ex.: "Mesa 01" */
  tableName: string
  status: TableStatus
  /** IDs das comandas quando status === 'ocupada' (ex.: ['12', '15']) */
  commandIds?: string[]
  onPress?: () => void
}

/** Cores do HTML (Gestão de Mesas em tons de cinza) */
const PRIMARY = '#10b981'
const NEUTRAL_DARK = '#1f2937'
const NEUTRAL_BG = '#f9fafb'
const NEUTRAL_BORDER = '#e5e7eb'
const GRAY_400 = '#9ca3af'
const GRAY_600 = '#4b5563'
const EMERALD_50 = '#ecfdf5'
const EMERALD_700 = '#047857'
const GRAY_100 = '#f3f4f6'

export function TableCard({ tableName, status, commandIds = [], onPress }: TableCardProps) {
  const isLivre = status === 'livre'

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.98 : 1,
        flexDirection: 'column',
        gap: 12,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        borderLeftWidth: 4,
        borderLeftColor: isLivre ? PRIMARY : GRAY_400,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: NEUTRAL_BORDER,
        borderRightColor: NEUTRAL_BORDER,
        borderBottomColor: NEUTRAL_BORDER,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      })}
    >
      {/* Linha: nome da mesa + ícone (check_circle livre, group/person ocupada) */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: NEUTRAL_DARK }} numberOfLines={1}>
          {tableName}
        </Text>
        {isLivre ? (
          <Ionicons name="checkmark-circle" size={20} color={PRIMARY} />
        ) : (
          <Ionicons
            name={commandIds.length > 1 ? 'people' : 'person'}
            size={20}
            color={GRAY_400}
          />
        )}
      </View>

      {/* Badge Livre / Ocupada */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 9999,
            backgroundColor: isLivre ? EMERALD_50 : GRAY_100,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: '700',
              letterSpacing: 0.5,
              color: isLivre ? EMERALD_700 : GRAY_600,
              textTransform: 'uppercase',
            }}
          >
            {isLivre ? 'Livre' : 'Ocupada'}
          </Text>
        </View>
      </View>

      {isLivre ? (
        <Text style={{ fontSize: 12, color: GRAY_400, marginTop: 'auto' }}>
          Toque para abrir
        </Text>
      ) : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
          {commandIds.map((id) => (
            <View
              key={id}
              style={{
                backgroundColor: NEUTRAL_BG,
                borderWidth: 1,
                borderColor: NEUTRAL_BORDER,
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 4,
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: '600', color: GRAY_600 }}>
                #{id}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Pressable>
  )
}
