import { OrderAttributes } from "../interfaces/orderInterface";
import { createOrderInDB } from "../repositories/orderRepostity";

async function createOrderService(orderData: OrderAttributes) {
  try {
    const newOrder = await createOrderInDB(orderData);
    return newOrder;
  } catch (error) {
    throw new Error("Error creating Order");
  }
}

export { createOrderService };
