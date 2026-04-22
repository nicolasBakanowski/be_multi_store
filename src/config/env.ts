import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().optional(),
  PORT: z.coerce.number().default(30001),
  MYSQL_URL: z.string().min(1, "MYSQL_URL requerido"),
  SECRET_KEY: z.string().min(16, "SECRET_KEY debe tener al menos 16 caracteres"),
  CORS_ORIGINS: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  REDIS_URL: z.string().optional().default("redis://127.0.0.1:6379"),
  SOCKET_AUTH_REQUIRED: z
    .string()
    .optional()
    .transform((v) => v === "true"),
  SWAGGER_ENABLED: z
    .string()
    .optional()
    .transform((v) => v === "true"),
});

export type AppEnv = z.infer<typeof envSchema>;

let cached: AppEnv | null = null;

export function validateEnv(): AppEnv {
  if (cached) return cached;
  if (process.env.NODE_ENV === "test") {
    cached = {
      NODE_ENV: "test",
      PORT: 30001,
      MYSQL_URL: process.env.MYSQL_URL || "mysql://x:x@127.0.0.1:3306/x",
      SECRET_KEY: process.env.SECRET_KEY || "test-secret-key-32chars-min",
      CORS_ORIGINS: process.env.CORS_ORIGINS,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      REDIS_URL: process.env.REDIS_URL || "redis://127.0.0.1:6379",
      SOCKET_AUTH_REQUIRED: process.env.SOCKET_AUTH_REQUIRED === "true",
      SWAGGER_ENABLED: process.env.SWAGGER_ENABLED === "true",
    };
    return cached;
  }
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const msg = parsed.error.flatten().fieldErrors;
    console.error("Variables de entorno inválidas:", msg);
    throw new Error("Configuración de entorno inválida");
  }
  cached = parsed.data as AppEnv;
  return cached;
}

export function getEnv(): AppEnv {
  if (!cached) return validateEnv();
  return cached;
}
