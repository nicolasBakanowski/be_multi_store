import LotteryProducts from "../models/lotteryProductModel";

export const createLotteryProducts = async (lotteryId: number, productIds: number[]) => {
  const lotteryProductsData = productIds.map(productId => ({ lotteryId, productId }));
  return await LotteryProducts.bulkCreate(lotteryProductsData);
};
