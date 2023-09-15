import { Request, Response } from "express";
import { getAllStatusService } from "../services/statusService";
async function getAllStatusController(req: Request, res: Response) {
  try {
    console.log("entra?");
    const status = await getAllStatusService();
    console.log("que pasa aca", status);
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
}
export { getAllStatusController };
