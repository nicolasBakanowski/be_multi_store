import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware";
import { createOrUpdateDailyEarningController } from "../controllers/earningController"
const earningRoute = express.Router();

earningRoute.post(
  "/earningGenerate",
  createOrUpdateDailyEarningController,
);

export default earningRoute;
