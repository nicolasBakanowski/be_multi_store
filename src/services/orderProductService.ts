import {
  OrderProductAttributes,
  NewOrderPrduct,
} from "../interfaces/orderProductInterface";
import {
  createOrderProduct,
  getAllProductsByOrderfromBd,
} from "../repositories/orderProductsRepository";
import { getAllOrderFormDB } from "../repositories/orderProductsRepository";

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
async function getAllOrderProductsByIdService(orderId: number) {
  const products = await getAllProductsByOrderfromBd(orderId);
  const productsFormatted = await Promise.all(
    products.map(async (orderProduct) => {
      return orderProduct.dataValues;
    })
  );
  return productsFormatted;
}
async function getAllOrdersProductService() {
  try {
    const orders = await getAllOrderFormDB();
    return orders;
  } catch (error) {
    throw new Error("Error get Order");
  }
}
export {
  createOrderProductService,
  getAllOrderProductsByIdService,
  getAllOrdersProductService,
};
