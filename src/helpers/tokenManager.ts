import jwt from "jsonwebtoken";

const secretKey = "your-secret-key"; // Cambia esto a tu clave secreta

interface TokenPayload {
  userId: number;
}

export const generateToken = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, secretKey) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};
