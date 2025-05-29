import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { firestore } from '../../infraestructure/config/firebaseConfig';
import { getCurrentUserId, getUserByUid } from '../../infraestructure/adapters/userAdapter';

export default function Notificaciones() {
  const [solicitudes, setSolicitudes] = useState<any[]>([]);

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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notificaciones</Text>
      {solicitudes.length === 0 ? (
        <Text style={styles.empty}>No tienes solicitudes aún</Text>
      ) : (
        solicitudes.map((s) => (
          <View key={s.id} style={styles.card}>
            <Text style={styles.from}>De: {s.fromName}</Text>
            <Text style={styles.message}>{s.message}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  empty: { fontSize: 16, color: '#777' },
  card: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f3e5f5',
    borderRadius: 8,
  },
  from: { fontWeight: 'bold' },
  message: { marginTop: 4 },
});
