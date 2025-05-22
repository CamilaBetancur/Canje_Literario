import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';

export const createUser = async (email: string, fullName: string, password: string) => {
  const userRef = doc(firestore, 'users', email);
  await setDoc(userRef, { email, fullName, password });
};