import Ionicons from '@expo/vector-icons/Ionicons'
import { useTheme } from 'context/ThemeContext'
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

const PRIMARY = '#10b981'
const GRAY_400 = '#9ca3af'

export function TableCard({ tableName, status, commandIds = [], onPress }: TableCardProps) {
  const { isDark } = useTheme()
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
        backgroundColor: isDark ? '#171717' : '#ffffff',
        borderLeftWidth: 4,
        borderLeftColor: isLivre ? PRIMARY : GRAY_400,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: isDark ? '#262626' : '#e5e7eb',
        borderRightColor: isDark ? '#262626' : '#e5e7eb',
        borderBottomColor: isDark ? '#262626' : '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: isDark ? 0.3 : 0.05,
        shadowRadius: 2,
        elevation: 2,
      })}
    >
      {/* Linha: nome da mesa + ícone */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <Text
          style={{ fontSize: 16, fontWeight: '700', color: isDark ? '#fafafa' : '#1f2937' }}
          numberOfLines={1}
        >
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
            backgroundColor: isLivre
              ? isDark ? '#052e16' : '#ecfdf5'
              : isDark ? '#1f2937' : '#f3f4f6',
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: '700',
              letterSpacing: 0.5,
              color: isLivre
                ? isDark ? '#86efac' : '#047857'
                : isDark ? '#9ca3af' : '#4b5563',
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
                backgroundColor: isDark ? '#0a0a0a' : '#f9fafb',
                borderWidth: 1,
                borderColor: isDark ? '#262626' : '#e5e7eb',
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 4,
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: '600', color: isDark ? '#9ca3af' : '#4b5563' }}>
                #{id}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Pressable>
  )
}
