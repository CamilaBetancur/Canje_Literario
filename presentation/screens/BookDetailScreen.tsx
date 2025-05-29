import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../infraestructure/config/firebaseConfig';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getUserByUid } from '../../infraestructure/adapters/userAdapter';
import BookCard from '../components/BookCard';

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [book, setBook] = useState<any>(null);
  const [userFullName, setUserFullName] = useState<string>('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const docRef = doc(firestore, 'books', String(id));
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const bookData = { id: docSnap.id, ...docSnap.data() };
          setBook(bookData);

          if (bookData.userId) {
            const userDoc = await getUserByUid(bookData.userId);
            const fullName = userDoc?.fullName || 'Desconocido';
            setUserFullName(fullName);
          }
        }
      } catch (error) {
        console.error('Error obteniendo el libro:', error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando libro...</Text>
      </View>
    );
  }

  const formattedDate = book.createdAt?.toDate
    ? format(book.createdAt.toDate(), "d 'de' MMMM yyyy", { locale: es })
    : '';

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Image source={require('../../assets/images/logocanje.png')} style={styles.logo} />
        </View>

        {/* BookCard reutilizable */}
        <View style={styles.cardWrapper}>
          <BookCard id={book.id} title={book.title} author={book.author} />
        </View>

        {/* Detalles adicionales */}
        <View style={styles.details}>
          <Text style={styles.detail}>📅 Publicado el {formattedDate}</Text>
          <Text style={styles.detail}>📝 Descripción: {book.description}</Text>
          <Text style={styles.detail}>👤 Ofrecido por: {userFullName}</Text>
        </View>

        {/* Botón de acción */}
        <TouchableOpacity
          style={styles.exchangeButton}
          onPress={() => router.push(`/formulariointercambio?id=${book.id}`)}
        >
          <Text style={styles.exchangeButtonText}>Solicitar intercambio</Text>
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
  container: { flex: 1, backgroundColor: '#E0F2F1' },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    fontSize: 24,
    color: '#00796B',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  cardWrapper: {
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  details: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  detail: {
    fontSize: 14,
    color: '#004D40',
    marginBottom: 8,
  },
  exchangeButton: {
    backgroundColor: '#00796B',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  exchangeButtonText: {
    color: '#ffffff',
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

