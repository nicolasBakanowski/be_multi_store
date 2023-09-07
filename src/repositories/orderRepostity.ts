import Order from "../models/orderModel";
import { OrderAttributes } from "../interfaces/orderInterface";
async function createOrderInDB(orderData: OrderAttributes) {
  try {
    console.log(orderData, "asi se viene la data");
    const newOrder = await Order.create(orderData);
    return newOrder;
  } catch (error) {
    console.log(error, "error en el repositorio");
    throw new Error("Error creating order in the database");
  }
}
export { createOrderInDB };
