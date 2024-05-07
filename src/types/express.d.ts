/// <reference types="express" />

declare namespace Express {
  interface Request {
    user: { userId: string };
  }
}
