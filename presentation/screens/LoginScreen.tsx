import bcrypt from 'bcryptjs';
import { useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { firestore } from '../../infraestructure/config/firebaseConfig';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');

    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    try {
      const userRef = doc(firestore, 'users', email);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        setError('Credenciales incorrectas');
        return;
      }

      const userData = userSnap.data();
      const isMatch = await bcrypt.compare(password, userData.password);

      if (!isMatch) {
        setError('Credenciales incorrectas');
        return;
      }

      router.push('/home');
    } catch (err) {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.topSection}>
        <Text style={styles.welcome}>Hola!</Text>
        <Text style={styles.subwelcome}>Inicia sesión para descubrir nuevas lecturas, conectar con otros lectores y darles nueva vida a tus libros.</Text>
        <Image source={require('../../assets/images/plant.png')} style={styles.plantImage} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.loginTitle}>Inicia sesión</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <Text style={styles.signup}>
        ¿Aún no tienes cuenta?{' '}
          <Text style={styles.signupLink} onPress={() => router.push('/register')}>
          Regístrate gratis
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2F1',
  },
  topSection: {
    backgroundColor: '#00796B',
    padding: 40,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'left',
    position: 'relative',
  },
  welcome: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    alignItems: 'left',
  },
  subwelcome: {
    color: 'white',
    fontSize: 15,
    marginTop: 5,
    alignItems: 'left',
  },
  plantImage: {
    width: 180,
    height: 140,
    position: 'absolute',
    right: 70,
    bottom: -40,
    borderRadius: 0,
    zIndex: -1,

  },
  formContainer: {
    backgroundColor: '#fff',
    marginTop: 60,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    elevation: 4,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004D40',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  forgot: {
    textAlign: 'right',
    color: '#00796B',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00796B',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signup: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
  signupLink: {
    color: '#00796B',
    fontWeight: 'bold',
  },
});
