import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import fondo from '../../assets/images/fondooo.jpg';
import lam from '../../assets/images/logocanje.png';
import CustomButton from '../../presentation/components/CustomButton';

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header verde */}
      <View style={styles.header}>
        <Image source={lam} style={styles.logo} contentFit="contain" />
        <Text style={styles.title}>¡Bienvenido a Canje Literario!</Text>
        <Text style={styles.subtitle}>
          Intercambia, descubre y conecta con lectores como tú. {'\n'}
          ¡Tu próxima historia ya está en otra estantería!
        </Text>
      </View>

      {/* Contenedor botones */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Iniciar Sesión"
          colorbg="#00796B"
          onPress={() => router.push('/login')}
        />
        <CustomButton
          title="Registrarse"
          colorbg="#00796B"
          onPress={() => router.push('/register')}
        />
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
  header: {
    backgroundColor: '#00796B',
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 20,
    gap: 20,
    elevation: 5,
  },
});
