import { getAllStatusFromDB } from "../repositories/statusRepository";

async function getAllStatusService() {
  try {
    console.log("en el service");
    const status = await getAllStatusFromDB();
    console.log(status);
    return status;
  } catch (error) {
    throw new Error("Error fetching status");
  }
}

export { getAllStatusService };
