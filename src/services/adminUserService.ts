import {
  deleteUserFromDB,
  getUserByIdFromDB,
  listUsersFromDB,
  updateUserRoleInDB,
} from "../repositories/userRepository";
import User from "../models/userModel";
import { RoleId, isSuperAdminRole } from "../constants/roles";

function publicUser(u: User) {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    roleId: u.roleId,
    googleId: u.googleId ?? null,
    createdAt: u.createdAt,
  };
}

function normalizePagination(params: { limit?: number; offset?: number }) {
  const limit =
    typeof params.limit === "number" && Number.isFinite(params.limit)
      ? Math.max(1, Math.min(100, Math.trunc(params.limit)))
      : 20;
  const offset =
    typeof params.offset === "number" && Number.isFinite(params.offset)
      ? Math.max(0, Math.trunc(params.offset))
      : 0;
  return { limit, offset };
}

function isAllowedRoleId(roleId: number): boolean {
  return (
    roleId === RoleId.USER ||
    roleId === RoleId.EMPLOYEE ||
    roleId === RoleId.ADMIN ||
    roleId === RoleId.SUPERADMIN
  );
}

export async function listUsersService(params: {
  q?: string;
  limit?: number;
  offset?: number;
}) {
  const { limit, offset } = normalizePagination(params);
  const q = typeof params.q === "string" ? params.q.trim() : undefined;

  const { rows, count } = await listUsersFromDB({ q, limit, offset });

  return {
    count,
    limit,
    offset,
    users: rows.map(publicUser),
  };
}

export async function updateUserRoleService(userId: number, roleId: number) {
  if (!isAllowedRoleId(roleId)) {
    throw new Error("Invalid roleId");
  }
  const u = await updateUserRoleInDB(userId, roleId);
  if (!u) return null;
  return publicUser(u);
}

export async function deleteUserService(userId: number) {
  const user = await getUserByIdFromDB(userId);
  if (!user) return false;
  if (isSuperAdminRole(user.roleId ?? null)) {
    throw new Error("Cannot delete superadmin");
  }
  const deleted = await deleteUserFromDB(userId);
  return deleted > 0;
}

