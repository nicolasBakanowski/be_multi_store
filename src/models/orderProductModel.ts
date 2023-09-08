import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../db";
import { OrderProductAttributes } from "../interfaces/orderProductInterface";

class OrderProductModel
  extends Model<OrderProductAttributes>
  implements OrderProductAttributes
{
  public id!: number;
  public orderId!: number;
  public productId!: number;
  public quantity!: number;
}

OrderProductModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "OrderProduct",
  }
);

export default OrderProductModel;
