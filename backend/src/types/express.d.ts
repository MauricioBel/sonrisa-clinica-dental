import type { TokenPayload } from '../lib/token.js';

declare global {
  namespace Express {
    interface Request {
      validatedQuery: Record<string, unknown>;
      validatedParams: Record<string, string>;
      auth?: TokenPayload;
    }
  }
}

export {};