import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>¡Listo!</Text>
        <Text style={styles.subtitle}>
          Explora, intercambia y deja que las historias encuentren nuevos caminos.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.note}>¡Ya casi! Inicia sesión para comenzar a rodar tus libros.</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 40,
  },
  content: {
    marginTop: '40%',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: '900',
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
    color: '#000',
    fontFamily: 'System',
  },
  footer: {
    alignItems: 'center',
  },
  note: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
