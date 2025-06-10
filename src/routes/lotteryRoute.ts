import express from "express";
import { startNewLotteryController, getCurrentLotteryController } from "../controllers/lotteryController";

const lotteryRoute = express.Router();

lotteryRoute.post("/start", startNewLotteryController);

lotteryRoute.get("/current", getCurrentLotteryController);

export default lotteryRoute;
