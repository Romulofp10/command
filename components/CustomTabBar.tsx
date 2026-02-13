import Ionicons from '@expo/vector-icons/Ionicons'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
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

  return (
    <View
      className="flex-row bg-white rounded-t-[20px] pt-3 px-2 items-end justify-around shadow-xl"
      style={{
        paddingBottom: insets.bottom + 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 24,
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
            className="flex-1 items-center justify-end"
          >
            {isFocused ? (
              <>
                <View
                  className="rounded-full items-center justify-center mb-2.5 bg-verdes-primary shadow-lg"
                  style={{
                    width: CIRCLE_SIZE,
                    height: CIRCLE_SIZE,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 10,
                    elevation: 12,
                  }}
                >
                  <Ionicons name={config.icon} size={ICON_SIZE} color="#fff" />
                </View>
                <Text className="text-[11px] font-semibold text-verdes-primary mt-1 tracking-wide">
                  {config.label}
                </Text>
              </>
            ) : (
              <>
                <View className="mb-1">
                  <Ionicons name={config.icon} size={26} color={INACTIVE_COLOR} />
                </View>
                <Text className="text-[11px] font-medium text-gray-400 tracking-wide">
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
