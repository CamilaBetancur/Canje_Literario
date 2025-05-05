import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import CustomButton from '../presentation/components/CustomButton';
import { Image } from 'expo-image';
import lam from '../assets/images/logocanje.png'; 

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={lam} style={styles.logocanje} contentFit="contain" />
      <Text style={styles.subtitle}>
        Intercambia, descubre y conecta con lectores como tú.
        {'\n'}¡Tu próxima historia ya está en otra estantería!
      </Text>

      <CustomButton title="Iniciar Sesión" colorbg="#FFA500" onPress={() => router.push('/login')} />
      <CustomButton title="Registrarse" colorbg="#FFA500" onPress={() => router.push('/register')} />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 14,
    color: '#D4A373',
  },
  logocanje: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});
