import { firestore } from '../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore'; // <-- esto faltaba
import { getCurrentUserId } from './userAdapter';

interface Book {
  title: string;
  author: string;
  category: string;
  description: string;
}

export const createBook = async (book: Book) => {
  const userId = await getCurrentUserId(); // 👈 Obtener UID del usuario logueado

  if (!userId) {
    throw new Error('No se pudo obtener el usuario logueado');
  }

  const newBook = {
    ...book,
    createdAt: new Date(),
    userId, // 👈 Guardar el UID del usuario
  };

  await addDoc(collection(firestore, 'books'), newBook);
};