export interface LotteryAttributes {
    id: number;
    isActive: boolean;
    winnerId?: number | null;
    targetAmount:number
  }
export interface LotteryParticipantAttributes {
    id: number;
    userId: number;
    lotteryId: number;
  }

export interface LotteryCreationAttributes
extends Omit<LotteryAttributes, 'id'> {}
