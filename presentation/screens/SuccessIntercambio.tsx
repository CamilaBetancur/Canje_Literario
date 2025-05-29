import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function SuccessIntercambio() {
  const router = useRouter();

  const goToHome = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/sucesss.png')} // Asegúrate de tener este ícono (puede ser un check verde)
        style={styles.successIcon}
      />
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
    backgroundColor: '#E0F2F1',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    width: 100,
    height: 100,
    marginBottom: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#004D40',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 24,
    textAlign: 'center',
    color: '#004D40',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  footerText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#00695C',
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#00796B',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
