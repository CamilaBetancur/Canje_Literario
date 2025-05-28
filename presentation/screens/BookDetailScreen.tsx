import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../infraestructure/config/firebaseConfig';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const docRef = doc(firestore, 'books', String(id));
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBook({ id: docSnap.id, ...docSnap.data() });
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
      <ScrollView contentContainerStyle={styles.content}>
        {/* Encabezado */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Image source={require('../../assets/images/logocanje.png')} style={styles.avatar} />
        </View>

        {/* Imagen del libro con el nombre del autor encima */}
        <View style={styles.bookImageContainer}>
          <View style={styles.bookImage}>
            <Text style={styles.authorOnImage}>{book.author}</Text>
          </View>
        </View>

        {/* Detalles del libro */}
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.detailText}>Autor: {book.author}</Text>
        <Text style={styles.detailText}>Publicado: {formattedDate}</Text>
        <Text style={styles.detailText}>Descripción: {book.description}</Text>

        {/* Botón solicitar intercambio */}
        <TouchableOpacity style={styles.exchangeButton} onPress={() => router.push('/successintercambio')}>
          <Text style={styles.exchangeButtonText}>Solicitar intercambio</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    fontSize: 24,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  bookImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  bookImage: {
    width: 120,
    height: 180,
    backgroundColor: '#d1c4e9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorOnImage: {
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 6,
    color: '#444',
  },
  exchangeButton: {
    backgroundColor: '#6a1b9a',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  exchangeButtonText: {
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
