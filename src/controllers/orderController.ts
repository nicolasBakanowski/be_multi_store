import { Request, Response } from "express";
import { createOrderService } from "../services/orderService";
import { OrderAttributes } from "../interfaces/orderInterface";
async function createOrderController(req: Request, res: Response) {
  try {
    const { deliveryMethod, userInfo, simplifiedCartItems } = req.body;
    const orderData: OrderAttributes = {
      id: 0,
      userInfo: userInfo,
      extraCommentary: "", // Debes decidir cómo manejar esto
    };
    const newOrder = createOrderService(orderData);
    return res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating category:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the category" });
  }
}

export { createOrderController };
