import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const r = schema.safeParse(req.body);
    if (!r.success) {
      return res.status(400).json({
        error: "Validación fallida",
        details: (r.error as ZodError).flatten().fieldErrors,
      });
    }
    req.body = r.data as Request["body"];
    next();
  };
}
