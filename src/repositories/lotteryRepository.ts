import { Transaction, WhereOptions } from "sequelize";
import Lottery from "../models/lotteryModel";
import LotteryParticipant from "../models/lotteryParticipantsModel";

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

export const getCollectedAmountByLotteryId = async (
  lotteryId: number
): Promise<number> => {
  const result = await LotteryParticipant.sum("amount", {
    where: { lotteryId } as WhereOptions,
  });
  if (result === null || result === undefined) {
    return 0;
  }
  const n = Number(result);
  return Number.isFinite(n) ? n : 0;
};

