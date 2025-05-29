import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { createForumMessage, getForumMessages } from '../../infraestructure/adapters/forumAdapter';
import { useRouter } from 'expo-router';

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
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Foro</Text>
        <Image source={require('../../assets/images/logocanje.png')} style={styles.logo} />
      </View>
      <Text style={styles.subtitle}>¿No encontraste el libro que buscabas? ¡Pídelo aquí!</Text>

      {/* Formulario */}
      <View style={styles.card}>
        <View style={styles.innerCard}>
          <Text style={styles.formTitle}>¿Buscas un libro? Crea tu cadena</Text>
          <Text style={styles.formLabel}>
            Publica aquí el libro que estás buscando y deja que la comunidad te eche una mano.
          </Text>
          <View style={styles.formRow}>
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
      </View>

      {/* Mensajes */}
      <ScrollView style={styles.messages}>
        {forumMessages.map((msg) => (
          <View key={msg.id} style={styles.messageCard}>
            <Text style={styles.userName}>{msg.userName}</Text>
            <Text style={styles.date}>
              {msg.createdAt.toLocaleDateString('es-CO', {
                day: 'numeric',
                month: 'long',
              })}
            </Text>
            <Text style={styles.message}>{msg.message}</Text>
          </View>
        ))}
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
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    title: { fontSize: 28, fontWeight: 'bold' },
    logo: { width: 40, height: 40, resizeMode: 'contain' },
    subtitle: { fontSize: 14, color: '#555', marginTop: 5, marginBottom: 10 },
    card: { backgroundColor: '#eee', padding: 10, borderRadius: 10, marginBottom: 15 },
    innerCard: {},
    formTitle: { fontWeight: 'bold', marginBottom: 5 },
    formLabel: { fontSize: 13, color: '#444', marginBottom: 10 },
    formRow: { flexDirection: 'row', alignItems: 'center' },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 10,
      height: 40,
      backgroundColor: '#fff',
    },
    sendButton: {
      marginLeft: 10,
      backgroundColor: '#007bff',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
    },
    sendButtonText: { color: 'white' },
    messages: { flex: 1, marginTop: 10 },
    messageCard: {
      backgroundColor: '#f5f5f5',
      padding: 12,
      borderRadius: 10,
      marginBottom: 10,
    },
    userName: { fontWeight: 'bold', fontSize: 15 },
    date: { fontSize: 12, color: '#999' },
    message: { fontSize: 14, marginTop: 4 },
    bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderColor: '#ddd',
    },
    navItem: { fontSize: 14, fontWeight: 'bold' },
  });
  