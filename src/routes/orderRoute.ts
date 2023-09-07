import express from "express";
import { createOrderController } from "../controllers/orderController";
import { upload } from "../helpers/imageUtils";

const orderRoute = express.Router();

orderRoute.post("/new", createOrderController);

export default orderRoute;
