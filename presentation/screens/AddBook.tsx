import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
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
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        {/* Título superior */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Agregar un libro</Text>
          <Ionicons name="person-circle-outline" size={32} />
        </View>

        {/* Formulario */}
        <View style={{ marginTop: 24 }}>
          <Text style={styles.label}>Nombre del libro</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholder="Ej. Cien años de soledad"
          />

          <Text style={styles.label}>Autor</Text>
          <TextInput
            value={author}
            onChangeText={setAuthor}
            style={styles.input}
            placeholder="Ej. Gabriel García Márquez"
          />

          <Text style={styles.label}>Categoría</Text>
          <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} style={styles.input}>
            <Text>{category || 'Selecciona una categoría'}</Text>
          </TouchableOpacity>
          {showDropdown && categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => {
                setCategory(cat);
                setShowDropdown(false);
              }}
              style={styles.dropdownOption}
            >
              <Text>{cat}</Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
            placeholder="Ej. Libro en buen estado, sin rayones"
            multiline
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Subir libro</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Menú inferior fuera del scroll */}
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
};

const styles = StyleSheet.create({
  label: { fontSize: 16, marginTop: 16 },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  dropdownOption: {
    padding: 12,
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#0a84ff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#333',
  },
  navItem: {
    color: '#fff',
  },
});

export default AddBook;