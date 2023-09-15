import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../db";
import { OrderProductAttributes } from "../interfaces/orderProductInterface";
import Product from "./productModel";
import Order from "./orderModel";

class OrderProductModel
  extends Model<OrderProductAttributes>
  implements OrderProductAttributes
{
  public id!: number;
  public orderId!: number;
  public productId!: number;
  public quantity!: number;
  public product!: Product;
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
      references: {
        model: Product,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "OrderProducts",
  }
);
OrderProductModel.belongsTo(Order, { foreignKey: "orderId" });
OrderProductModel.belongsTo(Product, { foreignKey: "productId" });
export default OrderProductModel;
