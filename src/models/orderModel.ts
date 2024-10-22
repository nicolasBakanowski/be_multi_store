import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import { OrderAttributes } from "../interfaces/orderInterface";
import Status from "../models/statusModel";

class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: number;
  public extraCommentary!: string;
  public name!: string | null;
  public phone!: string | null;
  public address!: string | null;
  public delivery!: boolean;
  public statusId!: number;
  public totalAmount!: number; 
  public totalCostPriceAmount!: number;
  public status!: Status;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    extraCommentary: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    delivery: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT, 
      allowNull: false,
      defaultValue: 0, 
    },
    totalCostPriceAmount: {
      type: DataTypes.FLOAT, 
      allowNull: false,
      defaultValue: 0,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Status",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Order",
  }
);

export default Order;
