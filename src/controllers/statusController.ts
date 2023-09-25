import { Request, Response } from "express";
import { getAllStatusService } from "../services/statusService";
async function getAllStatusController(req: Request, res: Response) {
  try {
    const status = await getAllStatusService();
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
}
export { getAllStatusController };
