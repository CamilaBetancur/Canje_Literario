import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../../infraestructure/config/firebaseConfig';
import BookCard from '../components/BookCard';
import { getCurrentUserId, getUserByUid } from '../../infraestructure/adapters/userAdapter';

export default function ProfileScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [userBooks, setUserBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const uid = await getCurrentUserId();
      if (!uid) return;

      const user = await getUserByUid(uid);
      setUserName(user?.fullName || '');

      const booksRef = collection(firestore, 'books');
      const q = query(booksRef, where('userId', '==', uid));
      const querySnapshot = await getDocs(q);

      const books = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserBooks(books);
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Encabezado con avatar y nombre */}
        <View style={styles.header}>
          <Image source={require('../../assets/images/avatar.webp')} style={styles.avatar} />
          <Text style={styles.userName}>{userName}</Text>
        </View>

        {/* Botón de configuración */}
        <TouchableOpacity style={styles.configButton} onPress={() => router.push('/settings')}>
          <Text style={styles.configText}>Configuración &gt;</Text>
        </TouchableOpacity>

        {/* Sección de libros publicados */}
        <Text style={styles.sectionTitle}>Mis libros publicados</Text>
        <View style={styles.booksContainer}>
          {userBooks.map(book => (
            <BookCard key={book.id} id={book.id} title={book.title} />
          ))}
        </View>
      </ScrollView>

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
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 100 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  configButton: {
    marginBottom: 20,
  },
  configText: {
    color: '#6a1b9a',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  booksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
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
  },
});
