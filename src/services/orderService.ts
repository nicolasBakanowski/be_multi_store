import { OrderAttributes } from "../interfaces/orderInterface";
import { createOrderInDB } from "../repositories/orderRepostity";
import { createOrderProduct } from "../repositories/orderProductsRepository";
import { OrderProductAttributes } from "../interfaces/orderProductInterface";

async function createOrderService(orderData: OrderAttributes) {
  try {
    const newOrder = await createOrderInDB(orderData);
    return newOrder;
  } catch (error) {
    console.log(error, "estees el error ");
    throw new Error("Error creating Order");
  }
}

export { createOrderService };
