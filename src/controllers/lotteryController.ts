import { Request, Response } from "express";
import { startNewLotteryService } from "../services/lotteryService";

export const startNewLotteryController = async (req: Request, res: Response) => {
  try {
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ message: "Se requiere una lista de IDs de productos válida." });
    }
    const lottery = await startNewLotteryService(productIds);
    return res.status(201).json({ message: "Lotería iniciada con éxito", lottery });
  } catch (error) {
    console.error("Error al iniciar la lotería:", error);
    return res.status(500).json({ message: "Error al iniciar la lotería" });
  }
};
