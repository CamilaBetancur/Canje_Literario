import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { query, where, getDocs } from 'firebase/firestore';

export const getUserByEmail = async (email: string) => {
  const usersRef = collection(firestore, 'users');
  const q = query(usersRef, where('email', '==', email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { uid: doc.id, ...doc.data() }; // ✅ incluye el uid
  }
  return null;
};

export const userExists = async (email: string): Promise<boolean> => {
  const usersRef = collection(firestore, 'users');
  const q = query(usersRef, where('email', '==', email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

export const createUser = async (email: string, fullName: string, password: string) => {
  const userRef = await addDoc(collection(firestore, 'users'), {
    email,
    fullName,
    password,
    createdAt: new Date().toISOString(),
  });

  return userRef.id; // UID generado automáticamente por Firestore
};