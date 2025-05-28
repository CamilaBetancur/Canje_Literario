import { firestore } from '../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore'; // <-- esto faltaba

interface Book {
  title: string;
  author: string;
  category: string;
  description: string;
}

export const createBook = async (book: Book) => {
  const newBook = {
    ...book,
    createdAt: new Date(),
  };

  await addDoc(collection(firestore, 'books'), newBook); // ✅ modular syntax correcta
};
