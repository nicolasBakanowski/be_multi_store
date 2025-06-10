import DailyEarnings from "../models/EarningsModel"; // Importa el modelo
import { DailyEarningAttributes } from "../interfaces/earningInterface";

// Busca ganancias diarias por fecha
async function findDailyEarningByDate(date: string) {
  try {
    const dailyEarning = await DailyEarnings.findOne({
      where: { date },
    });
    return dailyEarning;
  } catch (error) {
    throw new Error("Error al buscar las ganancias diarias por fecha");
  }
}

// Crea una nueva entrada de ganancias diarias
async function createDailyEarningInDB(earningData: Partial<DailyEarningAttributes>) {
  try {
    const newEarning = await DailyEarnings.create({
      date: earningData.date,
      totalRevenue: earningData.totalRevenue,
      totalCost: earningData.totalCost,
      totalProfit: earningData.totalProfit,
    });
    return newEarning;
  } catch (error) {
    throw new Error("Error creando las ganancias diarias en la base de datos");
  }
}

// Actualiza una entrada de ganancias diarias existente
async function updateDailyEarningInDB(existingRecord: DailyEarnings) {
  try {
    const updatedEarning = await existingRecord.save();
    return updatedEarning;
  } catch (error) {
    throw new Error("Error actualizando las ganancias diarias en la base de datos");
  }
}

export {
  findDailyEarningByDate,
  createDailyEarningInDB,
  updateDailyEarningInDB,
};
