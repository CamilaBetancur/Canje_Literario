import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { firestore } from '../../infraestructure/config/firebaseConfig';
import { getCurrentUserId, getUserByUid } from '../../infraestructure/adapters/userAdapter';
import { useRouter } from 'expo-router';

export default function Notificaciones() {
  const [solicitudes, setSolicitudes] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSolicitudes = async () => {
      const uid = await getCurrentUserId();
      if (!uid) return;

      const q = query(
        collection(firestore, 'intercambios'),
        where('toUserId', '==', uid),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      const temp: any[] = [];

      for (const doc of snap.docs) {
        const data = doc.data();
        const fromUser = await getUserByUid(data.fromUserId);
        temp.push({
          id: doc.id,
          message: data.message,
          fromName: fromUser?.fullName || 'Desconocido',
        });
      }

      setSolicitudes(temp);
    };

    fetchSolicitudes();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Botón de regresar */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Image source={require('../../assets/images/home.png')} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Banner personalizado */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Notificaciones</Text>
      </View>

      {/* Lista de mensajes */}
      {solicitudes.length === 0 ? (
        <Text style={styles.empty}>No tienes solicitudes aún</Text>
      ) : (
        solicitudes.map((s) => (
          <View key={s.id} style={styles.card}>
            <Text style={styles.from}>De: {s.fromName}</Text>
            <Text style={styles.label}>Mensaje:</Text>
            <Text style={styles.message}>{s.message}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2F1',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  banner: {
    backgroundColor: '#00796B',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  bannerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#d0f0c0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  from: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#004D40',
  },
  label: {
    marginTop: 8,
    fontWeight: 'bold',
    color: '#004D40',
  },
  message: {
    marginTop: 4,
    fontSize: 15,
    color: '#333',
  },
  empty: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});
