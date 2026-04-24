import {
  createLottery,
  getCurrentLottery,
  addLotteryParticipant,
  removeLotteryParticipantByOrderId,
  getCollectedAmountByLotteryId,
  getLotteryParticipantsByLotteryId,
  setLotteryWinner,
} from "../repositories/lotteryRepository";
import { createLotteryProducts } from "../repositories/lotteryProductsRepository";
import { getProductsCost } from "../repositories/productRepository";
import User from "../models/userModel";

function maskName(fullName: string): string {
  const s = String(fullName || "").trim().replace(/\s+/g, " ");
  if (!s) return "Participante";
  const parts = s.split(" ");
  const first = parts[0] || "";
  const lastInitial = parts.length > 1 ? `${parts[parts.length - 1]?.[0] || ""}.` : "";
  return `${first}${lastInitial ? " " + lastInitial : ""}`;
}

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

export const getCurrentLotteryPublicService = async () => {
  const current = await getCurrentLottery();
  if (!current) return null;
  const progress = await getCurrentLotteryWithProgressService();
  if (!progress) return null;

  const rows = await getLotteryParticipantsByLotteryId(current.id);
  const byUser = new Map<
    number,
    { userId: number; displayName: string; orders: number; amount: number }
  >();
  for (const r of rows) {
    const user = (r as any).User as User | undefined;
    const userId = Number((r as any).userId);
    const amount = Number((r as any).amount ?? 0);
    if (!byUser.has(userId)) {
      byUser.set(userId, {
        userId,
        displayName: maskName(String((user as any)?.name ?? "")),
        orders: 0,
        amount: 0,
      });
    }
    const entry = byUser.get(userId)!;
    entry.orders += 1;
    entry.amount += Number.isFinite(amount) ? amount : 0;
  }

  let winner: { userId: number; displayName: string } | null = null;
  const winnerId = (progress as any).winnerId ?? null;
  if (winnerId) {
    const w = await User.findByPk(winnerId);
    if (w) {
      winner = { userId: w.id, displayName: maskName(String((w as any).name ?? "")) };
    }
  }

  const participants = Array.from(byUser.values()).sort((a, b) => b.amount - a.amount);
  return {
    lottery: progress,
    participants,
    winner,
  };
};

export const drawCurrentLotteryWinnerService = async () => {
  const current = await getCurrentLottery();
  if (!current) {
    throw new Error("No hay una lotería activa");
  }
  const currentPlain = current.get({ plain: true }) as any;
  if (currentPlain.winnerId) {
    return { winnerId: currentPlain.winnerId, lotteryId: current.id, alreadyDrawn: true };
  }

  const rows = await getLotteryParticipantsByLotteryId(current.id);
  if (!rows || rows.length === 0) {
    throw new Error("No hay participantes para sortear");
  }

  // Sorteo ponderado por monto (amount) para respetar "chances" acumuladas.
  const weights = rows.map((r) => {
    const cents = Math.max(1, Math.round(Number((r as any).amount ?? 0) * 100));
    return { userId: Number((r as any).userId), weight: cents };
  });
  const total = weights.reduce((sum, w) => sum + w.weight, 0);
  let pick = Math.floor(Math.random() * total) + 1;
  let winnerId = weights[0].userId;
  for (const w of weights) {
    pick -= w.weight;
    if (pick <= 0) {
      winnerId = w.userId;
      break;
    }
  }

  await setLotteryWinner(current.id, winnerId);
  return { winnerId, lotteryId: current.id, alreadyDrawn: false };
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
