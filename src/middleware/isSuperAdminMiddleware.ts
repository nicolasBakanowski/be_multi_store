import { Request, Response, NextFunction } from "express";
import { isSuperAdminRole } from "../constants/roles";

export const isSuperAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isSuperAdminRole(req.user?.roleId ?? null)) {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Access denied. You must be a super administrator." });
  }
};

