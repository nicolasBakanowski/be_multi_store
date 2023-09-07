import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import {
  OrderAttributes,
  OrderData,
  UserInfo,
} from "../interfaces/orderInterface";

class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: number;
  public userInfo!: UserInfo;
  public extraCommentary!: string;
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
  },
  {
    sequelize,
    modelName: "Order",
  }
);

export default Order;
