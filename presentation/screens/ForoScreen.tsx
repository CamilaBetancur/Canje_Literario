import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { createForumMessage, getForumMessages } from '../../infraestructure/adapters/forumAdapter';

export default function ForoScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [forumMessages, setForumMessages] = useState([]);

  const handleSubmit = async () => {
    if (message.trim() === '') return;
    await createForumMessage(message);
    setMessage('');
    loadMessages();
  };

  const loadMessages = async () => {
    const msgs = await getForumMessages();
    setForumMessages(msgs);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Banner */}
        <View style={styles.banner}>
          <Image
            source={require('../../assets/images/forobanner.png')} // Cambia esta ruta si deseas
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        {/* Título */}
        <Text style={styles.title}>Foro</Text>
        <Text style={styles.subtitle}>¿No encontraste el libro que buscabas? ¡Pídelo aquí!</Text>

        {/* Formulario */}
        <View style={styles.card}>
          <Text style={styles.formTitle}>¿Buscas un libro? Crea tu cadena</Text>
          <Text style={styles.formLabel}>
            Publica aquí el libro que estás buscando y deja que la comunidad te eche una mano.
          </Text>
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Escribe tu mensaje..."
              style={styles.input}
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mensajes del foro */}
        <View style={styles.messagesContainer}>
        <Text style={styles.formTitle}>Cadenas creadas recientemente</Text>
          {forumMessages.map((msg) => (
            <View key={msg.id} style={styles.messageCard}>
              <Text style={styles.userName}>{msg.userName}</Text>
              <Text style={styles.date}>
                {msg.createdAt.toDate
                  ? msg.createdAt.toDate().toLocaleDateString('es-CO', {
                      day: 'numeric',
                      month: 'long',
                    })
                  : ''}
              </Text>
              <Text style={styles.message}>{msg.message}</Text>
            </View>
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
    paddingBottom: 100,
  },
  banner: {
    width: '100%',
    height: 160,
    overflow: 'hidden',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004D40',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#004D40',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 4,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004D40',
    marginBottom: 8,
  },
  formLabel: {
    fontSize: 13,
    color: '#555',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,
    borderColor: '#B2DFDB',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#00796B',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  messagesContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  messageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#004D40',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginBottom: 6,
  },
  message: {
    fontSize: 14,
    color: '#333',
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
