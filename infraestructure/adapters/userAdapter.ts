import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCurrentUserId = async (): Promise<string | null> => {
  try {
    const email = await AsyncStorage.getItem('loggedInEmail');
    if (!email) return null;

    const user = await getUserByEmail(email);
    return user?.uid || null;
  } catch (error) {
    console.error('Error obteniendo UID del usuario logueado:', error);
    return null;
  }
};

export const getUserByUid = async (uid: string) => {
  const docRef = doc(firestore, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return null;
};

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

  // ✅ Ahora actualizamos el documento para añadirle el uid como campo
  await setDoc(userRef, { uid: userRef.id }, { merge: true });

  return userRef.id; // UID generado automáticamente por Firestore
};