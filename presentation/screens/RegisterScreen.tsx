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
import { doc, setDoc } from 'firebase/firestore';
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
import { firestore } from '../../infraestructure/config/firebaseConfig';
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
    if (!email || !fullName || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (!email.endsWith('@campusucc.edu.co')) {
      setError('El correo debe terminar en @campusucc.edu.co');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUserRef = doc(firestore, 'users', email);
      await setDoc(newUserRef, {
        email,
        fullName,
        password: hashedPassword,
      });
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
        </Text>
      </View>
    </ScrollView>
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
  title: {
    fontSize: 20,
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
    color: '#004d40',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00796B',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#00796b',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signup: {
    textAlign: 'center',
    color: '#333',
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#00796b',
    marginTop: 20,
    color: '#555',
  },
  signupLink: {
    color: '#00796B',
    fontWeight: 'bold',
  },
});
