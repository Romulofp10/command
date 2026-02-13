import { Container } from 'components/Container'
import { TopBar } from 'components/TopBar'
import { Text } from 'react-native'

export default function ProfileScreen() {
  return (
    <Container>
      <TopBar />
      <Text className="p-4 text-foreground">Perfil</Text>
    </Container>
  )
}
