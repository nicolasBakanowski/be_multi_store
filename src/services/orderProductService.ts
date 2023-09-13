import {
  OrderProductAttributes,
  NewOrderPrduct,
} from "../interfaces/orderProductInterface";
import {
  createOrderProduct,
  getAllProductsByOrderfromBd,
} from "../repositories/orderProductsRepository";

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
async function getAllOrderProductsService(orderId: number) {
  const products = await getAllProductsByOrderfromBd(orderId);
  const productsFormatted = await Promise.all(
    products.map(async (orderProduct) => {
      return orderProduct.dataValues;
    })
  );
  return productsFormatted;
}
export { createOrderProductService, getAllOrderProductsService };
