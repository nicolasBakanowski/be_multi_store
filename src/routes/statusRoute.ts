import express from "express";
import { getAllStatusController } from "../controllers/statusController";

const statuRoute = express.Router();
statuRoute.get("/", getAllStatusController);
export default statuRoute;
