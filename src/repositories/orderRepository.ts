import Order from "../models/orderModel";
import { OrderAttributes } from "../interfaces/orderInterface";
import { Op } from "sequelize";

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
async function findConfirmedOrdersByDate(date: string) {
  try {
    const orders = await Order.findAll({
      where: {
        createdAt: {
          [Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`],
        },
        statusId: 2,
      },
    });
    return orders;
  } catch (error) {
    throw new Error("Error al buscar órdenes confirmadas por fecha");
  }
}
export { createOrderInDB, changeOrderStatutInDB, findConfirmedOrdersByDate };
