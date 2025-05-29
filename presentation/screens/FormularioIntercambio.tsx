import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../infraestructure/config/firebaseConfig';
import { getUserByUid } from '../../infraestructure/adapters/userAdapter';
import { enviarSolicitudIntercambio } from '../../infraestructure/adapters/intercambioAdapter';

export default function FormularioIntercambio() {
  const { id } = useLocalSearchParams();
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

  if (!book) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando libro...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/logocanje.png')}
            style={styles.logo}
          />
        </View>

        {/* Info del libro */}
        <View style={styles.bookContainer}>
        <Image
            source={require('../../assets/images/book2.png')}
            style={styles.bookImage}
          />
          
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.authorOnImage}>{book.author}</Text>
          <Text style={styles.subTitle}>Ofrecido por: {userFullName}</Text>
        </View>

        {/* Comentario */}
        <Text style={styles.label}>Mensaje para el dueño del libro</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={5}
          value={message}
          onChangeText={setMessage}
          placeholder="Escribe tu interés por el libro..."
          placeholderTextColor="#777"
        />

        {/* Botón de enviar */}
        <TouchableOpacity style={styles.exchangeButton} onPress={handleEnviar}>
          <Text style={styles.exchangeButtonText}>Enviar solicitud</Text>
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
  bookContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bookImage: {
    width: 120,
    height: 180,
    backgroundColor: '#B2DFDB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorOnImage: {
    color: '#004D40',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004D40',
  },
  subTitle: {
    fontSize: 14,
    color: '#00695C',
    marginTop: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004D40',
    marginBottom: 8,
  },
  textInput: {
    borderColor: '#80CBC4',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#ffffff',
    textAlignVertical: 'top',
  },
  exchangeButton: {
    backgroundColor: '#00796B',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  exchangeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
