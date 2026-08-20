import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: Buffer,
  keylen: number,
) => Promise<Buffer>;

const HASH_PREFIX = 'scrypt';
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

/** Deriva un hash de contraseña con scrypt. Formato: scrypt:salt:hash. */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LENGTH);
  const derivedKey = await scryptAsync(password, salt, KEY_LENGTH);
  return `${HASH_PREFIX}:${salt.toString('hex')}:${derivedKey.toString('hex')}`;
}

/** Verifica una contraseña contra un hash generado con hashPassword. */
export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const [prefix, saltHex, hashHex] = stored.split(':');
  if (prefix !== HASH_PREFIX || !saltHex || !hashHex) return false;

  const salt = Buffer.from(saltHex, 'hex');
  const expected = Buffer.from(hashHex, 'hex');
  const derivedKey = await scryptAsync(password, salt, expected.length);

  return (
    expected.length === derivedKey.length &&
    timingSafeEqual(expected, derivedKey)
  );
}