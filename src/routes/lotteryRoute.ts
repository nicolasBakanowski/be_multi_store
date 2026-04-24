import express from "express";
import {
  startNewLotteryController,
  getCurrentLotteryController,
  getCurrentLotteryPublicController,
  drawCurrentLotteryWinnerController,
} from "../controllers/lotteryController";
import { authMiddleware } from "../middleware/authMiddleware";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware";

const lotteryRoute = express.Router();

lotteryRoute.post("/start", authMiddleware, isAdminMiddleware, startNewLotteryController);

lotteryRoute.get("/current", getCurrentLotteryController);

// Público: participantes (anonimizados) + ganador (si existe)
lotteryRoute.get("/current/public", getCurrentLotteryPublicController);

// Admin: sortear ganador
lotteryRoute.post(
  "/current/draw",
  authMiddleware,
  isAdminMiddleware,
  drawCurrentLotteryWinnerController
);

export default lotteryRoute;
