import { Op, Transaction, WhereOptions } from "sequelize";
import Lottery from "../models/lotteryModel";
import LotteryParticipant from "../models/lotteryParticipantsModel";
import Order from "../models/orderModel";
import User from "../models/userModel";

export const createLottery = async (data: { targetAmount: number; isActive: boolean; status: string }) => {
  const newLottery = await Lottery.create(data);
  return newLottery.id;
};

export const getCurrentLottery = async (transaction?: Transaction) => {
  return await Lottery.findOne({
    where: {
      isActive: true,
    },
    transaction,
  });
};

export const endLottery = async (lotteryId: number) => {
  return await Lottery.update(
    { isActive: false, status: "inactive" },
    { where: { id: lotteryId } }
  );
};

export const addLotteryParticipant = async (
  data: {
    userId: number;
    lotteryId: number;
    orderId: number;
    amount: number;
  },
  transaction?: Transaction
) => {
  return await LotteryParticipant.create(data, { transaction });
};

export const removeLotteryParticipantByOrderId = async (
  orderId: number,
  transaction?: Transaction
) => {
  return await LotteryParticipant.destroy({ where: { orderId }, transaction });
};

export const getLotteryParticipantsByLotteryId = async (lotteryId: number) => {
  return await LotteryParticipant.findAll({
    where: { lotteryId } as WhereOptions,
    include: [
      {
        model: User,
        attributes: ["id", "name"],
      },
    ],
  });
};

export const setLotteryWinner = async (
  lotteryId: number,
  winnerId: number,
  transaction?: Transaction
) => {
  await Lottery.update(
    { winnerId, status: "completed" },
    { where: { id: lotteryId } as WhereOptions, transaction }
  );
};

export const getCollectedAmountByLotteryId = async (
  lotteryId: number
): Promise<number> => {
  const lottery = await Lottery.findByPk(lotteryId);
  if (!lottery) return 0;
  const lotteryCreatedAt =
    (lottery as any).createdAt ?? (lottery as any).getDataValue("createdAt");

  // Progreso del sorteo = ventas que ya entraron en estados "válidos" para sorteo
  // (confirmado/terminado/entregado) desde que arrancó el sorteo.
  //
  // Nota: usamos updatedAt (no createdAt) para que cuenten órdenes creadas antes
  // pero confirmadas durante el sorteo actual. Esto además soporta múltiples
  // sorteos en un mismo día, porque el corte es por el inicio del sorteo activo.
  const LOTTERY_ELIGIBLE_STATUSES = [2, 3, 4];
  const result = await Order.sum("totalAmount", {
    where: {
      statusId: { [Op.in]: LOTTERY_ELIGIBLE_STATUSES },
      updatedAt: { [Op.gte]: lotteryCreatedAt },
    } as WhereOptions,
  });

  if (result === null || result === undefined) return 0;
  const n = Number(result);
  return Number.isFinite(n) ? n : 0;
};

