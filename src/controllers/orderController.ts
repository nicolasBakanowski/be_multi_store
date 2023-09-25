import { Request, Response } from "express";
import { createOrderService } from "../services/orderService";
import { OrderAttributes } from "../interfaces/orderInterface";
import {
  createOrderProductService,
  getAllOrderProductsByIdService,
  getAllOrdersProductService,
} from "../services/orderProductService";
import { changeOrderStatusService } from "../services/orderService";
import { io } from "../app";

async function createOrderController(req: Request, res: Response) {
  try {
    const { deliveryMethod, userInfo, simplifiedCartItems } = req.body;
    const orderData: OrderAttributes = {
      id: 0,
      name: userInfo.name,
      phone: userInfo.phone,
      address: userInfo.address,
      delivery: true,
      extraCommentary: "",
      statusId: 1,
    };
    const newOrder = await createOrderService(orderData);
    const createproductsInOrder = await createOrderProductService(
      newOrder.id,
      simplifiedCartItems
    );
    const allProductsInOrder = await getAllOrderProductsByIdService(
      newOrder.id
    );
    const orderWithProducts = {
      newOrder,
      productsInOrder: allProductsInOrder,
    };
    io.emit("newOrder", orderWithProducts);
    return res.status(200).json({ status: "OK" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the orders" });
  }
}
async function getAllOrdersController(req: Request, res: Response) {
  try {
    const orders = await getAllOrdersProductService();
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the orders" });
  }
}

async function changeOrderStatusController(req: Request, res: Response) {
  try {
    const { statusId } = req.body;
    const orderId = parseInt(req.params.id, 10);
    const status = await changeOrderStatusService(orderId, statusId);
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
}
export {
  createOrderController,
  getAllOrdersController,
  changeOrderStatusController,
};
