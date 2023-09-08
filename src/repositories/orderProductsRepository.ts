import OrderProduct from "../models/orderProductModel";
import { OrderProductAttributes } from "../interfaces/orderProductInterface"; // Ajusta las importaciones según sea necesario

async function createOrderProduct(orderProductData: OrderProductAttributes) {
  return await OrderProduct.create(orderProductData);
}

export { createOrderProduct };
