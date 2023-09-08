import Order from "../models/orderModel";
import { OrderAttributes } from "../interfaces/orderInterface";
async function createOrderInDB(orderData: OrderAttributes) {
  try {
    const newOrder = await Order.create(orderData);
    return newOrder;
  } catch (error) {
    throw new Error("Error creating order in the database");
  }
}
export { createOrderInDB };