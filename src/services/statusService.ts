import { getAllStatusFromDB } from "../repositories/statusRepository";

async function getAllStatusService() {
  try {
    const status = await getAllStatusFromDB();
    return status;
  } catch (error) {
    throw new Error("Error fetching status");
  }
}
export { getAllStatusService };
