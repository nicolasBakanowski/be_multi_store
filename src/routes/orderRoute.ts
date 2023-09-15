import express from "express";
import {
  createOrderController,
  getAllOrdersController,
} from "../controllers/orderController";

const orderRoute = express.Router();
orderRoute.get("/", getAllOrdersController);
orderRoute.post("/new", createOrderController);
export default orderRoute;
