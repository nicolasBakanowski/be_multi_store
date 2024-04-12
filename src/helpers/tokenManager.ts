import jwt from "jsonwebtoken";
import { removeBearerPrefix } from "./removeBeaber";
import { TokenPayload } from "../interfaces/tokenPayload";
import dotenv from "dotenv";

dotenv.config()

if (!process.env.SECRET_KEY) {
  throw new Error("La variable de entorno SECRET_KEY no está definida.");
}
const secretKey = process.env.SECRET_KEY; 

export const generateToken = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(
      removeBearerPrefix(token),
      secretKey
    ) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};
