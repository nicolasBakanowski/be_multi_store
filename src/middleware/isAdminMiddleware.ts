import { Request, Response, NextFunction } from "express";
import { isAdminRole } from "../constants/roles";

export const isAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isAdminRole(req.user?.roleId ?? null)) {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Access denied. You must be an administrator." });
  }
};
