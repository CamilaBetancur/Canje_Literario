import { getUserByEmail } from '../../infraestructure/adapters/userAdapter';
import bcrypt from 'bcryptjs';

export const loginUserUseCase = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error('Por favor, completa todos los campos');
  }

  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error('Credenciales incorrectas');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Credenciales incorrectas');
  }

  return user;
};