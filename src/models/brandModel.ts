import { Model, DataTypes } from "sequelize";
import sequelize from "../db";

export interface BrandAttributes {
  id?: number;
  name: string;
  imageUrl: string;
}

class Brand extends Model<BrandAttributes> implements BrandAttributes {
  public id!: number;
  public name!: string;
  public imageUrl!: string;
}

Brand.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Brand",
    tableName: "Brands",
  }
);

export default Brand;

