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
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Avatar y nombre */}
        <View style={styles.header}>
          <Image source={require('../../assets/images/avatar.webp')} style={styles.avatar} />
          <Text style={styles.userName}>{userName}</Text>
        </View>

        {/* Botón de configuración */}
        <TouchableOpacity style={styles.configButton} onPress={() => router.push('/settings')}>
          <Text style={styles.configButtonText}>Configuración</Text>
        </TouchableOpacity>

        {/* Título */}
        <Text style={styles.sectionTitle}>Mis libros publicados</Text>

        {/* Libros */}
        <View style={styles.booksContainer}>
          {userBooks.length === 0 ? (
            <Text style={styles.noBooksText}>Aún no has publicado ningún libro.</Text>
          ) : (
            userBooks.map(book => (
              <BookCard key={book.id} id={book.id} title={book.title} />
            ))
          )}
        </View>
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
  configButton: {
    backgroundColor: '#00796B',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 24,
  },
  configButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004D40',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  booksContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    
    gap: 12,
  },
  noBooksText: {
    fontStyle: 'italic',
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
    width: '100%',
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
