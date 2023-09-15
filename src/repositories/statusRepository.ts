import Status from "../models/statusModel";

async function getAllStatusFromDB() {
  try {
    console.log("no funca el find all");
    const status = await Status.findAll({});
    console.log("en el repo", status);
    return status;
  } catch (error) {
    console.log(error, "este seria el error");
    throw new Error("Error fetching status from the database");
  }
}
export { getAllStatusFromDB };
