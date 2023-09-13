import OrderProduct from "../models/orderProductModel";
import { OrderProductAttributes } from "../interfaces/orderProductInterface"; // Ajusta las importaciones según sea necesario
import Product from "../models/productModel";

async function createOrderProduct(orderProductData: OrderProductAttributes) {
  return await OrderProduct.create(orderProductData);
}

async function getAllProductsByOrderfromBd(orderId: number) {
  try {
    const products = await OrderProduct.findAll({
      where: {
        orderId: 10,
      },
      include: [
        {
          model: Product,
          attributes: ["id", "name", "description", "stock", "price"],
        },
      ],
    });
    return products;
  } catch (error) {
    throw new Error(`Error al obtener productos de la orden: ${error}`);
  }
}
export { createOrderProduct, getAllProductsByOrderfromBd };
