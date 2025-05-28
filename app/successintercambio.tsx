import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        ¡Libro creado exitosamente!
      </Text>
      <TouchableOpacity
        style={{ backgroundColor: '#0a84ff', padding: 14, borderRadius: 10 }}
        onPress={() => router.push('/(tabs)/home')}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
}
