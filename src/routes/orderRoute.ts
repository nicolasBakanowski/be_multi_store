import express from "express";
import {
  createOrderController,
  getAllOrdersController,
  changeOrderStatusController,
} from "../controllers/orderController";
import { authMiddleware } from "../middleware/authMiddleware";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware";
import { optionalAuthMiddleware } from "../middleware/optionalAuthMiddleware";

const orderRoute = express.Router();
orderRoute.get(
  "/",
  authMiddleware,
  isAdminMiddleware,
  getAllOrdersController
);
orderRoute.post("/new", optionalAuthMiddleware, createOrderController);
orderRoute.put(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  changeOrderStatusController
);

export default orderRoute;
