import { OrderAttributes } from "../interfaces/orderInterface";
import {
  createOrderInDB,
  changeOrderStatutInDB,
} from "../repositories/orderRepostity";

async function createOrderService(orderData: OrderAttributes) {
  try {
    const newOrder = await createOrderInDB(orderData);
    return newOrder;
  } catch (error) {
    throw new Error("Error creating Order");
  }
}
async function changeOrderStatusService(idOrder: number, idStatus: number) {
  try {
    const order = await changeOrderStatutInDB(idOrder, idStatus);
    return order;
  } catch (error) {
    throw new Error("Error creating Order");
  }
}

export { createOrderService, changeOrderStatusService };
