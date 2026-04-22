import { z } from "zod";

export const listUsersQuerySchema = z.object({
  q: z.string().trim().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  offset: z.coerce.number().int().min(0).optional(),
});

export const updateUserRoleBodySchema = z.object({
  roleId: z.number().int(),
});

