
import { createLottery, getCurrentLottery } from "../repositories/lotteryRepository";
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
