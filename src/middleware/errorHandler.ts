import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const message =
    err instanceof Error ? err.message : "Error interno del servidor";
  const status =
    err && typeof err === "object" && "status" in err
      ? Number((err as { status: number }).status) || 500
      : 500;
  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }
  res.status(status).json({ error: message });
}
