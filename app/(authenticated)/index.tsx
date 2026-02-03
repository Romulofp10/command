import { Button } from 'components/Button'
import { Container } from 'components/Container'
import { TopBar } from 'components/TopBar'
import { Text, View } from 'react-native'

export default function TelaInicial() {
  return (
    <Container>
      <TopBar />
    <View className='flex-row items-center justify-center border-b-2 border-gray-200 pb-4'>
      <Text className='text-xl font-bold text-foreground pt-8'>Gestão de Mesas</Text>
      </View>
      <Button text="Abrir Nova Comanda" size="medium" style={{ marginTop: 16, marginHorizontal: 16, borderRadius: 10 }}  />
      <View className='p-4'>
        <Text className='text-lg font-bold text-foreground'>Status do Salão</Text>
        <Text className='text-sm text-gray-500'>Selecione uma mesa para gerenciar</Text>
      </View>
    </Container>
  )
}