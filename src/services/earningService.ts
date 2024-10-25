import {
    findDailyEarningByDate,
    createDailyEarningInDB,
    updateDailyEarningInDB,
  } from "../repositories/earningRepostory";
  import { findConfirmedOrdersByDate } from "../repositories/orderRepository";
  import { OrderAttributes } from "../interfaces/orderInterface";  

  async function createOrUpdateDailyEarningService(date: string) {
    try {
      const confirmedOrders = await findConfirmedOrdersByDate(date);
      
      const totalRevenue = confirmedOrders.reduce((acc: number, order: OrderAttributes) => acc + order.totalAmount, 0);
      const totalCost = confirmedOrders.reduce((acc: number, order: OrderAttributes) => acc + order.totalCostPriceAmount, 0);
    
      const existingRecord = await findDailyEarningByDate(date);
  
      if (existingRecord) {
        existingRecord.totalRevenue += totalRevenue;
        existingRecord.totalCost += totalCost;
        existingRecord.totalProfit = existingRecord.totalRevenue - existingRecord.totalCost;
  
        const updatedRecord = await updateDailyEarningInDB(existingRecord);
        return updatedRecord;
      } else {
        const newEarning = await createDailyEarningInDB({
          date,
          totalRevenue,
          totalCost,
          totalProfit: totalRevenue - totalCost,
        });
        return newEarning;
      }
    } catch (error) {
      throw new Error("Error al crear o actualizar las ganancias diarias");
    }
  }
  
  export { createOrUpdateDailyEarningService };
    