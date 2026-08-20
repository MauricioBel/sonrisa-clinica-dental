import { prisma } from '../lib/prisma.js';
import { ApiError } from '../utils/ApiError.js';
import { verifyPassword } from '../lib/hash.js';
import { signToken } from '../lib/token.js';
import { env } from '../config/env.js';

const DUMMY_HASH =
  'scrypt:$2b$10$000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface LoginResult {
  token: string;
  user: AuthUser;
  expiresInSeconds: number;
}

/**
 * Autentica un usuario del panel. Devuelve el token de sesión firmado.
 * Usuario inexistente y contraseña incorrecta devuelven el mismo error y
 * un cálculo de hash de complejidad constante para no filtrar existencias.
 */
export async function login(
  email: string,
  password: string,
): Promise<LoginResult> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    await verifyPassword(password, DUMMY_HASH);
    throw new ApiError(401, 'Credenciales inválidas', 'INVALID_CREDENTIALS');
  }
  if (!user.isActive) {
    throw new ApiError(401, 'Credenciales inválidas', 'INVALID_CREDENTIALS');
  }

  const passwordOk = await verifyPassword(password, user.passwordHash);
  if (!passwordOk) {
    throw new ApiError(401, 'Credenciales inválidas', 'INVALID_CREDENTIALS');
  }

  const token = signToken({
    sub: String(user.id),
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + env.authTokenTtlSeconds,
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    expiresInSeconds: env.authTokenTtlSeconds,
  };
}

/** Devuelve los datos del usuario autenticado (para GET /api/auth/me). */
export async function getCurrentUser(id: number): Promise<AuthUser> {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, role: true, isActive: true },
  });
  if (!user || !user.isActive) {
    throw new ApiError(401, 'Sesión inválida', 'UNAUTHORIZED');
  }
  return user;
}