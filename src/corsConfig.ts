/**
 * Orígenes permitidos para CORS y Socket.IO.
 * Lista separada por comas en CORS_ORIGINS; por defecto localhost del storefront Next.
 */
export function getCorsOrigins(): string[] {
  const raw = process.env.CORS_ORIGINS;
  if (!raw || raw.trim() === "") {
    return ["http://localhost:3000", "http://127.0.0.1:3000"];
  }
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
