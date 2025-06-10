import { Request, Response } from "express";
import { createOrUpdateDailyEarningService } from "../services/earningService";

async function createOrUpdateDailyEarningController(req: Request, res: Response) {
  try {
    const { date } = req.body;
    console.info(date);
    const updatedEarning = await createOrUpdateDailyEarningService(date);

    res.status(201).json(updatedEarning);
  } catch (error) {
    res.status(500).json({ error: "Error al crear o actualizar las ganancias diarias" });
  }
}

export { createOrUpdateDailyEarningController };
