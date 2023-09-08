import { OrderAttributes } from "../interfaces/orderInterface";
import { createOrderInDB } from "../repositories/orderRepostity";
import { createOrderProduct } from "../repositories/orderProductsRepository";
import { OrderProductAttributes } from "../interfaces/orderProductInterface";

async function createOrderService(
  orderData: OrderAttributes,
  simplifiedCartItems: any
) {
  try {
    const newOrder = await createOrderInDB(orderData);
    console.log(simplifiedCartItems, "simplifiedCartItems");
    if (newOrder) {
      console.log(simplifiedCartItems, "simplifiedCartItems");
      for (const cartItem of simplifiedCartItems) {
        const { id: productId, cantidad: quantity } = cartItem;
        const orderProductData: OrderProductAttributes = {
          id: 0,
          orderId: newOrder.id,
          productId,
          quantity,
        };
        await createOrderProduct(orderProductData);
      }
    }
    return newOrder;
  } catch (error) {
    console.log(error, "estees el error ");
    throw new Error("Error creating Order");
  }
}

async function getAllCategoriesService() {
  try {
    // const categories = await getAllOrdersFromDB();
    // return categories;
  } catch (error) {
    throw new Error("Error fetching categories");
  }
}

export { createOrderService };
