import { useState } from 'react'
import {
  Pressable,
  Text,
  Image,
  type PressableProps,
  type ImageSourcePropType,
} from 'react-native'
import { vars } from 'nativewind'
import { useTheme } from 'context/ThemeContext'
import { colorPreset } from 'theme/colors'

export type ButtonSize = 'small' | 'medium' | 'big'

export interface ButtonProps extends PressableProps {
  text: string
  size?: ButtonSize
  icon?: ImageSourcePropType
  iconPosition?: 'left' | 'right'
  onPress?: () => void
}

// Medidas do Figma (só tamanhos)
const sizeClasses: Record<ButtonSize, string> = {
  small: 'px-6 py-3 min-w-[185px] h-[50px]',
  medium: 'px-7 py-[13px] min-w-[322px] h-[50px]',
  big: 'px-7 py-[13px] min-w-[400px] h-[50px]',
}

// Cores do tema: small → verde claro, medium → verde médio, big → verde escuro
const bgClasses: Record<ButtonSize, string> = {
  small: 'bg-green-min active:bg-green-min-pressed',
  medium: 'bg-green-medium active:bg-green-medium-pressed',
  big: 'bg-green-big active:bg-green-big-pressed',
}

const textColorClasses: Record<ButtonSize, string> = {
  small: 'text-green-min-foreground',
  medium: 'text-green-medium-foreground',
  big: 'text-green-big-foreground',
}

const textSizeClasses: Record<ButtonSize, string> = {
  small: 'text-sm font-medium',
  medium: 'text-base font-medium',
  big: 'text-lg font-medium',
}

const iconSizeClasses: Record<ButtonSize, string> = {
  small: 'w-4 h-4',
  medium: 'w-5 h-5',
  big: 'w-6 h-6',
}

export function Button({
  text,
  size = 'medium',
  icon,
  iconPosition = 'left',
  onPress,
  disabled,
  style,
  className,
  ...props
}: ButtonProps) {
  const { colorScheme } = useTheme()
  const themeVars = vars(colorPreset[colorScheme])
  const [isPressed, setIsPressed] = useState(false)

  const mergedStyle = [
    themeVars,
    style,
    disabled && { opacity: 0.5 },
    isPressed && { opacity: 0.9 },
  ] as PressableProps['style']

  return (
    <Pressable
      className={`rounded-md flex flex-row items-center justify-center ${sizeClasses[size]} ${bgClasses[size]} ${className ?? ''}`.trim()}
      style={mergedStyle}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      {!icon ? (
        <Text className={`${textColorClasses[size]} ${textSizeClasses[size]} text-center`}>
          {text}
        </Text>
      ) : iconPosition === 'left' ? (
        <>
          <Image source={icon} className={iconSizeClasses[size]} resizeMode="contain" />
          <Text className={`${textColorClasses[size]} ${textSizeClasses[size]} text-center ml-2`}>
            {text}
          </Text>
        </>
      ) : (
        <>
          <Text className={`${textColorClasses[size]} ${textSizeClasses[size]} text-center mr-2`}>
            {text}
          </Text>
          <Image source={icon} className={iconSizeClasses[size]} resizeMode="contain" />
        </>
      )}
    </Pressable>
  )
}
