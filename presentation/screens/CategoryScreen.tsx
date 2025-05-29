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

  const bannerImages: any = {
    acción: require('../../assets/images/accionbanner.png'),
    romance: require('../../assets/images/romancebanner.png'),
    terror: require('../../assets/images/terrorbanner.png'),
    fantasía: require('../../assets/images/fantasybanner.png'),
  };

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
        {/* Encabezado */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/home')}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.categoryTitle}>
            {String(nombre).charAt(0).toUpperCase() + String(nombre).slice(1)}
          </Text>
          <Image source={require('../../assets/images/logocanje.png')} style={styles.logo} />
        </View>

       

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={bannerImages[nombre as string] || require('../../assets/images/homebanner.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        {/* Título */}
        <Text style={styles.sectionTitle}>Todos los libros</Text>

        {/* Lista de libros */}
        <View style={styles.booksContainer}>
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
            />
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
  container: { flex: 1, backgroundColor: '#E0F2F1' },
  scrollContainer: { padding: 20, paddingBottom: 140 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backText: { fontSize: 28, color: '#004D40' },
  categoryTitle: { fontSize: 22, fontWeight: 'bold', color: '#004D40' },
  logo: { width: 80, height: 80 },
  subText: { color: '#555', fontSize: 13, marginVertical: 10 },
  bannerContainer: {
    height: 160,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  bannerImage: { width: '100%', height: '100%' },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004D40',
    marginBottom: 12,
  },
  booksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    
    gap: 12,
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
