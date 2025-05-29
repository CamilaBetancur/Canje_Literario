import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';

interface Props {
  id: string;
  title: string;
  author: string;
  image?: any; // Imagen de fondo opcional
}

export default function BookCard({ id, title, author, image }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(`/book/${id}`)} style={styles.card}>
      <ImageBackground
        source={image || require('../../assets/images/book.png')}
        style={styles.bookShape}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{author}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 130,
    height: 210,
    marginHorizontal: 12,
    marginBottom: 28,
  },
  bookShape: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  imageStyle: {
    flex: 1, // Ocupa todo el espacio disponible dentro de su contenedor
    width: '100%', // Ajusta el ancho al 100% del contenedor
    borderRadius: 12,
  },
  overlay: {
    backgroundColor: 'rgba(0, 77, 64, 0.75)',
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  author: {
    color: '#C8E6C9',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
});
