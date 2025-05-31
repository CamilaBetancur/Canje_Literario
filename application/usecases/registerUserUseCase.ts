import { createUser, userExists } from '../../infraestructure/adapters/userAdapter';
import bcrypt from 'bcryptjs';

export const registerUserUseCase = async (
  email: string, 
  fullName: string, 
  password: string, 
  confirmPassword: string) => {

  if (!email || !fullName || !password || !confirmPassword) {
    throw new Error('Todos los campos son obligatorios');
  }

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
     throw new Error('Ingrese un correo válido');
   }
  
  if (!email.endsWith('@campusucc.edu.co')) {
    throw new Error('El correo debe terminar en @campusucc.edu.co');
  }

  if (password !== confirmPassword) {
    throw new Error('Las contraseñas no coinciden');
  }
  
  const exists = await userExists(email);
  if (exists) {
    throw new Error('El correo ya está registrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const uid = await createUser(email, fullName, hashedPassword);

  return uid;
};