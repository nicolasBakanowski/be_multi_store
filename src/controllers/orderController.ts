import { Request, Response } from "express";
import { createOrderService } from "../services/orderService";
import { OrderAttributes } from "../interfaces/orderInterface";
import {
  createOrderProductService,
  getAllOrderProductsService,
} from "../services/orderProductService";
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
    const allProductsInOrder = await getAllOrderProductsService(newOrder.id);
    const orderWithProducts = {
      newOrder,
      productsInOrder: allProductsInOrder,
    };
    io.emit("newOrder", JSON.stringify(orderWithProducts));
    return res.status(200).json({ status: "OK" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the orders" });
  }
}
async function getAllOrdersController() {}

export { createOrderController, getAllOrdersController };
