import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function SuccessScreen() {
  const router = useRouter();

  const goToLogin = () => {
    router.replace('/login');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/sucesss.png')} // usa el mismo ícono
          style={styles.successIcon}
        />

        <Text style={styles.title}>¡Listo!</Text>

        <Text style={styles.subtitle}>
          Explora, intercambia y deja que las historias encuentren nuevos caminos.
        </Text>

        <Text style={styles.note}>
          ¡Ya casi! Inicia sesión para comenzar a canjear tus libros.
        </Text>

        <TouchableOpacity style={styles.button} onPress={goToLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#E0F2F1',
    padding: 24,
  },
  container: {
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
    fontSize: 18,
    textAlign: 'center',
    color: '#004D40',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  note: {
    fontSize: 16,
    textAlign: 'center',
    color: '#00695C',
    marginBottom: 20,
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
