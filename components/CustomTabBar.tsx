import Ionicons from '@expo/vector-icons/Ionicons'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useTheme } from 'context/ThemeContext'
import { Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { VERDES } from 'theme/styles/colors'

const TAB_CONFIG: Record<
  string,
  { label: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  tables: { label: 'MESAS', icon: 'grid-outline' },
  index: { label: 'CATEGORIAS', icon: 'grid' },
  profile: { label: 'PERFIL', icon: 'person-outline' },
}

const INACTIVE_COLOR = '#9ca3af'
const CIRCLE_SIZE = 56
const ICON_SIZE = 28

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets()
  const { isDark } = useTheme()

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: isDark ? '#0a0a0a' : '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 12,
        paddingHorizontal: 8,
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        paddingBottom: insets.bottom + 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: isDark ? 0.4 : 0.15,
        shadowRadius: 20,
        elevation: 24,
        borderTopWidth: isDark ? 1 : 0,
        borderTopColor: isDark ? '#262626' : 'transparent',
      }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index
        const config = TAB_CONFIG[route.name] ?? {
          label: route.name.toUpperCase(),
          icon: 'ellipse-outline' as keyof typeof Ionicons.glyphMap,
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })
          if (!isFocused && !event.defaultPrevented)
            navigation.navigate(route.name, route.params)
        }

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}
          >
            {isFocused ? (
              <>
                <View
                  style={{
                    width: CIRCLE_SIZE,
                    height: CIRCLE_SIZE,
                    borderRadius: CIRCLE_SIZE / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10,
                    backgroundColor: VERDES.primary,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 10,
                    elevation: 12,
                  }}
                >
                  <Ionicons name={config.icon} size={ICON_SIZE} color="#fff" />
                </View>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '600',
                    color: VERDES.primary,
                    marginTop: 4,
                    letterSpacing: 0.5,
                  }}
                >
                  {config.label}
                </Text>
              </>
            ) : (
              <>
                <View style={{ marginBottom: 4 }}>
                  <Ionicons name={config.icon} size={26} color={INACTIVE_COLOR} />
                </View>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '500',
                    color: INACTIVE_COLOR,
                    letterSpacing: 0.5,
                  }}
                >
                  {config.label}
                </Text>
              </>
            )}
          </Pressable>
        )
      })}
    </View>
  )
}
