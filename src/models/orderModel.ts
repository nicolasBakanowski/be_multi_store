import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import {
  OrderAttributes,
  OrderData,
  UserInfo,
} from "../interfaces/orderInterface";
import Status from "../models/statusModel";

class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: number;
  public userInfo!: UserInfo;
  public extraCommentary!: string;
  public statusId!: number;
  public status!: Status;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userInfo: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    extraCommentary: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Puede ser nulo si lo deseas
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
