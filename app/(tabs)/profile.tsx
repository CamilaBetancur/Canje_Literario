import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserByEmail } from '../../infraestructure/adapters/userAdapter';

export default function ProfileScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('loggedInEmail');
        if (!storedEmail) {
          console.warn('No hay email almacenado');
          return;
        }

        const user = await getUserByEmail(storedEmail);
        if (user) {
          setFullName(user.fullName);
          setEmail(user.email);
        }
      } catch (error) {
        console.error('Error obteniendo datos del usuario:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('loggedInEmail');
      router.replace('/'); // Te lleva al WelcomeScreen (ruta raíz)
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image source={require('../../assets/images/avatar.webp')} style={styles.avatar} />
      </View>

      {/* Nombre del usuario */}
      <Text style={styles.label}>Nombre de usuario:</Text>
      <Text style={styles.value}>{fullName}</Text>

      {/* Correo */}
      <Text style={styles.label}>Correo actual:</Text>
      <Text style={styles.value}>{email}</Text>

      {/* Botón cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>

      {/* Menú inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Text style={styles.navItem}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/add')}>
          <Text style={styles.navItem}>Agregar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Text style={styles.navItem}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingBottom: 100 },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 40,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#333',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
