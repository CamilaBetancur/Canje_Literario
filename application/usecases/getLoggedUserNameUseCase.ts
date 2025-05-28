import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserByEmail } from '../../infraestructure/adapters/userAdapter';

export const getLoggedUserNameUseCase = async () => {
  const email = await AsyncStorage.getItem('loggedInEmail');
  if (!email) throw new Error('No hay usuario logueado');

  const user = await getUserByEmail(email);
  if (!user) throw new Error('Usuario no encontrado');

  return user.fullName;
};
