declare global {
  namespace Express {
    interface Request {
      validatedQuery: Record<string, unknown>;
      validatedParams: Record<string, string>;
    }
  }
}

export {};
