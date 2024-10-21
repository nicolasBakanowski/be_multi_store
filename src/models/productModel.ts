import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import Category from "./categoryModel";
import { ProductAttributes } from "../interfaces/productInterface";

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public shortDescription!: string;
  public stock!: number;
  public price!: number;
  public imageUrl!: string;
  public categoryId!: number;
  public available!: boolean;
  public costPrice!: number; // Agregar el campo costPrice

  public category!: Category;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
    },
    shortDescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    costPrice: {
      type: DataTypes.FLOAT, // Definir costPrice como FLOAT
      allowNull: false,
      defaultValue: 0, // Valor predeterminado de 0
    },
  },
  {
    sequelize,
    tableName: "products",
  }
);

export default Product;
