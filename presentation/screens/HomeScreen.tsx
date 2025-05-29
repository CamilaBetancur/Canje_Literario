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
          <View style={[styles.avatar, { borderRadius: 20, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }]}>
            <Text style={{ fontSize: 18 }}>🔔</Text>
            </View>
            </TouchableOpacity>
        </View>

        {/* Imagen destacada */}
        <View style={styles.featuredImage}>
          <Image
            source={require('../../assets/images/homebanner.png')}
            style={styles.featuredImageImage}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.sectionTitle}>Categorías</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((cat) => {
            let imagePath = require('../../assets/images/action.png'); // Cambia esto por cada categoría

            if (cat.name === 'Acción') imagePath = require('../../assets/images/action.png');
            if (cat.name === 'Terror') imagePath = require('../../assets/images/terror.png');
            if (cat.name === 'Romance') imagePath = require('../../assets/images/romance.png');
            if (cat.name === 'Fantasía') imagePath = require('../../assets/images/fantasy.png');

            return (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryCard}
                onPress={() => router.push(`/category/${cat.name.toLowerCase()}`)}
              >
                <Image source={imagePath} style={styles.categoryIcon} />
                <Text style={styles.categoryText}>{cat.name}</Text>
              </TouchableOpacity>
            );
          })}
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
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    backgroundColor: '#00796B',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subText: {
    color: 'white',
    fontSize: 14,
  },
  avatar: {
    color: '#00796B',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    overflow: 'hidden',
    fontSize: 14,
    fontWeight: 'bold',
  },
  featuredImage: {
    height: 160,
    width: '100%',
    borderRadius: 16,
    marginTop: 20,
    overflow: 'hidden',
    elevation: 4,
    backgroundColor: '#ccc',
  },
  featuredImageImage: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004D40',
    marginTop: 24,
    marginBottom: 12,
  },
  categoryScroll: {
    marginBottom: 16,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#B2DFDB',
    borderRadius: 12,
    padding: 10,
    elevation: 3,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#004D40',
    borderRadius: 12,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 14,
    color: '#004D40',
    fontWeight: 'bold',
  },
  booksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  bookCardWrapper: {
    width: '40%',
    marginBottom: 16,
    height: 400, // 👉 más alto
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