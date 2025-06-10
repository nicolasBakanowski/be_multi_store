import { OrderAttributes } from "../interfaces/orderInterface";
import {
  createOrderInDB,
  changeOrderStatutInDB,
} from "../repositories/orderRepository";

async function createOrderService(orderData: OrderAttributes) {
  try {
    const newOrder = await createOrderInDB(orderData);
    return newOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Error creating Order createOrderService");
  }
}
async function changeOrderStatusService(idOrder: number, idStatus: number) {
  try {
    const order = await changeOrderStatutInDB(idOrder, idStatus);
    return order;
  } catch (error) {
    throw new Error("Error creating Order changeOrderStatusService");
  }
}

export { createOrderService, changeOrderStatusService };
