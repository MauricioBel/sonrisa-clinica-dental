import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';

declare module 'express-session' {
  interface SessionData {
    admin?: {
      id: number;
      email: string;
      nombre: string;
      clinicaId: string;
      clinicaNombre: string;
    };
  }
}

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  if (!req.session?.admin) {
    throw new ApiError(401, 'No autenticado', 'UNAUTHORIZED');
  }
  req.admin = req.session.admin;
  next();
}

declare global {
  namespace Express {
    interface Request {
      admin?: {
        id: number;
        email: string;
        nombre: string;
        clinicaId: string;
        clinicaNombre: string;
      };
    }
  }
}