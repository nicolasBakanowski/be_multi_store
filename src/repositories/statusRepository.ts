import Status from "../models/statusModel";

async function getAllStatusFromDB() {
  try {
    const status = await Status.findAll({});
    return status;
  } catch (error) {
    console.error(error, "este seria el error");
    throw new Error("Error fetching status from the database");
  }
}
export { getAllStatusFromDB };
