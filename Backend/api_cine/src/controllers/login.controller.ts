import { Request, Response } from 'express';
import * as LoginService from '../services/login.service';

export const login = async (req: Request, res: Response) => {
  try {
    const result = await LoginService.login(req.body);
    
    if (result.success) {
      res.status(200).json({
        success: true,
        token: result.token,
        message: "Autenticación exitosa"
      });
    } else {
      res.status(401).json({
        success: false,
        message: result.message || "Credenciales inválidas"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en el servidor"
    });
  }
};
