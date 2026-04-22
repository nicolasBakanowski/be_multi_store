import jwt from "jsonwebtoken";
import { removeBearerPrefix } from "./removeBearer";
import { TokenPayload } from "../interfaces/tokenPayload";

function secretKey(): string {
  const k = process.env.SECRET_KEY;
  if (!k) {
    throw new Error("La variable de entorno SECRET_KEY no está definida.");
  }
  return k;
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, secretKey(), { expiresIn: "1h" });
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(
      removeBearerPrefix(token),
      secretKey()
    ) as TokenPayload;
    return decoded;
  } catch {
    return null;
  }
};
