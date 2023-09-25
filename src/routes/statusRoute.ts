import express from "express";
import { getAllStatusController } from "../controllers/statusController";

const statusRoute = express.Router();
statusRoute.get("/", getAllStatusController);
export default statusRoute;
