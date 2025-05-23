import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import lam from '../../assets/images/logocanje.png'; // logo de Canje Literario

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={lam} style={styles.logo} contentFit="contain" />
        <Text style={styles.title}>¡Bienvenido a Canje Literario!</Text>
        <Text style={styles.subtitle}>
          Intercambia, descubre y conecta con lectores como tú. {'\n'}
          ¡Tu próxima historia ya está en otra estantería!
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/register')}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2F1',
  },
  topSection: {
    backgroundColor: '#00796B',
    padding: 40,
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    elevation: 4,
  },
  button: {
    backgroundColor: '#00796B',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
