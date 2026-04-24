import sequelize from "../db";
import { OrderAttributes } from "../interfaces/orderInterface";
import Order from "../models/orderModel";
import OrderProduct from "../models/orderProductModel";
import Product from "../models/productModel";
import {
  getCurrentLottery,
  getCollectedAmountByLotteryId,
  addLotteryParticipant,
  removeLotteryParticipantByOrderId,
} from "../repositories/lotteryRepository";

const ORDER_STATUS_PENDING = 1;
const ORDER_STATUS_CONFIRMED = 2;
const ORDER_STATUS_INPROCCESS = 3;
const ORDER_STATUS_REJECTED = 4;

export type StockUpdate = { productId: number; stock: number };

export type LotteryProgressPayload = {
  lotteryId: number;
  targetAmount: number;
  collectedAmount: number;
};

export type RunOrderStatusChangeResult = {
  order: OrderAttributes;
  stockUpdates: StockUpdate[];
  lotteryProgress: LotteryProgressPayload | null;
};

export class InsufficientStockError extends Error {
  readonly code = "INSUFFICIENT_STOCK" as const;
  constructor(message = "Stock insuficiente para confirmar el pedido") {
    super(message);
    this.name = "InsufficientStockError";
  }
}

/**
 * Confirma / rechaza / cambia estado: stock al pasar 1→2, restock al pasar 2|3→4;
 * sorteo (participante) con la misma transacción que el estado.
 */
export async function runOrderStatusChange(
  orderId: number,
  newStatusId: number
): Promise<RunOrderStatusChangeResult> {
  const stockUpdates: StockUpdate[] = [];

  const order = await sequelize.transaction(async (transaction) => {
    const ord = await Order.findByPk(orderId, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });
    if (!ord) {
      throw new Error(`Orden no encontrada: ${orderId}`);
    }
    const prev = ord.statusId;
    const lines = await OrderProduct.findAll({
      where: { orderId },
      transaction,
    });

    if (
      newStatusId === ORDER_STATUS_CONFIRMED &&
      prev === ORDER_STATUS_PENDING
    ) {
      for (const line of lines) {
        const p = await Product.findByPk(line.productId, {
          transaction,
          lock: transaction.LOCK.UPDATE,
        });
        if (!p) {
          throw new Error(`Producto no encontrado: ${line.productId}`);
        }
        if (p.stock < line.quantity) {
          throw new InsufficientStockError();
        }
        p.stock -= line.quantity;
        await p.save({ transaction });
        stockUpdates.push({ productId: p.id, stock: p.stock });
      }
    } else if (
      newStatusId === ORDER_STATUS_REJECTED &&
      (prev === ORDER_STATUS_CONFIRMED || prev === ORDER_STATUS_INPROCCESS)
    ) {
      for (const line of lines) {
        const p = await Product.findByPk(line.productId, {
          transaction,
          lock: transaction.LOCK.UPDATE,
        });
        if (!p) {
          throw new Error(`Producto no encontrado: ${line.productId}`);
        }
        p.stock += line.quantity;
        await p.save({ transaction });
        stockUpdates.push({ productId: p.id, stock: p.stock });
      }
    }

    ord.statusId = newStatusId;
    await ord.save({ transaction });

    if (
      newStatusId === ORDER_STATUS_CONFIRMED &&
      prev === ORDER_STATUS_PENDING &&
      ord.userId
    ) {
      const activeLottery = await getCurrentLottery(transaction);
      if (activeLottery) {
        await addLotteryParticipant(
          {
            userId: ord.userId,
            lotteryId: activeLottery.id,
            orderId: ord.id,
            amount: Number(ord.totalAmount),
          },
          transaction
        );
      }
    }

    if (newStatusId === ORDER_STATUS_REJECTED) {
      await removeLotteryParticipantByOrderId(orderId, transaction);
    }

    return ord;
  });

  const lot = await getCurrentLottery();
  let lotteryProgress: LotteryProgressPayload | null = null;
  if (lot) {
    const collectedAmount = await getCollectedAmountByLotteryId(lot.id);
    lotteryProgress = {
      lotteryId: lot.id,
      targetAmount: Number(lot.targetAmount),
      collectedAmount,
    };
  }

  return {
    order: order.get({ plain: true }) as OrderAttributes,
    stockUpdates,
    lotteryProgress,
  };
}
