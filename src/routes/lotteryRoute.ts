import express from "express";
import { startNewLotteryController } from "../controllers/lotteryController";

const lotteryRoute = express.Router();

lotteryRoute.post("/start", startNewLotteryController);

lotteryRoute.get("/current",);

export default lotteryRoute;
