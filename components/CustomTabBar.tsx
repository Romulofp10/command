import Ionicons from '@expo/vector-icons/Ionicons'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Platform, Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { VERDES } from 'theme/styles/colors'

const TAB_CONFIG: Record<
  string,
  { label: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  mesas: { label: 'MESAS', icon: 'grid-outline' },
  index: { label: 'CATEGORIAS', icon: 'grid' },
  perfil: { label: 'PERFIL', icon: 'person-outline' },
}

const INACTIVE_COLOR = '#9ca3af'
const CIRCLE_SIZE = 56
const ICON_SIZE = 28

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 12,
        paddingBottom: insets.bottom + 8,
        paddingHorizontal: 8,
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
          },
          android: { elevation: 16 },
        }),
      }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index
        const config = TAB_CONFIG[route.name] ?? {
          label: route.name.toUpperCase(),
          icon: 'ellipse-outline',
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
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
                    backgroundColor: VERDES.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom:10,
                    ...Platform.select({
                      ios: {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.2,
                        shadowRadius: 8,
                      },
                      android: { elevation: 8 },
                    }),
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
                  <Ionicons
                    name={config.icon}
                    size={26}
                    color={INACTIVE_COLOR}
                  />
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
