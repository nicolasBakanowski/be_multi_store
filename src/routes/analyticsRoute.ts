import express from "express";
import { ingestAnalyticsEventController } from "../controllers/analyticsController";

const analyticsRoute = express.Router();

analyticsRoute.post("/events", ingestAnalyticsEventController);

export default analyticsRoute;

