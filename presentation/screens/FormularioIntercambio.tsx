import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../infraestructure/config/firebaseConfig';
import { getUserByUid } from '../../infraestructure/adapters/userAdapter';
import { enviarSolicitudIntercambio } from '../../infraestructure/adapters/intercambioAdapter';

export default function FormularioIntercambio() {
  const { id } = useLocalSearchParams(); // ID del libro
  const router = useRouter();
  const [book, setBook] = useState<any>(null);
  const [userFullName, setUserFullName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const docRef = doc(firestore, 'books', String(id));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const bookData = { id: docSnap.id, ...docSnap.data() };
          setBook(bookData);

          const ownerUser = await getUserByUid(bookData.userId);
          setUserFullName(ownerUser?.fullName || 'Desconocido');
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchBook();
  }, [id]);

  const handleEnviar = async () => {
    if (!message.trim()) {
      Alert.alert('Por favor escribe un mensaje');
      return;
    }

    try {
      await enviarSolicitudIntercambio({
        bookId: book.id,
        toUserId: book.userId,
        message,
      });
      router.push('/successintercambio');
    } catch (err) {
      console.error('Error enviando solicitud:', err);
      Alert.alert('Error al enviar la solicitud');
    }
  };

  if (!book) return <Text>Cargando...</Text>;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Image source={require('../../assets/images/logocanje.png')} style={styles.avatar} />
        </View>

        <View style={styles.bookImageContainer}>
          <View style={styles.bookImage}>
            <Text style={styles.authorOnImage}>{book.author}</Text>
          </View>
        </View>

        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.detailText}>Ofrecido por: {userFullName}</Text>

        <Text style={styles.label}>Comentario</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
          placeholder="Escribe tu interés por el libro..."
        />

        <TouchableOpacity style={styles.exchangeButton} onPress={handleEnviar}>
          <Text style={styles.exchangeButtonText}>Enviar solicitud</Text>
        </TouchableOpacity>
      </ScrollView>
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
    label: { fontSize: 16, marginVertical: 8, fontWeight: 'bold' },
    textInput: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      textAlignVertical: 'top',
    },
  });
  