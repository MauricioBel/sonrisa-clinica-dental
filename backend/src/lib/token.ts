import { createHmac, timingSafeEqual } from 'node:crypto';
import { env } from '../config/env.js';

export interface TokenPayload {
  sub: string;
  role: string;
  exp: number;
}

const HEADER = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString(
  'base64url',
);

function sign(content: string): string {
  return createHmac('sha256', env.authSecret).update(content).digest('base64url');
}

/** Firma el payload con HMAC-SHA256 y devuelve un token de tres segmentos. */
export function signToken(payload: TokenPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const content = `${HEADER}.${body}`;
  return `${content}.${sign(content)}`;
}

/** Verifica la firma y la expiración. Devuelve null si el token no es válido. */
export function verifyToken(token: string): TokenPayload | null {
  const [header, body, signature] = token.split('.');
  if (!header || !body || !signature) return null;

  const content = `${header}.${body}`;
  const expected = Buffer.from(sign(content), 'base64url');
  const received = Buffer.from(signature, 'base64url');
  if (
    expected.length !== received.length ||
    !timingSafeEqual(expected, received)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(body, 'base64url').toString('utf8'),
    ) as TokenPayload;
    if (payload.exp >= Math.floor(Date.now() / 1000)) {
      return payload;
    }
  } catch {
    /* payload ilegible: token inválido */
  }
  return null;
}