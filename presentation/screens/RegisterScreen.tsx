import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
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
      const uid = await registerUserUseCase(email, fullName, password, confirmPassword);
    console.log('Usuario registrado con UID:', uid);
    router.push('/success');
  } catch (err: any) {
    setError(err.message);
  }
};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.topSection}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.backText}>Regresar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.welcome}>Bienvenido!</Text>
        <Text style={styles.subwelcome}>
          Regístrate para descubrir nuevas lecturas, conectar con otros lectores y compartir tus libros favoritos.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.loginTitle}>Registro</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo institucional"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          placeholderTextColor="#999"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <Text style={styles.signup}>
          ¿Ya tienes una cuenta?{' '}
          <Text style={styles.signupLink} onPress={() => router.push('/login')}>
            Inicia sesión
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
    position: 'relative',
  },
  backButtonContainer: {
    marginTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: 'transparent',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 18,
    color: '#fff',
    marginRight: 5,
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  welcome: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subwelcome: {
    color: 'white',
    fontSize: 15,
    marginTop: 5,
    marginRight: 80,
  },
  plantImage: {
    width: 180,
    height: 140,
    position: 'absolute',
    right: 70,
    bottom: -40,
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
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00796B',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
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