export interface DailyEarningAttributes {
    id?: number; 
    date: string; // Fecha de las ganancias, en formato YYYY-MM-DD
    totalRevenue: number; // Ingresos totales del día
    totalCost: number; // Costo total del día
    totalProfit: number; // Ganancia neta del día
  }
  