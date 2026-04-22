import { Request, Response } from "express";
import {
  deleteUserService,
  listUsersService,
  updateUserRoleService,
} from "../services/adminUserService";

export async function listUsersController(req: Request, res: Response) {
  try {
    const { q, limit, offset } = req.query as {
      q?: string;
      limit?: string;
      offset?: string;
    };
    const r = await listUsersService({
      q,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    });
    return res.status(200).json(r);
  } catch {
    return res.status(500).json({ error: "Error listing users" });
  }
}

export async function updateUserRoleController(req: Request, res: Response) {
  try {
    const userId = Number(req.params.id);
    if (!Number.isFinite(userId)) {
      return res.status(400).json({ error: "Invalid user id" });
    }
    const { roleId } = req.body as { roleId: number };
    const r = await updateUserRoleService(userId, roleId);
    if (!r) return res.status(404).json({ error: "User not found" });
    return res.status(200).json(r);
  } catch {
    return res.status(500).json({ error: "Error updating user role" });
  }
}

export async function deleteUserController(req: Request, res: Response) {
  try {
    const userId = Number(req.params.id);
    if (!Number.isFinite(userId)) {
      return res.status(400).json({ error: "Invalid user id" });
    }
    const deleted = await deleteUserService(userId);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    return res.status(204).send();
  } catch {
    return res.status(500).json({ error: "Error deleting user" });
  }
}

