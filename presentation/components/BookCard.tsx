// components/BookCard.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface Props {
  id: string;
  title: string;
  image?: any; // Imagen local o remota
}

export default function BookCard({ id, title, image }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(`/book/${id}`)} style={styles.card}>
      <ImageBackground
        source={image || require('../../assets/images/book1.jpg')}
        style={styles.background}
        imageStyle={{ borderRadius: 8 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    height: 140,
    marginBottom: 16,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
