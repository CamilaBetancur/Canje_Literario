import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserByEmail } from '../../infraestructure/adapters/userAdapter';

export default function SettingsScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('loggedInEmail');
        if (!storedEmail) return;

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
      router.replace('/');
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Avatar y nombre */}
        <View style={styles.header}>
          <Image source={require('../../assets/images/avatar.webp')} style={styles.avatar} />
          <Text style={styles.userName}>{fullName}</Text>
        </View>

        {/* Correo */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Correo electrónico:</Text>
          <Text style={styles.value}>{email}</Text>
        </View>

        {/* Botón cerrar sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Menú inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push('/home')} style={styles.navItem}>
          <Image source={require('../../assets/images/home.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/add')} style={styles.navItem}>
          <Image source={require('../../assets/images/add.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Agregar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/foro')} style={styles.navItem}>
          <Image source={require('../../assets/images/foro.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Foro</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/profile')} style={styles.navItem}>
          <Image source={require('../../assets/images/user.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2F1',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004D40',
    textAlign: 'center',
  },
  infoBox: {
    width: '100%',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004D40',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#00796B',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 16,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  navText: {
    color: '#fff',
    fontSize: 12,
  },
});
