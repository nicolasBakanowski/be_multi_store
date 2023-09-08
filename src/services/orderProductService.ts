import {
  OrderProductAttributes,
  NewOrderPrduct,
} from "../interfaces/orderProductInterface";
import { createOrderProduct } from "../repositories/orderProductsRepository";

async function createOrderProductService(
  orderId: number,
  simplifiedCartItems: any
) {
  for (const cartItem of simplifiedCartItems) {
    const { productId, quantity } = cartItem;

    const orderProductData: OrderProductAttributes = {
      id: 0,
      orderId: orderId,
      productId,
      quantity,
    };
    await createOrderProduct(orderProductData);
  }
}
export { createOrderProductService };
