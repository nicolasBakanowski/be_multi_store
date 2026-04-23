import express from "express";
import { startNewLotteryController, getCurrentLotteryController } from "../controllers/lotteryController";
import { authMiddleware } from "../middleware/authMiddleware";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware";

const lotteryRoute = express.Router();

lotteryRoute.post("/start", authMiddleware, isAdminMiddleware, startNewLotteryController);

lotteryRoute.get("/current", getCurrentLotteryController);

export default lotteryRoute;
