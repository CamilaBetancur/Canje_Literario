import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../infraestructure/config/firebaseConfig';
import bcrypt from 'bcryptjs';

export default function RegisterScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    // Validaciones
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
      // Encriptar contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Guardar en Firestore
      const newUserRef = doc(firestore, 'users', email);
      await setDoc(newUserRef, {
        email,
        fullName,
        password: hashedPassword,
      });

      router.push('/success');
    } catch (err: any) {
      setError('Error al registrar: ' + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>◀ Regresar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Registro</Text>

      <Text style={styles.label}>Correo institucional</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Nombre completo</Text>
      <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />

      <Text style={styles.label}>Confirmar contraseña</Text>
      <TextInput style={styles.input} secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.footer}>
          ¿Ya tienes una cuenta? <Text style={{ fontWeight: 'bold' }}>Inicia sesión</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  back: {
    marginBottom: 20,
    fontSize: 14,
    color: '#555',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 4,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    color: '#555',
  },
});
