import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db";
import Product from "./productModel"; 

interface LotteryAttributes {
  id: number;
  isActive: boolean;
  winnerId?: number | null;
  targetAmount: number;
  status: string;
}

interface LotteryCreationAttributes extends Optional<LotteryAttributes, "id" | "winnerId"> {}

class Lottery extends Model<LotteryAttributes, LotteryCreationAttributes>
  implements LotteryAttributes {
  public id!: number;
  public isActive!: boolean;
  public winnerId?: number | null;
  public targetAmount!: number;
  public status!: string;

  public readonly products?: Product[];

  static associate() {
    Lottery.belongsToMany(Product, {
      through: "LotteryProducts",
      foreignKey: "lotteryId",
      otherKey: "productId",
      as: "products"
    });
  }
}

Lottery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    winnerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
    targetAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "Lottery",
  }
);

export default Lottery;
