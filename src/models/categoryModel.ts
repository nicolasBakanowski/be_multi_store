import { Model, DataTypes } from "sequelize";
import sequelize from "../db";

class Category extends Model {
  public id!: number;
  public name!: string;
  public imageUrl!: string;
}

Category.init(
  {
    name: DataTypes.STRING,
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Category",
  }
);

export default Category;
