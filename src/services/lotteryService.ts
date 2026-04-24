import {
  createLottery,
  getCurrentLottery,
  addLotteryParticipant,
  removeLotteryParticipantByOrderId,
  getCollectedAmountByLotteryId,
} from "../repositories/lotteryRepository";
import { createLotteryProducts } from "../repositories/lotteryProductsRepository";
import { getProductsCost } from "../repositories/productRepository";

export const startNewLotteryService = async (productIds: number[]) => {
  const totalCost = await getProductsCost(productIds);
  const targetAmount = totalCost * 2;
  const lotteryId = await createLottery({
    targetAmount,
    isActive: true,
    status: "active",
  });
  await createLotteryProducts(lotteryId, productIds);

  return lotteryId;
};

export const getCurrentLotteryService = async () => {
  const lottery = await getCurrentLottery();
  return lottery;
};

export const getCurrentLotteryWithProgressService = async () => {
  const lottery = await getCurrentLottery();
  if (!lottery) {
    return null;
  }
  const collectedAmount = await getCollectedAmountByLotteryId(lottery.id);
  const plain = lottery.get({ plain: true });
  const target = Number(plain.targetAmount);
  return {
    ...plain,
    targetAmount: target,
    collectedAmount,
  };
};

export const addLotteryParticipantService = async (
  userId: number,
  lotteryId: number,
  orderId: number,
  amount: number
) => {
  return await addLotteryParticipant({ userId, lotteryId, orderId, amount });
};

export const removeLotteryParticipantByOrderService = async (orderId: number) => {
  return await removeLotteryParticipantByOrderId(orderId);
};
