// app/(tabs)/home.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import BookCard from '../components/BookCard';
import { getLoggedUserNameUseCase } from '../../application/usecases/getLoggedUserNameUseCase';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../infraestructure/config/firebaseConfig';

const categories = [
  { id: '1', name: 'Acción' },
  { id: '2', name: 'Terror' },
  { id: '3', name: 'Romance' },
  { id: '4', name: 'Fantasía' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState('Usuario');
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await getLoggedUserNameUseCase();
        setUserName(name);
      } catch (error) {
        console.log('Error obteniendo nombre de usuario:', error);
      }
    };

    const fetchBooks = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, 'books'));

        const booksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBooks(booksData);
      } catch (error) {
        console.error('Error cargando libros:', error);
      }
    };

    fetchUserName();
    fetchBooks();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Encabezado */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hola, {userName}</Text>
            <Text style={styles.subText}>Hoy es un buen día para compartir</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/notifications')}>
            <Text style={styles.avatar}>Notificaciones</Text>
            </TouchableOpacity>
        </View>

        {/* Imagen destacada */}
        <View style={styles.featuredImage}>
          <Image
            source={require('../../assets/images/baanner.png')}
            style={styles.featuredImageImage}
            resizeMode="cover"
          />
        </View>

        {/* Categorías */}
        <Text style={styles.sectionTitle}>Categorías</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryCard}
              onPress={() => router.push(`/category/${cat.name.toLowerCase()}`)}
            >
              <View style={styles.categoryIcon} />
              <Text style={styles.categoryText}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Libros recientes */}
        <Text style={styles.sectionTitle}>Libros recientes</Text>
        <View style={styles.booksContainer}>
          {books.map((book) => (
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subText: {
    color: '#555',
    fontSize: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 0,
    backgroundColor: '#ccc',
  },
  featuredImage: {
    height: 140,
    width: '100%', // 👉 asegúrate que cubra todo el ancho
    borderRadius: 12,
    marginVertical: 16,
    overflow: 'hidden', // para que el borderRadius funcione con imágenes
  },
  featuredImageImage: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  categoryScroll: {
    marginBottom: 16,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 12,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    borderRadius: 8,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
  },
  booksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
