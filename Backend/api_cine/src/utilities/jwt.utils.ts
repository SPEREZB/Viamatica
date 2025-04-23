import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'tu-clave-secreta-temporal'; // Usa variables de entorno en producción

export const generateJWTToken = (username: string): string => {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string): boolean => {
  try {
    jwt.verify(token, SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
};