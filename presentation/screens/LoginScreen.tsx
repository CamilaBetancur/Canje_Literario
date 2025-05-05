import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../infraestructure/config/firebaseConfig';
import bcrypt from 'bcryptjs';

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
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>◀ Regresar</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Nombre App</Text>
        <Text style={styles.subtitle}>Inicia sesión para seguir intercambiando historias</Text>
      </View>

      <Text style={styles.label}>Usuario</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    backgroundColor: 'white',
  },
  back: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
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
    backgroundColor: '#ddd',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
