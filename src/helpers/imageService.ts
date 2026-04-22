import path from "path";
import fs from "fs/promises";
import sharp from "sharp";
import type { Request } from "express";

export type ImageEntityType = "product" | "category" | "brand";

function uploadsRootDir(): string {
  // In compiled output, this file lives in `dist/helpers`, so `../uploads` => `dist/uploads`.
  return path.resolve(__dirname, "..", "uploads");
}

export function entityImageAbsolutePath(
  entityType: ImageEntityType,
  entityId: number
): string {
  return path.resolve(uploadsRootDir(), entityType, String(entityId), "main.webp");
}

export function entityImagePublicUrl(
  req: Request,
  entityType: ImageEntityType,
  entityId: number
): string {
  return `${req.protocol}://${req.get("host")}/dist/uploads/${entityType}/${entityId}/main.webp`;
}

export async function saveEntityImageFromBuffer(params: {
  entityType: ImageEntityType;
  entityId: number;
  buffer: Buffer;
  quality?: number;
}): Promise<{ absolutePath: string }> {
  const quality = params.quality ?? 82;
  const absolutePath = entityImageAbsolutePath(params.entityType, params.entityId);
  const dir = path.dirname(absolutePath);

  await fs.mkdir(dir, { recursive: true });
  await sharp(params.buffer)
    .rotate() // respect EXIF orientation
    .webp({ quality })
    .toFile(absolutePath);

  return { absolutePath };
}

export async function deleteEntityImageFolder(params: {
  entityType: ImageEntityType;
  entityId: number;
}): Promise<void> {
  const dir = path.resolve(uploadsRootDir(), params.entityType, String(params.entityId));
  try {
    await fs.rm(dir, { recursive: true, force: true });
  } catch {
    // best-effort cleanup
  }
}

