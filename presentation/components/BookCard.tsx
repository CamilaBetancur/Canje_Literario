import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface Props {
  id: string;
  title: string;
}

export default function BookCard({ id, title }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(`/book/${id}`)} style={styles.card}>
      <View style={styles.bookShape}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    height: 140,
    marginBottom: 16,
  },
  bookShape: {
    flex: 1,
    backgroundColor: '#d1c4e9', // tu color predefinido de fondo para libros
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  title: {
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});