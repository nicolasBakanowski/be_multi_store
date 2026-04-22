import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import Category from "./categoryModel";
import Brand from "./brandModel";
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
  public brandId!: number;
  public available!: boolean;
  public costPrice!: number; 
  public category!: Category;
  public brand!: Brand;
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
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Brand,
        key: "id",
      },
      field: "brandId",
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
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "Products",
  }
);

export default Product;
