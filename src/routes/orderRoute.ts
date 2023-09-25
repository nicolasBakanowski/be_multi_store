import express from "express";
import {
  createOrderController,
  getAllOrdersController,
  changeOrderStatusController,
} from "../controllers/orderController";

const orderRoute = express.Router();
orderRoute.get("/", getAllOrdersController);
orderRoute.post("/new", createOrderController);
orderRoute.put("/:id", changeOrderStatusController);

export default orderRoute;
