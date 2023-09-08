import { Request, Response } from "express";
import { createOrderService } from "../services/orderService";
import { OrderAttributes } from "../interfaces/orderInterface";
import { createOrderProductService } from "../services/orderProductService";
async function createOrderController(req: Request, res: Response) {
  try {
    const { deliveryMethod, userInfo, simplifiedCartItems } = req.body;
    console.log(simplifiedCartItems, "simplificado");
    const orderData: OrderAttributes = {
      id: 0,
      userInfo: userInfo,
      extraCommentary: "",
    };
    const newOrder = await createOrderService(orderData);
    const productsInOrder = await createOrderProductService(
      newOrder.id,
      simplifiedCartItems
    );

    return res.status(201).json(productsInOrder);
  } catch (error) {
    console.error("Error creating category:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the category" });
  }
}

export { createOrderController };
