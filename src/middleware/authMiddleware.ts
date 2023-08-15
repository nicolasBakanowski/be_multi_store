import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/tokenManager";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: "Invalid token" });
  }

  // Pasamos los datos del usuario al siguiente middleware
  req.body.user = decoded;
  next();
};
