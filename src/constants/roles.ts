/** IDs de rol en base de datos (alinear con seeders / migraciones). */
export const RoleId = {
  ADMIN: 1,
  USER: 2,
  EMPLOYEE: 3,
  SUPERADMIN: 4,
} as const;

export function isSuperAdminRole(roleId: number | null | undefined): boolean {
  return roleId === RoleId.SUPERADMIN;
}

/** SUPERADMIN incluye permisos de ADMIN. */
export function isAdminRole(roleId: number | null | undefined): boolean {
  return roleId === RoleId.ADMIN || roleId === RoleId.SUPERADMIN;
}
