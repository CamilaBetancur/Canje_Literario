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
import lam from '../../assets/images/logocanje.png';

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}> 
      {/* Parte superior: Logo */}
      <View style={styles.topSection}>
        <Image source={lam} style={styles.logo} contentFit="contain" />
      </View>

      {/* Parte inferior: Texto + botones */}
      <View style={styles.bottomSection}>
        <Text style={styles.title}>¡Bienvenido a Canje Literario!</Text>
        <Text style={styles.subtitle}>
          Intercambia, descubre y conecta con lectores como tú. {'\n'}
          ¡Tu próxima historia ya está en otra estantería!
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.darkButton} onPress={() => router.push('/login')}>
            <Text style={styles.darkButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.lightButton} onPress={() => router.push('/register')}>
            <Text style={styles.lightButtonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topSection: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
  },
  logo: {
    width: 150,
    height: 150,
  },
  bottomSection: {
    flex: 2,
    backgroundColor: '#00796B', 
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fcfffd',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#040404',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  darkButton: {
    backgroundColor: '#023436',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  darkButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lightButton: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#023436',
  },
  lightButtonText: {
    color: '#023436',
    fontSize: 16,
    fontWeight: 'bold',
  },
});