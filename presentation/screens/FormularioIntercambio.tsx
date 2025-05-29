// app/formulariointercambio.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../infraestructure/config/firebaseConfig';
import { getUserByUid } from '../../infraestructure/adapters/userAdapter';

export default function FormularioIntercambio() {
  const { id } = useLocalSearchParams(); // id del libro
  const router = useRouter();
  const [book, setBook] = useState<any>(null);
  const [userFullName, setUserFullName] = useState('');
  const [mensaje, setMensaje] = useState('');

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
        console.error('Error al obtener el libro:', error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Encabezado */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/logocanje.png')}
            style={styles.avatar}
          />
        </View>

        {/* Imagen del libro */}
        <View style={styles.bookImageContainer}>
          <View style={styles.bookImage}>
            <Text style={styles.bookTitle}>{book.title}</Text>
            <Text style={styles.bookAuthor}>{book.author}</Text>
          </View>
        </View>

        {/* Ofrecido por */}
        <Text style={styles.offerText}>Ofrecido por: {userFullName}</Text>

        {/* Comentario */}
        <Text style={styles.label}>Comentario</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje..."
          value={mensaje}
          onChangeText={setMensaje}
          multiline
        />

        {/* Botón de enviar */}
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => router.push('/successintercambio')}
        >
          <Text style={styles.sendButtonText}>Enviar solicitud</Text>
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
  backText: { fontSize: 24 },
  avatar: { width: 40, height: 40 },
  bookImageContainer: { alignItems: 'center', marginBottom: 16 },
  bookImage: {
    width: 150,
    height: 220,
    backgroundColor: '#d1c4e9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  offerText: {
    fontSize: 14,
    marginBottom: 12,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#444',
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  sendButton: {
    backgroundColor: '#6a1b9a',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
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
