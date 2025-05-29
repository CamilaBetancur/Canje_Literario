import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../infraestructure/config/firebaseConfig';
import BookCard from '../../presentation/components/BookCard';

export default function CategoryScreen() {
  const { nombre } = useLocalSearchParams();
  const router = useRouter();
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchBooksByCategory = async () => {
      try {
        const q = query(
          collection(firestore, 'books'),
          where('category', '==', String(nombre).toLowerCase())
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBooks(data);
      } catch (error) {
        console.error('Error obteniendo libros por categoría:', error);
      }
    };

    fetchBooksByCategory();
  }, [nombre]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Encabezado con botón de regreso */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/home')}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.categoryTitle}>{String(nombre).charAt(0).toUpperCase() + String(nombre).slice(1)}</Text>

          <Image source={require('../../assets/images/logocanje.png')} style={styles.avatar} />
        </View>

        {/* Subtexto */}
        <Text style={styles.subText}>Hoy es un buen día para compartir</Text>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={require('../../assets/images/homebanner.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        {/* Título */}
        <Text style={styles.sectionTitle}>Todos los libros</Text>

        {/* Libros filtrados */}
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
        <TouchableOpacity onPress={() => router.push('/foro')}>
          <Text style={styles.navItem}>Foro</Text>
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
  scrollContainer: { padding: 16, paddingBottom: 100 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backText: { fontSize: 24, color: '#333' },
  categoryTitle: { fontSize: 20, fontWeight: 'bold' },
  avatar: { width: 40, height: 40, backgroundColor: '#ccc' },
  subText: { color: '#555', fontSize: 12, marginVertical: 8 },
  bannerContainer: {
    height: 140,
    width: '100%',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  bannerImage: { width: '100%', height: '100%' },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
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
  navItem: { color: '#fff' },
});
