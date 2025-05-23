import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { registerUserUseCase } from '../../application/usecases/registerUserUseCase';

export default function RegisterScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await registerUserUseCase(email, fullName, password, confirmPassword);
      router.push('/success');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#e0f2f1' }}>
      <StatusBar backgroundColor="#00796b" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>◀ Regresar</Text>
        </TouchableOpacity>
        <Text style={styles.welcome}>¡Bienvenido!</Text>
        <Text style={styles.subtext}>
          Regístrate para descubrir nuevas lecturas, conectar con otros lectores y compartir tus libros favoritos.
        </Text>
      </View>

      {/* Formulario */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Registro</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo institucional"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#666"
        />

        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.footer}>
            ¿Ya tienes una cuenta?{' '}
            <Text style={styles.loginLink}>Inicia sesión</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00796b',
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  back: {
    color: 'white',
    marginBottom: 15,
    fontSize: 16,
  },
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtext: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
  },
  formContainer: {
    marginTop: -25,
    marginHorizontal: 20,
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004d40',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00796b',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#00796b',
  },
});
