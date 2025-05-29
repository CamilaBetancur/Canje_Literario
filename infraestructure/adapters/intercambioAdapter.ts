// src/infraestructure/adapters/intercambioAdapter.ts
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';
import { getCurrentUserId } from './userAdapter';

export const enviarSolicitudIntercambio = async ({
  bookId,
  toUserId,
  message,
}: {
  bookId: string;
  toUserId: string;
  message: string;
}) => {
  const fromUserId = await getCurrentUserId();
  if (!fromUserId) throw new Error('Usuario no autenticado');

  await addDoc(collection(firestore, 'intercambios'), {
    fromUserId,
    toUserId,
    bookId,
    message,
    createdAt: new Date(),
  });
};
