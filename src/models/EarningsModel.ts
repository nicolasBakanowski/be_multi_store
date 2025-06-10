import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class DailyEarnings extends Model {
  public id!: number;
  public date!: Date;
  public totalRevenue!: number;
  public totalCost!: number;
  public totalProfit!: number;
}

DailyEarnings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: true,
    },
    totalRevenue: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    totalCost: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    totalProfit: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "DailyEarnings",
  }
);

export default DailyEarnings;
