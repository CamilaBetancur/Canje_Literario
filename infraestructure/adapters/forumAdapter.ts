import { firestore } from '../config/firebaseConfig';
import { collection, addDoc, query, orderBy, getDocs } from 'firebase/firestore';
import { getCurrentUserId, getUserByUid } from './userAdapter';

export const createForumMessage = async (message: string) => {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error('No se pudo obtener el usuario logueado');

  await addDoc(collection(firestore, 'forumMessages'), {
    message,
    userId,
    createdAt: new Date(),
  });
};

export const getForumMessages = async () => {
  const q = query(collection(firestore, 'forumMessages'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);

  const messages = [];

  for (const doc of querySnapshot.docs) {
    const data = doc.data();
    const user = await getUserByUid(data.userId);

    messages.push({
      id: doc.id,
      message: data.message,
      createdAt: data.createdAt.toDate(),
      userName: user?.fullName || 'Usuario desconocido',
    });
  }

  return messages;
};
