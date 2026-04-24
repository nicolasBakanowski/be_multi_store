/** IDs de rol en base de datos (alinear con seeders / migraciones). */
export const RoleId = {
  ADMIN: 1,
  USER: 2,
  EMPLOYEE: 3,
  SUPERADMIN: 4,
} as const;

function normalizeRoleId(
  roleId: number | string | null | undefined
): number | null {
  if (roleId === null || roleId === undefined) return null;
  const n = Number(roleId);
  return Number.isFinite(n) ? n : null;
}

export function isSuperAdminRole(
  roleId: number | string | null | undefined
): boolean {
  return normalizeRoleId(roleId) === RoleId.SUPERADMIN;
}

/** SUPERADMIN incluye permisos de ADMIN. */
export function isAdminRole(
  roleId: number | string | null | undefined
): boolean {
  const n = normalizeRoleId(roleId);
  return n === RoleId.ADMIN || n === RoleId.SUPERADMIN;
}
