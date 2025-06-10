import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import Lottery from "./lotteryModel";
import Product from "./productModel";

interface LotteryProductsAttributes {
  lotteryId: number;
  productId: number;
}

class LotteryProducts extends Model<LotteryProductsAttributes> implements LotteryProductsAttributes {
  public lotteryId!: number;
  public productId!: number;
}

LotteryProducts.init(
  {
    lotteryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Lottery,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "LotteryProducts",
    tableName: "LotteryProducts", 
    timestamps: false,
  }
);

export default LotteryProducts;
