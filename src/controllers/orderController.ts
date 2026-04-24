import { Request, Response } from "express";
import { createOrderService } from "../services/orderService";
import Order from "../models/orderModel";
import { OrderAttributes } from "../interfaces/orderInterface";
import {
  createOrderProductService,
  getAllOrderProductsByIdService,
  getAllOrdersProductService,
} from "../services/orderProductService";
import { getIo } from "../socket/ioSingleton";
import { enqueueOrderCreated } from "../queue/orderQueue";
import {
  runOrderStatusChange,
  InsufficientStockError,
} from "../services/inventoryOrderService";

async function createOrderController(req: Request, res: Response) {
  try {
    const { userInfo, simplifiedCartItems, totalAmount, totalCostPrice, deliveryMethod } =
      req.body;
    const isDelivery = String(deliveryMethod) === "delivery";
    const orderData: OrderAttributes = {
      name: userInfo.name,
      phone: userInfo.phone,
      address: userInfo.address,
      delivery: isDelivery,
      totalAmount: totalAmount,
      totalCostPriceAmount: totalCostPrice,
      extraCommentary: "",
      statusId: 1,
      userId: req.user?.id ?? null,
    };
    const newOrder = await createOrderService(orderData);
    await createOrderProductService(newOrder.id, simplifiedCartItems);
    const allProductsInOrder = await getAllOrderProductsByIdService(
      newOrder.id
    );
    const newOrderPlain = newOrder instanceof Order
      ? newOrder.get({ plain: true })
      : newOrder;
    const orderWithProducts = {
      newOrder: newOrderPlain,
      productsInOrder: allProductsInOrder,
    };
    const io = getIo();
    // Sala admins (tokens con rol admin); si está vacía, fallback para no perder eventos (p. ej. dev).
    io.to("admins").emit("newOrder", orderWithProducts);
    const adminsRoom = io.sockets.adapter.rooms.get("admins");
    if (!adminsRoom || adminsRoom.size === 0) {
      io.emit("newOrder", orderWithProducts);
    }
    await enqueueOrderCreated({
      orderId: newOrder.id,
      totalAmount: newOrder.totalAmount,
    });
    return res.status(200).json({ status: "OK", orderId: newOrder.id });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the orders" });
  }
}
async function getAllOrdersController(req: Request, res: Response) {
  try {
    const limit = Math.min(
      500,
      Math.max(1, parseInt(String(req.query.limit ?? "100"), 10) || 100)
    );
    const offset = Math.max(
      0,
      parseInt(String(req.query.offset ?? "0"), 10) || 0
    );
    const orders = await getAllOrdersProductService(limit, offset);
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the orders" });
  }
}

async function changeOrderStatusController(req: Request, res: Response) {
  try {
    const { statusId } = req.body;
    const orderId = parseInt(req.params.id, 10);
    const { order, stockUpdates, lotteryProgress } = await runOrderStatusChange(
      orderId,
      statusId
    );
    const io = getIo();
    io.emit("orderStatusChanged", order);
    if (lotteryProgress) {
      io.emit("lotteryProgressUpdated", lotteryProgress);
    }
    if (stockUpdates.length > 0) {
      io.emit("productStocksUpdated", stockUpdates);
    }
    return res.status(200).json(order);
  } catch (error) {
    if (error instanceof InsufficientStockError) {
      return res
        .status(400)
        .json({ error: error.message, code: "INSUFFICIENT_STOCK" });
    }
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: "Error al actualizar el estado del pedido" });
  }
}
export {
  createOrderController,
  getAllOrdersController,
  changeOrderStatusController,
};
