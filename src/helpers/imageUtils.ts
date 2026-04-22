import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

function uploadRootDir(): string {
  // Keep runtime path aligned with app.ts (which serves `${__dirname}/uploads/...`)
  // In compiled output, `__dirname` points to `dist/helpers`, so `../uploads` => `dist/uploads`.
  return path.resolve(__dirname, "..", "uploads");
}

// Ensure base folders exist (useful in dev/local runs)
for (const folder of ["product", "category", "brand"]) {
  const dir = path.resolve(uploadRootDir(), folder);
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch {
    // best-effort; request-time save will also mkdir per-entity
  }
}

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (_req: Request, file, cb) => {
    const ok =
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/webp";
    if (!ok) {
      cb(new Error("Invalid image type"));
      return;
    }
    cb(null, true);
  },
});
