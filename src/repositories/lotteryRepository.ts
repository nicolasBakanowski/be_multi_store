import Lottery from "../models/lotteryModel";
import LotteryParticipant from "../models/lotteryParticipantsModel";

export const createLottery = async (data: { targetAmount: number; isActive: boolean; status: string }) => {
  const newLottery = await Lottery.create(data);
  return newLottery.id;
};

export const getCurrentLottery = async () => {
  return await Lottery.findOne({
    where: {
      isActive: true,
    },
  });
};

export const endLottery = async (lotteryId: number) => {
  return await Lottery.update(
    { isActive: false, status: "inactive" },
    { where: { id: lotteryId } }
  );
};

export const addLotteryParticipant = async (data: {
  userId: number;
  lotteryId: number;
  orderId: number;
  amount: number;
}) => {
  return await LotteryParticipant.create(data);
};

export const removeLotteryParticipantByOrderId = async (orderId: number) => {
  return await LotteryParticipant.destroy({ where: { orderId } });
};


