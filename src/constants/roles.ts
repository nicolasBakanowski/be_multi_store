/** IDs de rol en base de datos (alinear con seeders / migraciones). */
export const RoleId = {
  ADMIN: 1,
  USER: 2,
} as const;

export function isAdminRole(roleId: number | null | undefined): boolean {
  return roleId === RoleId.ADMIN;
}
