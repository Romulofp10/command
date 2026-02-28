import { Stack } from 'expo-router'

export const unstable_settings = {
  initialRouteName: 'index',
}

export default function AuthenticatedLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="table/[id]" options={{ title: 'Mesa' }} />
      <Stack.Screen name="new-order" options={{ title: 'Nova Comanda' }} />
      <Stack.Screen name="menu" options={{ title: 'Cardápio' }} />
      <Stack.Screen name="categoria/[id]" options={{ title: 'Categoria' }} />
      <Stack.Screen name="checkout" options={{ title: 'Resumo do Pedido' }} />
      <Stack.Screen name="pagamento" options={{ title: 'Fechamento de Conta' }} />
    </Stack>
  )
}