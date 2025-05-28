import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SuccessIntercambio() {
  const router = useRouter();

  const goToHome = () => {
    router.replace('/(tabs)/home'); // Reemplaza la pantalla actual por la de inicio
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Solicitud enviada!</Text>
      <Text style={styles.subtitle}>
        Tu propuesta de intercambio ya fue enviada al usuario.
      </Text>
      <Text style={styles.footerText}>
        Ahora solo queda esperar que acepte...
      </Text>
      <TouchableOpacity style={styles.button} onPress={goToHome}>
        <Text style={styles.buttonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#3b82f6', // azul
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
