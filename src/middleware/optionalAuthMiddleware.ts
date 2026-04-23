import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/tokenManager";

export const optionalAuthMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
    }
  }
  next();
};
