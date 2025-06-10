import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware";
import { createOrUpdateDailyEarningController } from "../controllers/earningController"
const earningRoute = express.Router();

earningRoute.post(
  "/earningGenerate",
  authMiddleware,
  isAdminMiddleware,
  createOrUpdateDailyEarningController,
);

export default earningRoute;
