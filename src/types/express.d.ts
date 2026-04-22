import type { TokenPayload } from "../interfaces/tokenPayload";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export {};
