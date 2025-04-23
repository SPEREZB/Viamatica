import { userData } from "../data/userData";
import { generateJWTToken } from "../utilities/jwt.utils";

export const login = async (credentials:any) => {

    try {
        if (credentials.user_name === userData.user_name && 
            credentials.password === userData.password) {
          // Autenticación exitosa - genera un token JWT
          const token = generateJWTToken(credentials.user_name); // Implementa esta función
          return { success: true, token };
        }
        return { success: false, message: "Credenciales incorrectas" };
      } catch (error) {
        throw new Error("Error en el servidor durante la autenticación");
      }
};