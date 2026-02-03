import { Container } from 'components/Container'
import { TopBar } from 'components/TopBar'
import { Text } from 'react-native'

export default function Categorias() {
  return (
    <Container>
      <TopBar />
      <Text className="p-4 text-foreground">Categorias</Text>
    </Container>
  )
}