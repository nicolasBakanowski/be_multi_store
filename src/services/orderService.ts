import Product from "../models/productModel";
import Order from "../models/orderModel";
import { OrderItem } from "sequelize";
import { OrderAttributes } from "../interfaces/orderInterface";
import { createOrderInDB } from "../repositories/orderRepostity";

async function createOrderService(orderData: OrderAttributes) {
  try {
    console.log("service", orderData);
    const newOrder = await createOrderInDB(orderData);
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
