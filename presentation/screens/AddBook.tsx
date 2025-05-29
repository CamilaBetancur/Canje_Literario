// app/(tabs)/add.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { createBook } from '../../infraestructure/adapters/bookAdapter';

const AddBook = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const categories = ['acción', 'romance', 'terror', 'fantasía'];

  const handleSubmit = async () => {
    if (!title || !author || !category || !description) {
      return Alert.alert('Por favor, completa todos los campos');
    }

    if (!categories.includes(category)) {
      return Alert.alert('Selecciona una categoría válida');
    }

    try {
      await createBook({ title, author, category, description });
      router.push('/successbook');
    } catch (error) {
      console.error('Error al crear el libro:', error);
      Alert.alert('Error al subir el libro');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Banner superior */}
        <Image
          source={require('../../assets/images/addbanner.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        />

        {/* Formulario */}
        <Text style={styles.sectionTitle}>Sube tu libro</Text>

        <Text style={styles.label}>Nombre del libro</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="Ej. Cien años de soledad"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Autor</Text>
        <TextInput
          value={author}
          onChangeText={setAuthor}
          style={styles.input}
          placeholder="Ej. Gabriel García Márquez"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Categoría</Text>
        <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} style={styles.input}>
          <Text style={{ color: category ? '#000' : '#888' }}>
            {category || 'Selecciona una categoría'}
          </Text>
        </TouchableOpacity>

        {showDropdown &&
          categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => {
                setCategory(cat);
                setShowDropdown(false);
              }}
              style={styles.dropdownOption}
            >
              <Text style={styles.dropdownText}>{cat}</Text>
            </TouchableOpacity>
          ))}

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Ej. Libro en buen estado, sin rayones"
          multiline
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Subir libro</Text>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2F1',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 140,
  },
  bannerImage: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004D40',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#004D40',
    marginTop: 16,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
    marginTop: 8,
    fontSize: 16,
    color: '#000',
  },
  dropdownOption: {
    padding: 12,
    backgroundColor: '#B2DFDB',
    borderRadius: 8,
    marginTop: 4,
  },
  dropdownText: {
    color: '#004D40',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00796B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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

export default AddBook;
