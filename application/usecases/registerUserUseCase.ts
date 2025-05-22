import { createUser } from '../../infraestructure/adapters/userAdapter';
import bcrypt from 'bcryptjs';

export const registerUserUseCase = async (email: string, fullName: string, password: string, confirmPassword: string) => {
  if (!email || !fullName || !password || !confirmPassword) {
    throw new Error('Todos los campos son obligatorios');
  }

  if (!email.endsWith('@campusucc.edu.co')) {
    throw new Error('El correo debe terminar en @campusucc.edu.co');
  }

  if (password !== confirmPassword) {
    throw new Error('Las contraseñas no coinciden');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await createUser(email, fullName, hashedPassword);
};