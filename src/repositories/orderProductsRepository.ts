import OrderProduct from "../models/orderProductModel";
import { OrderProductAttributes } from "../interfaces/orderProductInterface"; // Ajusta las importaciones según sea necesario
import Product from "../models/productModel";
import Order from "../models/orderModel";
import { Op } from "sequelize";

async function createOrderProduct(orderProductData: OrderProductAttributes) {
  return await OrderProduct.create(orderProductData);
}

async function getAllProductsByOrderfromBd(orderId: number) {
  try {
    const products = await OrderProduct.findAll({
      where: {
        orderId: orderId,
      },
      include: [
        {
          model: Product,
          attributes: ["id", "name", "description", "stock", "price"],
        },
        {
          model: Order,
          attributes: [
            "id",
            "name",
            "extraCommentary",
            "phone",
            "address",
            "statusId",
            "delivery",
          ],
          where: {
            statusId: {
              [Op.in]: [1, 2, 3],
            },
          },
        },
      ],
    });
    return products;
  } catch (error) {
    throw new Error(`Error al obtener productos de la orden: ${error}`);
  }
}

async function getAllOrderFormDB() {
  try {
    const orders = await OrderProduct.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "name", "description", "stock", "price"],
        },
        {
          model: Order,
          attributes: [
            "id",
            "name",
            "extraCommentary",
            "phone",
            "address",
            "statusId",
            "delivery",
          ],
          where: {
            statusId: {
              [Op.in]: [1, 2, 3],
            },
          },
        },
      ],
    });
    return orders;
  } catch (error) {
    throw new Error("Error fetching Order from the database");
  }
}
export { createOrderProduct, getAllProductsByOrderfromBd, getAllOrderFormDB };
