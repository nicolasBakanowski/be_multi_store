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
async function changeOrderStatutInDB(orderId: number, statusId: number) {
  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      throw new Error(`No se encontró la orden con ID ${orderId}`);
    }
    order.statusId = statusId;
    await order.save();
    return order;
  } catch (error) {
    throw new Error(`Error cambiando el estado de la orden: ${error}`);
  }
}
export { createOrderInDB, changeOrderStatutInDB };
