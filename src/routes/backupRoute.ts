import { Router } from "express";
import { downloadBackup } from "../controllers/backupController";
import { authMiddleware } from "../middleware/authMiddleware";
import { isSuperAdminMiddleware } from "../middleware/isSuperAdminMiddleware";

const router = Router();

router.get("/db", authMiddleware, isSuperAdminMiddleware, downloadBackup);

export default router;
