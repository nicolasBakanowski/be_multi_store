import { Request, Response } from "express";
import {
  startNewLotteryService,
  getCurrentLotteryWithProgressService,
  getCurrentLotteryPublicService,
  drawCurrentLotteryWinnerService,
} from "../services/lotteryService";
import { getIo } from "../socket/ioSingleton";

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
    const msg =
      error instanceof Error && error.message
        ? error.message
        : "Error al iniciar la lotería";
    return res.status(500).json({ message: msg });
  }
};

export const getCurrentLotteryController = async (req: Request, res: Response) => {
  try {
    const lottery = await getCurrentLotteryWithProgressService();
    if (!lottery) {
      return res.status(404).json({ message: "No hay una lotería activa" });
    }
    return res.status(200).json(lottery);
  } catch (error) {
    console.error("Error al obtener la lotería actual:", error);
    return res.status(500).json({ message: "Error al obtener la lotería actual" });
  }
};

export const getCurrentLotteryPublicController = async (
  _req: Request,
  res: Response
) => {
  try {
    const data = await getCurrentLotteryPublicService();
    if (!data) {
      return res.status(404).json({ message: "No hay una lotería activa" });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error al obtener la lotería pública:", error);
    return res.status(500).json({ message: "Error al obtener la lotería pública" });
  }
};

export const drawCurrentLotteryWinnerController = async (
  _req: Request,
  res: Response
) => {
  try {
    const result = await drawCurrentLotteryWinnerService();
    const io = getIo();
    const publicData = await getCurrentLotteryPublicService();
    if (publicData) {
      io.emit("lotteryPublicUpdated", publicData);
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error al sortear ganador:", error);
    const msg =
      error instanceof Error && error.message
        ? error.message
        : "Error al sortear ganador";
    return res.status(500).json({ message: msg });
  }
};
