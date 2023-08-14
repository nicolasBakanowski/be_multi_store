import { Request, Response, NextFunction } from "express";

const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.user && req.body.user.roleId === 1) {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Access denied. You must be an administrator." });
  }
};

export default isAdminMiddleware;
