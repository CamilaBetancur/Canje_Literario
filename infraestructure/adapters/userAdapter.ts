import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';

export const userExists = async (email: string): Promise<boolean> => {
  const userRef = doc(firestore, 'users', email);
  const userSnap = await getDoc(userRef);
  return userSnap.exists();
};

export const createUser = async (email: string, fullName: string, password: string) => {
  const userRef = doc(firestore, 'users', email);
  await setDoc(userRef, { email, fullName, password });
};